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

        // Upcoming reservation (next one on or after today)
        $upcoming = Reservation::where('user_id', $user->id)
            ->whereDate('reservation_date', '>=', Carbon::today())
            ->orderBy('reservation_date')
            ->orderBy('reservation_time')
            ->first();

        // Reservation stats
        $totalReservations = Reservation::where('user_id', $user->id)->count();
        $lastReservation = Reservation::where('user_id', $user->id)
            ->orderByDesc('reservation_date')
            ->orderByDesc('reservation_time')
            ->first();

        // Simple analytics placeholders
        $reservationStats = [
            'totalReservations' => $totalReservations,
            'lastVisited' => $lastReservation ? $lastReservation->reservation_date : null,
            'favoriteDish' => null,
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
}