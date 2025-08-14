<?php

namespace App\Http\Controllers\Admin\Menu;

use App\Http\Controllers\Controller;
use App\Models\MenuComment;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuCommentsController extends Controller
{
    public function index(Request $request)
    {
        $query = MenuComment::with(['menu', 'user']);

        if ($menu = $request->input('menu')) {
            $query->where('menu_id', $menu);
        }

        if ($search = $request->input('search')) {
            $query->where('comment', 'like', "%{$search}%");
        }

        $comments = $query->orderBy('created_at', 'desc')->paginate(20)->withQueryString();

        $menus = Menu::orderBy('name')->get();

        return Inertia::render('Admin/Menu/Comments/Index', [
            'comments' => $comments,
            'menus' => $menus,
            'filters' => $request->only(['menu', 'search']),
        ]);
    }

    public function destroy(MenuComment $comment)
    {
        $comment->delete();

        return redirect()->route('admin.menu.comments.index');
    }
}
