<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogTag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogTagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = BlogTag::withCount('blogPosts')->orderBy('name')->paginate(20);

        return Inertia::render('Admin/BlogTags/Index', [
            'tags' => $tags
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/BlogTags/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:blog_tags,name'
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        BlogTag::create($validated);

        return redirect()->route('admin.blog-tags.index')->with('success', 'Tag created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogTag $blogTag)
    {
        return Inertia::render('Admin/BlogTags/Show', [
            'tag' => $blogTag
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogTag $blogTag)
    {
        return Inertia::render('Admin/BlogTags/Edit', [
            'tag' => $blogTag
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BlogTag $blogTag)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:blog_tags,name,' . $blogTag->id
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        $blogTag->update($validated);

        return redirect()->route('admin.blog-tags.index')->with('success', 'Tag updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogTag $blogTag)
    {
        // Check if tag is being used
        if ($blogTag->blogPosts()->count() > 0) {
            return redirect()->route('admin.blog-tags.index')->with('error', 'Cannot delete tag that is being used by blog posts.');
        }

        $blogTag->delete();

        return redirect()->route('admin.blog-tags.index')->with('success', 'Tag deleted successfully.');
    }
}
