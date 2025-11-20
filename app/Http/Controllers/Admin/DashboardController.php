<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Reservation;
use App\Models\RestaurantTable;
use App\Models\Review;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        $totalReservationsToday = Reservation::where('reservation_date', today())
            ->where('status', '!=', 'cancelled')
            ->count();

        $totalActiveTables = RestaurantTable::where('is_active', true)->count();

        $totalReviews = Review::count();

        $upcomingReservations = Reservation::with('user')
            ->where('reservation_date', today())
            ->where('status', '!=', 'cancelled')
            ->orderBy('reservation_time')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'totalReservationsToday' => $totalReservationsToday,
            'totalActiveTables' => $totalActiveTables,
            'totalReviews' => $totalReviews,
            'upcomingReservations' => $upcomingReservations,
        ]);
    }
}
