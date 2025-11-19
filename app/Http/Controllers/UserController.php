<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Carbon\Carbon;

class UserController extends Controller
{
    public function dashboard()
    {
        $user = auth()->user();

        // Upcoming reservation (next one on or after today, not cancelled)
        $upcoming = Reservation::with('tables')
            ->where('user_id', $user->id)
            ->whereDate('reservation_date', '>=', Carbon::today())
            ->where('status', '!=', 'cancelled')
            ->orderBy('reservation_date')
            ->orderBy('reservation_time')
            ->first();

        // Reservation stats
        $totalReservations = Reservation::where('user_id', $user->id)->count();
        $lastReservation = Reservation::where('user_id', $user->id)
            ->orderByDesc('reservation_date')
            ->orderByDesc('reservation_time')
            ->first();

        // Calculate favorite dish based on user's menu reviews
        $favoriteDish = null;
        $userReviews = \DB::table('menu_reviews')
            ->join('menus', 'menu_reviews.menu_id', '=', 'menus.id')
            ->where('menu_reviews.user_id', $user->id)
            ->select('menus.name', 'menu_reviews.rating', \DB::raw('COUNT(*) as review_count'))
            ->groupBy('menus.id', 'menus.name', 'menu_reviews.rating')
            ->orderByDesc('menu_reviews.rating')
            ->orderByDesc('review_count')
            ->first();

        if ($userReviews) {
            $favoriteDish = $userReviews->name;
        }

        // Get all reservations for history (limit to last 10 for performance)
        $reservationHistory = Reservation::where('user_id', $user->id)
            ->orderByDesc('reservation_date')
            ->orderByDesc('reservation_time')
            ->limit(10)
            ->get();

        // Simple analytics
        $reservationStats = [
            'totalReservations' => $totalReservations,
            'lastVisited' => $lastReservation ? $lastReservation->reservation_date : null,
            'favoriteDish' => $favoriteDish,
            'averageGroupSize' => (float) Reservation::where('user_id', $user->id)->avg('guest_count') ?? 0,
        ];

        // Example special offers (could be loaded from DB later)
        $specialOffers = [
            [
                'id' => 1,
                'title' => 'Holiday Special',
                'description' => 'Free dessert with any main course',
                'validUntil' => '2025-12-31',
                'image' => '/assets/special1.png',
            ],
            [
                'id' => 2,
                'title' => 'Wine Tasting Event',
                'description' => 'Italian wines paired with signature dishes',
                'validUntil' => '2025-12-20',
                'image' => '/assets/special2.png',
            ],
        ];

        return Inertia::render('User/Dashboard', [
            'upcomingReservation' => $upcoming,
            'reservationHistory' => $reservationHistory,
            'reservationStats' => $reservationStats,
            'specialOffers' => $specialOffers,
        ]);
    }

    public function profile()
    {
        return Inertia::render('User/Profile', [
            'user' => auth()->user(),
        ]);
    }

    public function editProfile()
    {
        return Inertia::render('User/EditProfile', [
            'user' => auth()->user(),
            'mustVerifyEmail' => auth()->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function adminEditProfile()
    {
        return Inertia::render('Admin/Profile/Edit', [
            'user' => auth()->user(),
            'mustVerifyEmail' => auth()->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function updateProfile(Request $request)
    {
        \Log::info('UpdateProfile called', [
            'has_file' => $request->hasFile('profile_picture'),
            'all_data' => $request->all(),
            'files' => $request->allFiles()
        ]);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . auth()->id(),
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
        ]);

        $user = auth()->user();

        // Handle profile picture upload
        if ($request->hasFile('profile_picture')) {
            \Log::info('Processing profile picture upload');
            // Delete old profile picture if exists
            if ($user->profile_picture && Storage::disk('public')->exists($user->profile_picture)) {
                Storage::disk('public')->delete($user->profile_picture);
            }

            // Store new profile picture
            $path = $request->file('profile_picture')->store('profile-pictures', 'public');
            \Log::info('File stored at: ' . $path);
            $user->profile_picture = $path;
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'profile_picture' => $user->profile_picture,
        ]);

        return back()->with('success', 'Profile updated successfully.');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|current_password',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        auth()->user()->update([
            'password' => Hash::make($request->password),
        ]);

        return back()->with('success', 'Password updated successfully.');
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'password' => 'required|current_password',
        ]);

        $user = auth()->user();
        $user->delete();

        auth()->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')->with('success', 'Account deleted successfully.');
    }

    public function activity()
    {
        return Inertia::render('User/Activity');
    }

    public function updateReservation(Request $request, Reservation $reservation)
    {
        // Ensure the reservation belongs to the authenticated user
        if ($reservation->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'reservation_date' => 'required|date|after:today',
            'reservation_time' => 'required|date_format:H:i',
            'guest_count' => 'required|integer|min:1|max:20',
            'special_requests' => 'nullable|string|max:1000',
        ]);

        $reservation->update([
            'reservation_date' => $request->reservation_date,
            'reservation_time' => $request->reservation_time,
            'guest_count' => $request->guest_count,
            'special_requests' => $request->special_requests,
        ]);

        return back()->with('success', 'Reservation updated successfully.');
    }

    public function cancelReservation(Request $request, Reservation $reservation)
    {
        // Ensure the reservation belongs to the authenticated user
        if ($reservation->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }

        // Only allow cancellation if the reservation is not in the past and not already cancelled
        if ($reservation->reservation_date < now()->toDateString() || $reservation->status === 'cancelled') {
            return back()->with('error', 'Cannot cancel this reservation.');
        }

        $reservation->update(['status' => 'cancelled']);

        return back()->with('success', 'Reservation cancelled successfully.');
    }
}