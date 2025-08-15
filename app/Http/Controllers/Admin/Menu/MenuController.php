<?php

namespace App\Http\Controllers\Admin\Menu;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    /**
     * Display the admin menu.
     */
    public function index(Request $request): Response
    {
        $query = Menu::with('category');

        if ($search = $request->input('search')) {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
        }

        if ($category = $request->input('category')) {
            $query->where('category_id', $category);
        }

        $menus = $query->orderBy('created_at', 'desc')->paginate(15)->withQueryString();

        $categories = MenuCategory::orderBy('name')->get();

        return Inertia::render('Admin/Menu/Index', [
            'menus' => $menus,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    /**
     * Show the form for creating a new menu item.
     */
    public function create()
    {
        $categories = MenuCategory::orderBy('name')->get();
        return Inertia::render('Admin/Menu/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created menu item in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:menu_categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:menus,slug',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_vegetarian' => 'sometimes|boolean',
            'is_gluten_free' => 'sometimes|boolean',
            'is_available' => 'sometimes|boolean',
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = \Illuminate\Support\Str::slug($data['name']);
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/menu-images'), $imageName);
            $data['image_path'] = '/storage/menu-images/' . $imageName;
        }

        // Remove the 'image' key as we store it as 'image_path'
        unset($data['image']);

        Menu::create($data);

        return redirect()->route('admin.menu.index');
    }

    /**
     * Show the form for editing the specified menu item.
     */
    public function edit(Menu $menu)
    {
        $categories = MenuCategory::orderBy('name')->get();
        return Inertia::render('Admin/Menu/Edit', [
            'menu' => $menu,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified menu item in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        $data = $request->validate([
            'category_id' => 'required|exists:menu_categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:menus,slug,' . $menu->id,
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_vegetarian' => 'sometimes|boolean',
            'is_gluten_free' => 'sometimes|boolean',
            'is_available' => 'sometimes|boolean',
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = \Illuminate\Support\Str::slug($data['name']);
        }

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($menu->image_path && file_exists(public_path($menu->image_path))) {
                unlink(public_path($menu->image_path));
            }

            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/menu-images'), $imageName);
            $data['image_path'] = '/storage/menu-images/' . $imageName;
        }

        // Remove the 'image' key as we store it as 'image_path'
        unset($data['image']);

        $menu->update($data);

        return redirect()->route('admin.menu.index');
    }

    /**
     * Remove the specified menu item from storage.
     */
    public function destroy(Menu $menu)
    {
        $menu->delete();

        return redirect()->route('admin.menu.index');
    }
}
