<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\Menu\MenuController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// User home page (protected route for authenticated users)
Route::get('/home', [HomeController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('home');

// Admin dashboard (protected route for admin users only)
Route::get('/admin/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified', 'admin'])
    ->name('admin.dashboard');

Route::get('/admin/menu', [MenuController::class, 'index'])
    ->middleware(['auth', 'verified', 'admin'])
    ->name('admin.menu');

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

Route::prefix('admin')->name('admin.')->middleware(['auth','verified','admin'])->group(function () {
    // Menu categories CRUD
    Route::get('menu/categories', [\App\Http\Controllers\Admin\Menu\MenuCategoriesController::class, 'index'])->name('menu.categories.index');
    Route::get('menu/categories/create', [\App\Http\Controllers\Admin\Menu\MenuCategoriesController::class, 'create'])->name('menu.categories.create');
    Route::post('menu/categories', [\App\Http\Controllers\Admin\Menu\MenuCategoriesController::class, 'store'])->name('menu.categories.store');
    Route::get('menu/categories/{category}/edit', [\App\Http\Controllers\Admin\Menu\MenuCategoriesController::class, 'edit'])->name('menu.categories.edit');
    Route::put('menu/categories/{category}', [\App\Http\Controllers\Admin\Menu\MenuCategoriesController::class, 'update'])->name('menu.categories.update');
    Route::delete('menu/categories/{category}', [\App\Http\Controllers\Admin\Menu\MenuCategoriesController::class, 'destroy'])->name('menu.categories.destroy');
});

require __DIR__ . '/auth.php';
