<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = BlogPost::with(['category', 'tags'])
            ->orderBy('created_at', 'desc');

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        // Filter by category
        if ($request->has('category') && $request->category !== '') {
            $query->where('blog_category_id', $request->category);
        }

        // Search by title
        if ($request->has('search') && $request->search !== '') {
            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $blogPosts = $query->paginate(15);

        $categories = BlogCategory::all();

        return Inertia::render('Admin/Blog/Index', [
            'blogPosts' => $blogPosts,
            'categories' => $categories,
            'filters' => $request->only(['status', 'category', 'search'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = BlogCategory::all();
        $tags = BlogTag::all();

        return Inertia::render('Admin/Blog/Create', [
            'categories' => $categories,
            'tags' => $tags
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'author' => 'required|string|max:255',
            'blog_category_id' => 'required|exists:blog_categories,id',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date|after:now',
            'seo_title' => 'nullable|string|max:60',
            'seo_description' => 'nullable|string|max:160',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:blog_tags,id'
        ]);

        // Generate slug from title
        $validated['slug'] = $this->generateUniqueSlug($validated['title']);

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $validated['featured_image'] = $request->file('featured_image')->store('blog-images', 'public');
        }

        // Set published_at for published posts
        if ($validated['status'] === 'published' && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $blogPost = BlogPost::create($validated);

        // Attach tags
        if (isset($validated['tags'])) {
            $blogPost->tags()->attach($validated['tags']);
        }

        return redirect()->route('admin.blog.index')->with('success', 'Blog post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BlogPost $blogPost)
    {
        $blogPost->load(['category', 'tags']);

        return Inertia::render('Admin/Blog/Show', [
            'blogPost' => $blogPost
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BlogPost $blogPost)
    {
        $blogPost->load(['category', 'tags']);

        $categories = BlogCategory::all();
        $tags = BlogTag::all();

        return Inertia::render('Admin/Blog/Edit', [
            'blogPost' => $blogPost,
            'categories' => $categories,
            'tags' => $tags,
            'selectedTags' => $blogPost->tags->pluck('id')->toArray()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BlogPost $blogPost)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'author' => 'required|string|max:255',
            'blog_category_id' => 'required|exists:blog_categories,id',
            'status' => 'required|in:draft,published',
            'published_at' => 'nullable|date',
            'seo_title' => 'nullable|string|max:60',
            'seo_description' => 'nullable|string|max:160',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:blog_tags,id'
        ]);

        // Update slug if title changed
        if ($blogPost->title !== $validated['title']) {
            $validated['slug'] = $this->generateUniqueSlug($validated['title'], $blogPost->id);
        }

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image
            if ($blogPost->featured_image) {
                Storage::disk('public')->delete($blogPost->featured_image);
            }
            $validated['featured_image'] = $request->file('featured_image')->store('blog-images', 'public');
        }

        // Set published_at for published posts
        if ($validated['status'] === 'published' && $blogPost->status !== 'published') {
            $validated['published_at'] = $validated['published_at'] ?? now();
        }

        $blogPost->update($validated);

        // Sync tags
        if (isset($validated['tags'])) {
            $blogPost->tags()->sync($validated['tags']);
        } else {
            $blogPost->tags()->detach();
        }

        return redirect()->route('admin.blog.index')->with('success', 'Blog post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BlogPost $blogPost)
    {
        // Delete featured image
        if ($blogPost->featured_image) {
            Storage::disk('public')->delete($blogPost->featured_image);
        }

        // Detach tags
        $blogPost->tags()->detach();

        $blogPost->delete();

        return redirect()->route('admin.blog.index')->with('success', 'Blog post deleted successfully.');
    }

    /**
     * Generate a unique slug for the blog post.
     */
    private function generateUniqueSlug(string $title, int $excludeId = null): string
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $count = 1;

        while (BlogPost::where('slug', $slug)->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        return $slug;
    }
}
