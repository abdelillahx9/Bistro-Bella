<?php

namespace App\Http\Controllers\Admin\Menu;

use App\Http\Controllers\Controller;
use App\Models\MenuReview;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuReviewsController extends Controller
{
    public function index(Request $request)
    {
        $query = MenuReview::with(['menu', 'user']);

        // Search by comment
        if ($search = $request->input('search')) {
            $query->where('comment', 'like', "%{$search}%");
        }

        // Filter by menu name
        if ($menuName = $request->input('menu')) {
            $query->whereHas('menu', function($q) use ($menuName) {
                $q->where('name', 'like', "%{$menuName}%");
            });
        }

        // Filter by user name
        if ($userName = $request->input('user')) {
            $query->whereHas('user', function($q) use ($userName) {
                $q->where('name', 'like', "%{$userName}%");
            });
        }

        // Sort by rating
        if ($ratingSort = $request->input('rating_sort')) {
            if ($ratingSort === 'asc') {
                $query->orderBy('rating', 'asc');
            } elseif ($ratingSort === 'desc') {
                $query->orderBy('rating', 'desc');
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $reviews = $query->paginate(15)->withQueryString();

        $menus = Menu::orderBy('name')->get();

        return Inertia::render('Admin/Menu/Reviews/Index', [
            'reviews' => $reviews,
            'menus' => $menus,
            'filters' => $request->only(['search', 'menu', 'user', 'rating_sort']),
        ]);
    }

    public function destroy(MenuReview $review)
    {
        $review->delete();

        return redirect()->route('admin.menu.reviews.index');
    }
}
