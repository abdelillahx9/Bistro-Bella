<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\MenuReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        // Get all reviews with user and menu information
        $reviews = MenuReview::with(['user', 'menu'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Calculate overall statistics
        $totalReviews = MenuReview::count();
        $averageRating = MenuReview::avg('rating') ?? 0;

        // Get rating distribution
        $ratingDistribution = [];
        for ($i = 1; $i <= 5; $i++) {
            $ratingDistribution[$i] = MenuReview::where('rating', $i)->count();
        }

        return Inertia::render('User/Reviews', [
            'reviews' => $reviews,
            'stats' => [
                'totalReviews' => $totalReviews,
                'averageRating' => round($averageRating, 1),
                'ratingDistribution' => $ratingDistribution,
            ],
            'menus' => Menu::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'menu_id' => 'required|exists:menus,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        // Check if user already reviewed this menu
        $existingReview = MenuReview::where('user_id', Auth::id())
            ->where('menu_id', $request->menu_id)
            ->first();

        if ($existingReview) {
            return back()->withErrors(['menu_id' => 'You have already reviewed this menu item.']);
        }

        MenuReview::create([
            'menu_id' => $request->menu_id,
            'user_id' => Auth::id(),
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return back()->with('success', 'Your review has been submitted successfully!');
    }

    public function update(Request $request, MenuReview $review)
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

    public function destroy(MenuReview $review)
    {
        // Ensure user can only delete their own reviews
        if ($review->user_id !== Auth::id()) {
            abort(403);
        }

        $review->delete();

        return back()->with('success', 'Your review has been deleted successfully!');
    }
}
