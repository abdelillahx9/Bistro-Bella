<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
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
        return Inertia::render('User/Profile');
    }

    public function reviews()
    {
        return Inertia::render('User/Reviews');
    }

    public function activity()
    {
        return Inertia::render('User/Activity');
    }
}