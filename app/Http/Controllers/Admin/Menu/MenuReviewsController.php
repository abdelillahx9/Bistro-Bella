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

        if ($menu = $request->input('menu')) {
            $query->where('menu_id', $menu);
        }

        if ($search = $request->input('search')) {
            $query->where('comment', 'like', "%{$search}%");
        }

        $reviews = $query->orderBy('created_at', 'desc')->paginate(20)->withQueryString();

        $menus = Menu::orderBy('name')->get();

        return Inertia::render('Admin/Menu/Reviews/Index', [
            'reviews' => $reviews,
            'menus' => $menus,
            'filters' => $request->only(['menu', 'search']),
        ]);
    }

    public function destroy(MenuReview $review)
    {
        $review->delete();

        return redirect()->route('admin.menu.reviews.index');
    }
}
