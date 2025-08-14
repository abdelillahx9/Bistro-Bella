<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Menu\MenuController;
use App\Http\Controllers\Admin\Menu\MenuCategoriesController;
use App\Http\Controllers\Admin\Menu\MenuReviewsController;

// Group all admin routes
Route::prefix('admin')->name('admin.')->middleware(['auth','verified','admin'])->group(function () {
    // Menu Categories CRUD
    Route::get('menu/categories', [MenuCategoriesController::class, 'index'])->name('menu.categories.index');
    Route::get('menu/categories/create', [MenuCategoriesController::class, 'create'])->name('menu.categories.create');
    Route::post('menu/categories', [MenuCategoriesController::class, 'store'])->name('menu.categories.store');
    Route::get('menu/categories/{category}/edit', [MenuCategoriesController::class, 'edit'])->name('menu.categories.edit');
    Route::put('menu/categories/{category}', [MenuCategoriesController::class, 'update'])->name('menu.categories.update');
    Route::delete('menu/categories/{category}', [MenuCategoriesController::class, 'destroy'])->name('menu.categories.destroy');

    // Menus CRUD
    Route::get('menu', [MenuController::class, 'index'])->name('menu.index');
    Route::get('menu/create', [MenuController::class, 'create'])->name('menu.create');
    Route::post('menu', [MenuController::class, 'store'])->name('menu.store');
    Route::get('menu/{menu}/edit', [MenuController::class, 'edit'])->name('menu.edit');
    Route::put('menu/{menu}', [MenuController::class, 'update'])->name('menu.update');
    Route::delete('menu/{menu}', [MenuController::class, 'destroy'])->name('menu.destroy');

    // Menu reviews
    Route::get('menu/reviews', [MenuReviewsController::class, 'index'])->name('menu.reviews.index');
    Route::delete('menu/reviews/{review}', [MenuReviewsController::class, 'destroy'])->name('menu.reviews.destroy');
});
