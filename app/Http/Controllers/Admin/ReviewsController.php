<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewsController extends Controller
{
    public function index(Request $request)
    {
        $query = Review::with(['user']);

        // Search by comment
        if ($search = $request->input('search')) {
            $query->where('comment', 'like', "%{$search}%");
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

        return Inertia::render('Admin/Reviews/Index', [
            'reviews' => $reviews,
            'filters' => $request->only(['search', 'user', 'rating_sort']),
        ]);
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return redirect()->route('admin.reviews.index');
    }

    public function toggleFeatured(Review $review)
    {
        $review->update(['is_featured' => !$review->is_featured]);

        return back();
    }

    public function toggleHidden(Review $review)
    {
        $review->update(['is_hidden' => !$review->is_hidden]);

        return back();
    }
}
