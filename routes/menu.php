<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Menu\MenuController;
use App\Http\Controllers\Admin\Menu\MenuCategoriesController;
use App\Http\Controllers\Admin\Menu\MenuReviewsController;
use App\Http\Controllers\Admin\Menu\TagController;
use App\Http\Controllers\Admin\Menu\MenuCommentsController;
use App\Http\Controllers\Admin\Menu\MenuFavoritesController;

// Group all admin routes
Route::prefix('admin')->name('admin.')->middleware(['auth','verified','admin'])->group(function () {
    // Menu Categories CRUD
    Route::get('menu/categories', [MenuCategoriesController::class, 'index'])->name('menu.categories.index');
    Route::get('menu/categories/create', [MenuCategoriesController::class, 'create'])->name('menu.categories.create');
    Route::post('menu/categories', [MenuCategoriesController::class, 'store'])->name('menu.categories.store');
    Route::get('menu/categories/{category}/edit', [MenuCategoriesController::class, 'edit'])->name('menu.categories.edit');
    Route::put('menu/categories/{category}', [MenuCategoriesController::class, 'update'])->name('menu.categories.update');
    Route::delete('menu/categories/{category}', [MenuCategoriesController::class, 'destroy'])->name('menu.categories.destroy');

    // Tags CRUD
    Route::get('menu/tags', [TagController::class, 'index'])->name('menu.tags.index');
    Route::get('menu/tags/create', [TagController::class, 'create'])->name('menu.tags.create');
    Route::post('menu/tags', [TagController::class, 'store'])->name('menu.tags.store');
    Route::get('menu/tags/{tag}/edit', [TagController::class, 'edit'])->name('menu.tags.edit');
    Route::put('menu/tags/{tag}', [TagController::class, 'update'])->name('menu.tags.update');
    Route::delete('menu/tags/{tag}', [TagController::class, 'destroy'])->name('menu.tags.destroy');

    // Menus CRUD
    Route::get('menu', [MenuController::class, 'index'])->name('menu.index');
    Route::get('menu/create', [MenuController::class, 'create'])->name('menu.create');
    Route::post('menu', [MenuController::class, 'store'])->name('menu.store');
    Route::get('menu/{menu}/edit', [MenuController::class, 'edit'])->name('menu.edit');
    Route::put('menu/{menu}', [MenuController::class, 'update'])->name('menu.update');
    Route::delete('menu/{menu}', [MenuController::class, 'destroy'])->name('menu.destroy');
    Route::patch('menu/{menu}/toggle-featured', [MenuController::class, 'toggleFeatured'])->name('menu.toggle-featured');

    // Menu comments and favorites admin management
    Route::get('menu/comments', [MenuCommentsController::class, 'index'])->name('menu.comments.index');
    Route::delete('menu/comments/{comment}', [MenuCommentsController::class, 'destroy'])->name('menu.comments.destroy');

    // favorites listing/deletion for admin
    Route::get('menu/favorites', [MenuFavoritesController::class, 'index'])->name('menu.favorites.index');
    Route::delete('menu/favorites/{favorite}', [MenuFavoritesController::class, 'destroy'])->name('menu.favorites.destroy');
});
