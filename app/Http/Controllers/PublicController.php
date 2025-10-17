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
        return Inertia::render('Public/Reservations');
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
