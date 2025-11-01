<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\ReviewController;
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

// Authenticated routes: legacy ProfileController handles update/delete logic
Route::middleware('auth')->group(function () {
    // Keep the update/delete endpoints using the existing ProfileController validation flow
    // (these are used by form POSTs/patches but the public page is served by UserController)
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/password', [ProfileController::class, 'updatePassword'])->name('password.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Serve the new profile UI at /profile and user-specific pages under /user
Route::middleware(['auth', 'verified'])->group(function () {
    // Public-facing profile page uses UserController (React/Inertia page)
    Route::get('/profile', [UserController::class, 'profile'])->name('profile');
    Route::get('/profile/edit', [UserController::class, 'editProfile'])->name('profile.edit');
    Route::patch('/profile', [UserController::class, 'updateProfile'])->name('profile.update');
    Route::patch('/profile/password', [UserController::class, 'updatePassword'])->name('profile.password.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('user')->name('user.')->group(function () {
        Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews');
        Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');
        Route::put('/reviews/{review}', [ReviewController::class, 'update'])->name('reviews.update');
        Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');
        Route::get('/activity', [UserController::class, 'activity'])->name('activity');
    });
});

// Admin CRUD routes
Route::prefix('admin')->name('admin.')->middleware(['auth','verified','admin'])->group(function () {
    Route::resource('reservations', ReservationController::class);
    Route::resource('tables', RestaurantTableController::class);
});

// load menu routes
require __DIR__ . '/menu.php';

require __DIR__ . '/auth.php';
