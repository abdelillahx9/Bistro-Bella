<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ReservationController;
use App\Http\Controllers\Admin\RestaurantTableController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', [PublicController::class, 'home'])->name('public.home');

// Public pages
Route::get('/menu', [PublicController::class, 'menu'])->name('public.menu');
Route::get('/menu/category/{category}', [PublicController::class, 'getCategoryMenu'])->name('public.menu.category');
Route::get('/blog', [PublicController::class, 'blog'])->name('public.blog');
Route::get('/reservations', [PublicController::class, 'reservations'])->name('public.reservations');
Route::post('/reservations', [PublicController::class, 'storeReservation'])->name('public.reservations.store');
Route::get('/about', [PublicController::class, 'about'])->name('public.about');
Route::get('/contact', [PublicController::class, 'contact'])->name('public.contact');
Route::post('/contact', [PublicController::class, 'storeContact'])->name('public.contact.store');
Route::get('/reserve', [PublicController::class, 'reserve'])->name('public.reserve');

// User home page (protected route for authenticated users)
Route::get('/home', [UserController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('home');

// Admin dashboard (protected route for admin users only)
Route::get('/admin/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'admin'])
    ->name('admin.dashboard');

// Keep the old dashboard route for backward compatibility (redirect to appropriate dashboard)
Route::get('/dashboard', function () {
    $user = Auth::user();
    if ($user->hasRole('admin')) {
        return redirect()->route('admin.dashboard');
    }
    return redirect()->route('home');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// User routes (protected route for authenticated users only)
Route::prefix('user')->name('user.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [UserController::class, 'profile'])->name('profile');
    Route::get('/reviews', [UserController::class, 'reviews'])->name('reviews');
    Route::get('/activity', [UserController::class, 'activity'])->name('activity');
});

// Admin CRUD routes
Route::prefix('admin')->name('admin.')->middleware(['auth','verified','admin'])->group(function () {
    Route::resource('reservations', ReservationController::class);
    Route::resource('tables', RestaurantTableController::class);
});

// load menu routes
require __DIR__ . '/menu.php';

require __DIR__ . '/auth.php';
