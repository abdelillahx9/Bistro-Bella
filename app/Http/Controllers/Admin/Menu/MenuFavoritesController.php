<?php

namespace App\Http\Controllers\Admin\Menu;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuComment;
use App\Models\MenuReview;
use App\Models\MenuFavorite;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuFavoritesController extends Controller
{
    public function index(Request $request)
    {
        $query = MenuFavorite::with(['menu', 'user']);

        if ($menu = $request->input('menu')) {
            $query->where('menu_id', $menu);
        }

        $favorites = $query->orderBy('created_at', 'desc')->paginate(20)->withQueryString();

        $menus = Menu::orderBy('name')->get();

        return Inertia::render('Admin/Menu/Favorites/Index', [
            'favorites' => $favorites,
            'menus' => $menus,
            'filters' => $request->only(['menu']),
        ]);
    }

    public function destroy(MenuFavorite $favorite)
    {
        $favorite->delete();

        return redirect()->route('admin.menu.favorites.index');
    }
}
