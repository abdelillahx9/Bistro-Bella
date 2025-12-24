<?php

namespace App\Http\Controllers;

use App\Events\TableAvailabilityUpdated;
use App\Mail\ReservationConfirmed;
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

    public function blog()
    {
        // Static blog data for Phase 1
        $blogPosts = [
            [
                'id' => 1,
                'title' => 'The Art of Italian Cuisine: A Journey Through Flavors',
                'slug' => 'art-of-italian-cuisine',
                'excerpt' => 'Discover the rich history and techniques behind authentic Italian cooking that make Bistro Bella\'s dishes unforgettable.',
                'content' => 'Italian cuisine is more than just pasta and pizza—it\'s a celebration of fresh ingredients, regional traditions, and culinary artistry. At Bistro Bella, we bring the authentic flavors of Italy to your table...',
                'image' => '/images/blog/italian-cuisine.jpg',
                'author' => 'Chef Marco Rossi',
                'published_at' => '2025-12-20',
                'category' => 'Culinary Arts',
                'tags' => ['Italian', 'Cuisine', 'Chef\'s Special'],
                'read_time' => 5,
                'featured' => true,
            ],
            [
                'id' => 2,
                'title' => 'Seasonal Ingredients: Why Freshness Matters',
                'slug' => 'seasonal-ingredients-freshness',
                'excerpt' => 'Learn why we source seasonal, local ingredients and how it enhances the dining experience at our restaurant.',
                'content' => 'The secret to exceptional dining lies in the quality of ingredients. At Bistro Bella, we believe in using only the freshest, seasonal produce...',
                'image' => '/images/blog/seasonal-ingredients.jpg',
                'author' => 'Chef Marco Rossi',
                'published_at' => '2025-12-18',
                'category' => 'Ingredients',
                'tags' => ['Seasonal', 'Fresh', 'Local'],
                'read_time' => 4,
                'featured' => false,
            ],
            [
                'id' => 3,
                'title' => 'Wine Pairing Guide: Perfect Matches for Our Menu',
                'slug' => 'wine-pairing-guide',
                'excerpt' => 'Expert tips on pairing wines with our signature dishes to elevate your dining experience.',
                'content' => 'Wine pairing is both an art and a science. The right wine can transform a good meal into an extraordinary one...',
                'image' => '/images/blog/wine-pairing.jpg',
                'author' => 'Sommelier Elena Bianchi',
                'published_at' => '2025-12-15',
                'category' => 'Beverages',
                'tags' => ['Wine', 'Pairing', 'Sommelier'],
                'read_time' => 6,
                'featured' => true,
            ],
            [
                'id' => 4,
                'title' => 'Behind the Scenes: A Day in the Life of Our Kitchen',
                'slug' => 'behind-scenes-kitchen',
                'excerpt' => 'Get an exclusive look at the hustle and bustle of our professional kitchen and the team that makes it all happen.',
                'content' => 'Step into the heart of Bistro Bella and witness the magic that happens behind closed doors...',
                'image' => '/images/blog/kitchen-scenes.jpg',
                'author' => 'Chef Marco Rossi',
                'published_at' => '2025-12-12',
                'category' => 'Behind the Scenes',
                'tags' => ['Kitchen', 'Team', 'Daily Life'],
                'read_time' => 7,
                'featured' => false,
            ],
            [
                'id' => 5,
                'title' => 'Sustainable Dining: Our Commitment to the Environment',
                'slug' => 'sustainable-dining-commitment',
                'excerpt' => 'How Bistro Bella is making a positive impact through sustainable practices and eco-friendly initiatives.',
                'content' => 'At Bistro Bella, sustainability isn\'t just a buzzword—it\'s a core value that guides everything we do...',
                'image' => '/images/blog/sustainable-dining.jpg',
                'author' => 'Chef Marco Rossi',
                'published_at' => '2025-12-10',
                'category' => 'Sustainability',
                'tags' => ['Sustainable', 'Environment', 'Eco-friendly'],
                'read_time' => 5,
                'featured' => true,
            ],
            [
                'id' => 6,
                'title' => 'Holiday Specials: Festive Menus for the Season',
                'slug' => 'holiday-specials-festive-menus',
                'excerpt' => 'Celebrate the holidays with our specially crafted festive menus featuring seasonal ingredients and traditional recipes.',
                'content' => 'The holiday season is upon us, and at Bistro Bella, we\'ve prepared something special for our guests...',
                'image' => '/images/blog/holiday-specials.jpg',
                'author' => 'Chef Marco Rossi',
                'published_at' => '2025-12-08',
                'category' => 'Special Events',
                'tags' => ['Holiday', 'Festive', 'Seasonal'],
                'read_time' => 4,
                'featured' => false,
            ],
        ];

        $categories = [
            ['name' => 'Culinary Arts', 'slug' => 'culinary-arts', 'count' => 1],
            ['name' => 'Ingredients', 'slug' => 'ingredients', 'count' => 1],
            ['name' => 'Beverages', 'slug' => 'beverages', 'count' => 1],
            ['name' => 'Behind the Scenes', 'slug' => 'behind-scenes', 'count' => 1],
            ['name' => 'Sustainability', 'slug' => 'sustainability', 'count' => 1],
            ['name' => 'Special Events', 'slug' => 'special-events', 'count' => 1],
        ];

        $tags = [
            ['name' => 'Italian', 'slug' => 'italian', 'count' => 1],
            ['name' => 'Cuisine', 'slug' => 'cuisine', 'count' => 1],
            ['name' => 'Seasonal', 'slug' => 'seasonal', 'count' => 2],
            ['name' => 'Fresh', 'slug' => 'fresh', 'count' => 1],
            ['name' => 'Wine', 'slug' => 'wine', 'count' => 1],
            ['name' => 'Sustainable', 'slug' => 'sustainable', 'count' => 1],
            ['name' => 'Holiday', 'slug' => 'holiday', 'count' => 1],
        ];

        return Inertia::render('Public/Blog', [
            'blogPosts' => $blogPosts,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    public function showBlogPost($slug)
    {
        // Static blog data for Phase 1
        $blogPosts = [
            [
                'id' => 1,
                'title' => 'The Art of Italian Cuisine: A Journey Through Flavors',
                'slug' => 'art-of-italian-cuisine',
                'excerpt' => 'Discover the rich history and techniques behind authentic Italian cooking that make Bistro Bella\'s dishes unforgettable.',
                'content' => '<p>Italian cuisine is more than just pasta and pizza—it\'s a celebration of fresh ingredients, regional traditions, and culinary artistry. At Bistro Bella, we bring the authentic flavors of Italy to your table through our carefully crafted dishes.</p><p>Our journey begins in the rolling hills of Tuscany, where we source the finest olive oils and balsamic vinegars. Each dish tells a story of tradition passed down through generations, yet innovated with modern techniques to create unforgettable dining experiences.</p><p>From the perfect al dente pasta to the wood-fired pizzas with their crispy crusts, every element is designed to transport you to the heart of Italy. Join us on this culinary adventure and discover why our Italian dishes have become legendary in the community.</p><p><strong>Make a Reservation Today</strong></p><p>Experience the art of Italian cuisine firsthand. <a href="/reservations" class="text-blue-600 hover:text-blue-800">Book your table now</a> and let our chefs create magic on your plate.</p>',
                'image' => '/images/blog/italian-cuisine.jpg',
                'author' => 'Chef Marco Rossi',
                'published_at' => '2025-12-20',
                'category' => 'Culinary Arts',
                'tags' => ['Italian', 'Cuisine', 'Chef\'s Special'],
                'read_time' => 5,
                'featured' => true,
            ],
            [
                'id' => 2,
                'title' => 'Seasonal Ingredients: Why Freshness Matters',
                'slug' => 'seasonal-ingredients-freshness',
                'excerpt' => 'Learn why we source seasonal, local ingredients and how it enhances the dining experience at our restaurant.',
                'content' => '<p>The secret to exceptional dining lies in the quality of ingredients. At Bistro Bella, we believe in using only the freshest, seasonal produce that nature provides at its peak.</p><p>Seasonal ingredients not only taste better but also support local farmers and reduce our environmental footprint. Our chefs work closely with local suppliers to ensure we serve only the best that each season has to offer.</p><p>From spring asparagus to summer tomatoes, fall squash to winter root vegetables, each season brings new opportunities for culinary creativity. This commitment to freshness is what sets Bistro Bella apart and creates memorable dining experiences.</p><p><strong>Reserve Your Seasonal Experience</strong></p><p>Come taste the difference that fresh, seasonal ingredients make. <a href="/reservations" class="text-blue-600 hover:text-blue-800">Make a reservation</a> and discover why our guests keep coming back.</p>',
                'image' => '/images/blog/seasonal-ingredients.jpg',
                'author' => 'Chef Marco Rossi',
                'published_at' => '2025-12-18',
                'category' => 'Ingredients',
                'tags' => ['Seasonal', 'Fresh', 'Local'],
                'read_time' => 4,
                'featured' => false,
            ],
            [
                'id' => 3,
                'title' => 'Wine Pairing Guide: Perfect Matches for Our Menu',
                'slug' => 'wine-pairing-guide',
                'excerpt' => 'Expert tips on pairing wines with our signature dishes to elevate your dining experience.',
                'content' => '<p>Wine pairing is both an art and a science. The right wine can transform a good meal into an extraordinary one, enhancing flavors and creating harmony on your palate.</p><p>Our sommelier, Elena Bianchi, has curated a selection of wines that perfectly complement our signature dishes. From crisp whites with seafood to robust reds with hearty meats, each pairing is designed to elevate your dining experience.</p><p>Whether you\'re celebrating a special occasion or simply enjoying a night out, let our wine experts guide you to the perfect match. Our extensive cellar features wines from renowned vineyards around the world, carefully selected to complement our Italian-inspired cuisine.</p><p><strong>Book a Wine-Paired Dinner</strong></p><p>Enhance your dining experience with our expertly curated wine pairings. <a href="/reservations" class="text-blue-600 hover:text-blue-800">Reserve your table</a> and let our sommelier create the perfect wine experience for you.</p>',
                'image' => '/images/blog/wine-pairing.jpg',
                'author' => 'Sommelier Elena Bianchi',
                'published_at' => '2025-12-15',
                'category' => 'Beverages',
                'tags' => ['Wine', 'Pairing', 'Sommelier'],
                'read_time' => 6,
                'featured' => true,
            ],
            [
                'id' => 4,
                'title' => 'Behind the Scenes: A Day in the Life of Our Kitchen',
                'slug' => 'behind-scenes-kitchen',
                'excerpt' => 'Get an exclusive look at the hustle and bustle of our professional kitchen and the team that makes it all happen.',
                'content' => '<p>Step into the heart of Bistro Bella and witness the magic that happens behind closed doors. Our kitchen is a symphony of coordinated effort, where passion meets precision.</p><p>From the early morning prep work to the evening service rush, our team of dedicated professionals works tirelessly to ensure every dish meets our exacting standards. Led by Chef Marco Rossi, our brigade de cuisine operates like a well-oiled machine, each member playing a crucial role in creating memorable dining experiences.</p><p>The kitchen is alive with the sounds of sizzling pans, the aroma of fresh herbs, and the focused energy of a team united by their love for exceptional cuisine. It\'s this dedication to excellence that makes Bistro Bella more than just a restaurant—it\'s a culinary destination.</p><p><strong>Experience Our Culinary Excellence</strong></p><p>Come see the results of our kitchen\'s hard work. <a href="/reservations" class="text-blue-600 hover:text-blue-800">Book your table</a> and taste the difference that passion and precision make.</p>',
                'image' => '/images/blog/kitchen-scenes.jpg',
                'author' => 'Chef Marco Rossi',
                'published_at' => '2025-12-12',
                'category' => 'Behind the Scenes',
                'tags' => ['Kitchen', 'Team', 'Daily Life'],
                'read_time' => 7,
                'featured' => false,
            ],
            [
                'id' => 5,
                'title' => 'Sustainable Dining: Our Commitment to the Environment',
                'slug' => 'sustainable-dining-commitment',
                'excerpt' => 'How Bistro Bella is making a positive impact through sustainable practices and eco-friendly initiatives.',
                'content' => '<p>At Bistro Bella, sustainability isn\'t just a buzzword—it\'s a core value that guides everything we do. We believe that great food and environmental responsibility can go hand in hand.</p><p>From sourcing ingredients from local, sustainable farms to minimizing food waste through careful planning, we\'re committed to reducing our environmental footprint. Our restaurant uses energy-efficient appliances, composts organic waste, and supports conservation efforts in our community.</p><p>By choosing Bistro Bella, you\'re not just enjoying delicious food—you\'re supporting a restaurant that cares about the planet. Every meal contributes to a more sustainable future, one delicious bite at a time.</p><p><strong>Dine Sustainably with Us</strong></p><p>Join us in our commitment to sustainable dining. <a href="/reservations" class="text-blue-600 hover:text-blue-800">Make a reservation</a> and be part of the solution.</p>',
                'image' => '/images/blog/sustainable-dining.jpg',
                'author' => 'Chef Marco Rossi',
                'published_at' => '2025-12-10',
                'category' => 'Sustainability',
                'tags' => ['Sustainable', 'Environment', 'Eco-friendly'],
                'read_time' => 5,
                'featured' => true,
            ],
            [
                'id' => 6,
                'title' => 'Holiday Specials: Festive Menus for the Season',
                'slug' => 'holiday-specials-festive-menus',
                'excerpt' => 'Celebrate the holidays with our specially crafted festive menus featuring seasonal ingredients and traditional recipes.',
                'content' => '<p>The holiday season is upon us, and at Bistro Bella, we\'ve prepared something special for our guests. Our festive menus capture the joy and warmth of the season through carefully crafted dishes that celebrate tradition and innovation.</p><p>From our signature roasted turkey with herb stuffing to our decadent chocolate desserts, each dish is made with the finest seasonal ingredients. Our holiday menus are designed to create memorable moments with family and friends, combining classic recipes with modern twists.</p><p>Whether you\'re hosting a large gathering or enjoying an intimate dinner for two, our holiday specials offer something for everyone. Let us take care of the cooking while you focus on creating cherished memories.</p><p><strong>Book Your Holiday Celebration</strong></p><p>Make this holiday season unforgettable. <a href="/reservations" class="text-blue-600 hover:text-blue-800">Reserve your table</a> for our festive holiday menus and create lasting memories.</p>',
                'image' => '/images/blog/holiday-specials.jpg',
                'author' => 'Chef Marco Rossi',
                'published_at' => '2025-12-08',
                'category' => 'Special Events',
                'tags' => ['Holiday', 'Festive', 'Seasonal'],
                'read_time' => 4,
                'featured' => false,
            ],
        ];

        $post = collect($blogPosts)->firstWhere('slug', $slug);

        if (!$post) {
            abort(404);
        }

        // Get related posts (same category, excluding current)
        $relatedPosts = collect($blogPosts)->filter(function ($p) use ($post) {
            return $p['category'] === $post['category'] && $p['id'] !== $post['id'];
        })->take(3);

        return Inertia::render('Public/BlogPost', [
            'post' => $post,
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
