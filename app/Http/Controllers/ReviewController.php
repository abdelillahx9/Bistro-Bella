<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        // Get all reviews with user information
        // Show non-hidden reviews OR hidden reviews that belong to the current user
        $reviews = Review::with(['user'])
            ->where(function ($query) {
                $query->where('is_hidden', false)
                      ->orWhere('user_id', Auth::id());
            })
            ->orderBy('is_featured', 'desc') // Featured reviews first
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Calculate overall statistics (excluding hidden reviews)
        $totalReviews = Review::where('is_hidden', false)->count();
        $averageRating = Review::where('is_hidden', false)->avg('rating') ?? 0;

        // Get rating distribution (excluding hidden reviews)
        $ratingDistribution = [];
        for ($i = 1; $i <= 5; $i++) {
            $ratingDistribution[$i] = Review::where('rating', $i)->where('is_hidden', false)->count();
        }

        return Inertia::render('User/Reviews', [
            'reviews' => $reviews,
            'stats' => [
                'totalReviews' => $totalReviews,
                'averageRating' => round($averageRating, 1),
                'ratingDistribution' => $ratingDistribution,
            ],
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        // Check if user already reviewed the restaurant
        $existingReview = Review::where('user_id', Auth::id())->first();

        if ($existingReview) {
            // Update existing review
            $existingReview->update([
                'rating' => $request->rating,
                'comment' => $request->comment,
            ]);

            return back()->with('success', 'Your review has been updated successfully!');
        }

        Review::create([
            'user_id' => Auth::id(),
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return back()->with('success', 'Your review has been submitted successfully!');
    }

    public function update(Request $request, Review $review)
    {
        // Ensure user can only update their own reviews
        if ($review->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $review->update([
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return back()->with('success', 'Your review has been updated successfully!');
    }

    public function destroy(Review $review)
    {
        // Ensure user can only delete their own reviews
        if ($review->user_id !== Auth::id()) {
            abort(403);
        }

        $review->delete();

        return back()->with('success', 'Your review has been deleted successfully!');
    }
}
