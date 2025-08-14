<?php

namespace App\Http\Controllers\Admin\Menu;

use App\Http\Controllers\Controller;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class MenuCategoriesController extends Controller
{
    public function index(Request $request)
    {
        $query = MenuCategory::query();

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        if ($sort = $request->input('sort')) {
            $direction = $request->input('direction', 'asc') === 'desc' ? 'desc' : 'asc';
            $query->orderBy($sort, $direction);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $categories = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Menu/Categories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search', 'sort', 'direction']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Menu/Categories/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:menu_categories,slug',
            'description' => 'nullable|string',
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        MenuCategory::create($data);

        return redirect()->route('admin.menu.categories.index');
    }

    public function edit(MenuCategory $category)
    {
        return Inertia::render('Admin/Menu/Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, MenuCategory $category)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:menu_categories,slug,' . $category->id,
            'description' => 'nullable|string',
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $category->update($data);

        return redirect()->route('admin.menu.categories.index');
    }

    public function destroy(MenuCategory $category)
    {
        $category->delete();

        return redirect()->route('admin.menu.categories.index');
    }
}
