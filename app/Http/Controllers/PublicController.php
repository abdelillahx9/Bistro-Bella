<?php

namespace App\Http\Controllers;

use App\Mail\ReservationConfirmed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        $featuredDishes = \App\Models\Menu::where('is_featured', true)
            ->where('is_available', true)
            ->with('category')
            ->limit(3)
            ->get();

        $featuredReviews = \App\Models\Review::where('is_featured', true)
            ->where('is_hidden', false)
            ->with('user')
            ->limit(3)
            ->get();

        return Inertia::render('Public/Home', [
            'featuredDishes' => $featuredDishes,
            'featuredReviews' => $featuredReviews,
        ]);
    }

    public function menu()
    {
        $categories = \App\Models\MenuCategory::with(['menus' => function ($query) {
            $query->where('is_available', true)
                  ->with('tags')
                  ->limit(3);
        }])
        ->withCount(['menus' => function ($query) {
            $query->where('is_available', true);
        }])
        ->get();

        return Inertia::render('Public/Menu', [
            'categories' => $categories
        ]);
    }

    public function getCategoryMenu($categorySlug)
    {
        $category = \App\Models\MenuCategory::where('slug', $categorySlug)
            ->with(['menus' => function ($query) {
                $query->where('is_available', true)
                      ->with('tags');
            }])
            ->firstOrFail();

        return response()->json([
            'category' => $category,
            'menus' => $category->menus
        ]);
    }

    public function blog()
    {
        return Inertia::render('Public/Blog');
    }

    public function reservations()
    {
        $userData = null;
        if (auth()->check()) {
            $user = auth()->user();
            $userData = [
                'name' => $user->name,
                'email' => $user->email,
            ];
        }

        return Inertia::render('Public/Reservations', [
            'userData' => $userData
        ]);
    }

    public function storeReservation(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required_without:phone|nullable|email|max:255',
            'phone' => 'required_without:email|nullable|string|max:20',
            'reservation_date' => 'required|date|after:today',
            'reservation_time' => 'required|date_format:H:i',
            'guest_count' => 'required|integer|min:1|max:20',
            'special_requests' => 'nullable|string|max:1000',
        ]);

        $reservation = \App\Models\Reservation::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'reservation_date' => $validated['reservation_date'],
            'reservation_time' => $validated['reservation_time'],
            'guest_count' => $validated['guest_count'],
            'special_requests' => $validated['special_requests'],
            'status' => 'pending',
            'source' => 'website',
            'user_id' => auth()->id(), // Will be null for guests
        ]);

        // Send confirmation email if email address is provided
        if ($validated['email']) {
            Mail::to($validated['email'])->send(new ReservationConfirmed($reservation));
        }

        return redirect()->back()->with('success', 'Your reservation has been submitted successfully! We will contact you shortly to confirm.');
    }

    public function about()
    {
        return Inertia::render('Public/About');
    }

    public function contact()
    {
        return Inertia::render('Public/Contact');
    }

    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'subject' => 'nullable|string|max:150',
            'message' => 'required|string',
        ]);

        $contact = \App\Models\Contact::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
        ]);

        return redirect()->back()->with('success', 'Thank you for your message! We will get back to you soon.');
    }

    public function reserve()
    {
        return redirect()->route('public.reservations');
    }
}
