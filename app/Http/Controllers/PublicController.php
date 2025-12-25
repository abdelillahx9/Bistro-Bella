<?php

namespace App\Http\Controllers;

use App\Events\TableAvailabilityUpdated;
use App\Mail\ReservationConfirmed;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use App\Models\BlogTag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        $featuredDishes = \App\Models\Menu::where('is_featured', true)
            ->where('is_available', true)
            ->with('category')
            ->limit(3)
            ->get();

        $featuredReviews = \App\Models\Review::where('is_featured', true)
            ->where('is_hidden', false)
            ->with('user')
            ->limit(3)
            ->get();

        return Inertia::render('Public/Home', [
            'featuredDishes' => $featuredDishes,
            'featuredReviews' => $featuredReviews,
        ]);
    }

    public function menu()
    {
        $categories = \App\Models\MenuCategory::with(['menus' => function ($query) {
            $query->where('is_available', true)
                  ->with('tags')
                  ->limit(3);
        }])
        ->withCount(['menus' => function ($query) {
            $query->where('is_available', true);
        }])
        ->get();

        return Inertia::render('Public/Menu', [
            'categories' => $categories
        ]);
    }

    public function getCategoryMenu($categorySlug)
    {
        $category = \App\Models\MenuCategory::where('slug', $categorySlug)
            ->with(['menus' => function ($query) {
                $query->where('is_available', true)
                      ->with('tags');
            }])
            ->firstOrFail();

        return response()->json([
            'category' => $category,
            'menus' => $category->menus
        ]);
    }

    public function blog(Request $request)
    {
        $query = BlogPost::with(['category', 'tags'])
            ->where('status', 'published')
            ->where('published_at', '<=', now());

        // Filter by Category
        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Filter by Tag
        if ($request->has('tag')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('slug', $request->tag);
            });
        }

        $blogPosts = $query->orderBy('published_at', 'desc')
            ->paginate(6)
            ->through(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'excerpt' => $post->excerpt,
                    'content' => $post->content,
                    'image' => $post->featured_image ? '/storage/' . $post->featured_image : null,
                    'author' => $post->author,
                    'published_at' => $post->published_at,
                    'category' => $post->category ? $post->category->name : 'Uncategorized',
                    'tags' => $post->tags->pluck('name')->toArray(),
                    'read_time' => ceil(str_word_count(strip_tags($post->content)) / 200),
                    'featured' => false,
                ];
            });

        if ($request->wantsJson() && !$request->header('X-Inertia')) {
            return response()->json($blogPosts);
        }

        $categories = BlogCategory::withCount(['blogPosts' => function ($query) {
            $query->where('status', 'published')
                  ->where('published_at', '<=', now());
        }])->get()->map(function ($category) {
            return [
                'name' => $category->name,
                'slug' => $category->slug,
                'count' => $category->blog_posts_count,
            ];
        });

        $tags = BlogTag::withCount(['blogPosts' => function ($query) {
            $query->where('status', 'published')
                  ->where('published_at', '<=', now());
        }])->get()->map(function ($tag) {
            return [
                'name' => $tag->name,
                'slug' => $tag->slug,
                'count' => $tag->blog_posts_count,
            ];
        });

        return Inertia::render('Public/Blog', [
            'blogPosts' => $blogPosts,
            'categories' => $categories,
            'tags' => $tags,
            'filters' => $request->only(['category', 'tag'])
        ]);
    }

    public function showBlogPost($slug)
    {
        $post = BlogPost::with(['category', 'tags'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->firstOrFail();

        // Transform post for frontend
        $postData = [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'excerpt' => $post->excerpt,
            'content' => $post->content,
            'image' => $post->featured_image ? '/storage/' . $post->featured_image : null,
            'author' => $post->author,
            'published_at' => $post->published_at,
            'category' => $post->category ? $post->category->name : 'Uncategorized',
            'tags' => $post->tags->pluck('name')->toArray(),
            'read_time' => ceil(str_word_count(strip_tags($post->content)) / 200),
            'featured' => false,
        ];

        // Get related posts
        $relatedPosts = BlogPost::with(['category', 'tags'])
            ->where('blog_category_id', $post->blog_category_id)
            ->where('id', '!=', $post->id)
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->limit(3)
            ->get()
            ->map(function ($p) {
                return [
                    'id' => $p->id,
                    'title' => $p->title,
                    'slug' => $p->slug,
                    'excerpt' => $p->excerpt,
                    'image' => $p->featured_image ? '/storage/' . $p->featured_image : null,
                    'author' => $p->author,
                    'published_at' => $p->published_at,
                    'category' => $p->category ? $p->category->name : 'Uncategorized',
                    'read_time' => ceil(str_word_count(strip_tags($p->content)) / 200),
                ];
            });

        return Inertia::render('Public/BlogPost', [
            'post' => $postData,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    public function reservations()
    {
        $userData = null;
        if (auth()->check()) {
            $user = auth()->user();
            $userData = [
                'name' => $user->name,
                'email' => $user->email,
            ];
        }

        return Inertia::render('Public/Reservations', [
            'userData' => $userData
        ]);
    }

    public function getAvailableTables(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'guests' => 'required|integer|min:1',
        ]);

        $date = $request->date;
        $time = $request->time;
        $guests = $request->guests;

        // Get all active tables
        $tables = \App\Models\RestaurantTable::where('is_active', true)->get();

        $availableTables = [];

        foreach ($tables as $table) {
            // Check if table is available for this time slot
            $isAvailable = !\App\Models\Reservation::where('reservation_date', $date)
                ->whereIn('status', ['pending', 'confirmed', 'seated'])
                ->whereHas('tables', function ($query) use ($table) {
                    $query->where('table_id', $table->id);
                })
                ->where(function ($query) use ($time) {
                    // Simple overlap check - assuming 2 hour duration
                    $startTime = $time;
                    $endTime = date('H:i', strtotime($time) + 7200); // +2 hours
                    $query->whereBetween('reservation_time', [$startTime, $endTime])
                          ->orWhere(function ($q) use ($startTime, $endTime) {
                              $q->where('reservation_time', '<=', $startTime)
                                ->whereRaw("ADDTIME(reservation_time, '02:00:00') > ?", [$startTime]);
                          });
                })
                ->exists();

            if ($isAvailable) {
                $availableTables[] = [
                    'id' => $table->id,
                    'label' => $table->table_number . ' (Capacity: ' . $table->capacity . ')',
                    'capacity' => $table->capacity,
                ];
            }
        }

        // Sort by capacity ascending
        usort($availableTables, function ($a, $b) {
            return $a['capacity'] <=> $b['capacity'];
        });

        return response()->json($availableTables);
    }

    public function storeReservation(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required_without:phone|nullable|email|max:255',
            'phone' => 'required_without:email|nullable|string|max:20',
            'reservation_date' => 'required|date|after_or_equal:today',
            'reservation_time' => 'required|date_format:H:i',
            'guest_count' => 'required|integer|min:1|max:20',
            'tables' => 'required|array|min:1',
            'tables.*' => 'exists:restaurant_tables,id',
            'special_requests' => 'nullable|string|max:1000',
        ]);

        $reservation = \App\Models\Reservation::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'reservation_date' => $validated['reservation_date'],
            'reservation_time' => $validated['reservation_time'],
            'guest_count' => $validated['guest_count'],
            'special_requests' => $validated['special_requests'],
            'status' => 'pending',
            'source' => 'website',
            'user_id' => auth()->id(), // Will be null for guests
        ]);

        // Attach selected tables
        $reservation->tables()->attach($validated['tables']);

        // Broadcast table availability update
        broadcast(new TableAvailabilityUpdated(
            $validated['reservation_date'],
            $validated['reservation_time'],
            $validated['guest_count']
        ));

        // Send confirmation email if email address is provided
        if ($validated['email']) {
            Mail::to($validated['email'])->send(new ReservationConfirmed($reservation));
        }

        return redirect()->back()->with('success', 'Your reservation has been submitted successfully! We will contact you shortly to confirm.');
    }

    public function about()
    {
        $team = \App\Models\Staff::where('status', true)->get();

        return Inertia::render('Public/About', [
            'team' => $team
        ]);
    }

    public function contact()
    {
        return Inertia::render('Public/Contact');
    }

    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:150',
            'subject' => 'nullable|string|max:150',
            'message' => 'required|string',
        ]);

        $contact = \App\Models\Contact::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
        ]);

        return redirect()->back()->with('success', 'Thank you for your message! We will get back to you soon.');
    }

    public function reserve()
    {
        return redirect()->route('public.reservations');
    }
}
