<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        return Inertia::render('Public/Home');
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

    public function reserve()
    {
        return redirect()->route('public.reservations');
    }
}
