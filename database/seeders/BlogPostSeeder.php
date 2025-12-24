<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class BlogPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = BlogCategory::all();
        $tags = BlogTag::all();
        $adminUser = User::where('email', 'admin@bistrobella.com')->first();

        if ($categories->isEmpty() || $tags->isEmpty() || !$adminUser) {
            return; // Skip if dependencies not seeded
        }

        $blogPosts = [
            [
                'title' => 'Welcome to Bistro Bella: A Culinary Journey',
                'excerpt' => 'Discover the story behind Bistro Bella and our commitment to exceptional dining experiences.',
                'content' => '<p>Welcome to Bistro Bella, where culinary excellence meets warm hospitality. Our restaurant has been serving the community for over a decade, bringing together the finest ingredients and traditional Italian cooking techniques.</p>

<p>At Bistro Bella, we believe that great food brings people together. Our menu features authentic Italian dishes made with locally sourced ingredients, paired with an extensive wine selection curated by our sommelier.</p>

<p>Whether you\'re celebrating a special occasion or simply enjoying a night out, we invite you to experience the warmth and flavor that makes Bistro Bella a beloved dining destination.</p>',
                'author' => $adminUser->name,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(30),
                'seo_title' => 'Welcome to Bistro Bella - Authentic Italian Dining Experience',
                'seo_description' => 'Discover Bistro Bella\'s commitment to exceptional Italian cuisine, locally sourced ingredients, and memorable dining experiences.',
                'category_slug' => 'restaurant-news',
                'tag_slugs' => ['italian-cuisine', 'fine-dining', 'local-ingredients'],
            ],
            [
                'title' => 'Seasonal Menu: Spring Awakening',
                'excerpt' => 'Explore our new spring menu featuring fresh, seasonal ingredients and vibrant flavors.',
                'content' => '<p>As spring blossoms, so does our menu! We\'ve refreshed our offerings with the season\'s finest ingredients, celebrating the vibrant flavors of spring.</p>

<p>Our new seasonal menu features:</p>
<ul>
<li>Fresh asparagus risotto with truffle oil</li>
<li>Grilled lamb with spring herb crust</li>
<li>Strawberry panna cotta with balsamic reduction</li>
<li>Seasonal vegetable antipasti platter</li>
</ul>

<p>Each dish is carefully crafted to highlight the natural freshness and vibrant colors of spring produce. Our chefs work closely with local farmers to ensure we\'re using only the best seasonal ingredients.</p>',
                'author' => $adminUser->name,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(20),
                'seo_title' => 'Spring Seasonal Menu at Bistro Bella',
                'seo_description' => 'Discover our new spring menu featuring fresh seasonal ingredients, vibrant flavors, and locally sourced produce.',
                'category_slug' => 'food-wine',
                'tag_slugs' => ['seasonal-menu', 'local-ingredients', 'chef-special'],
            ],
            [
                'title' => 'Wine Pairing Guide: Italian Classics',
                'excerpt' => 'Learn how to pair wines with traditional Italian dishes for the perfect dining experience.',
                'content' => '<p>Wine pairing is both an art and a science. At Bistro Bella, we believe the right wine can elevate any meal to new heights. Here\'s our guide to pairing wines with classic Italian dishes:</p>

<h3>Chianti with Pasta Bolognese</h3>
<p>The robust tannins and acidity of Chianti Classico perfectly complement the rich, meaty sauce of our traditional Bolognese.</p>

<h3>Pinot Grigio with Seafood</h3>
<p>Our crisp Pinot Grigio provides the perfect balance to delicate seafood dishes, cutting through richness while enhancing natural flavors.</p>

<h3>Barolo with Osso Buco</h3>
<p>The powerful structure of Barolo stands up beautifully to the slow-braised veal shank, creating a harmonious marriage of flavors.</p>

<p>Our sommelier is always available to help you choose the perfect wine for your meal. Don\'t hesitate to ask for recommendations!</p>',
                'author' => $adminUser->name,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(15),
                'seo_title' => 'Italian Wine Pairing Guide - Bistro Bella',
                'seo_description' => 'Learn expert wine pairing tips for Italian classics. Discover how to match wines with pasta, seafood, and meat dishes.',
                'category_slug' => 'food-wine',
                'tag_slugs' => ['wine-pairing', 'italian-cuisine', 'fine-dining'],
            ],
            [
                'title' => 'Behind the Scenes: Meet Our Head Chef',
                'excerpt' => 'Get to know Chef Marco Rossi and his culinary philosophy that drives our kitchen.',
                'content' => '<p>Chef Marco Rossi has been at the helm of Bistro Bella\'s kitchen for eight years, bringing his passion for Italian cuisine and innovative spirit to every dish.</p>

<p>"Cooking is about storytelling," Chef Marco says. "Each ingredient has a history, and every dish tells a tale of tradition, innovation, and love."</p>

<p>Originally from Tuscany, Chef Marco trained in some of Italy\'s most prestigious kitchens before bringing his expertise to Bistro Bella. His approach combines time-honored techniques with modern creativity, resulting in dishes that are both familiar and exciting.</p>

<p>When he\'s not in the kitchen, you can find Chef Marco at local farmers\' markets, selecting the freshest ingredients for our daily specials. His commitment to quality and authenticity is what makes Bistro Bella special.</p>',
                'author' => $adminUser->name,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(10),
                'seo_title' => 'Meet Chef Marco Rossi - Bistro Bella\'s Culinary Vision',
                'seo_description' => 'Discover the story behind Chef Marco Rossi and his passion for authentic Italian cuisine at Bistro Bella.',
                'category_slug' => 'chefs-corner',
                'tag_slugs' => ['chef-special', 'italian-cuisine', 'local-ingredients'],
            ],
            [
                'title' => 'Mother\'s Day Brunch Special',
                'excerpt' => 'Celebrate Mother\'s Day with our special brunch menu featuring classic dishes with a modern twist.',
                'content' => '<p>This Mother\'s Day, treat the special women in your life to an unforgettable brunch experience at Bistro Bella. Our Mother\'s Day Brunch Special features:</p>

<h3>Brunch Cocktails</h3>
<ul>
<li>Mimosa Tower with fresh-squeezed orange juice</li>
<li>Bellini Bar with peach purée</li>
<li>Custom Bloody Mary station</li>
</ul>

<h3>Sweet Beginnings</h3>
<ul>
<li>Artisan pastries and croissants</li>
<li>Fresh fruit platters</li>
<li>House-made granola with yogurt</li>
</ul>

<h3>Savory Selections</h3>
<ul>
<li>Smoked salmon Benedict</li>
<li>Truffle scrambled eggs</li>
<li>Vegetarian frittata with seasonal vegetables</li>
<li>Classic eggs Florentine</li>
</ul>

<p>Reservations are recommended. Call us at (555) 123-4567 to book your table for this special occasion.</p>',
                'author' => $adminUser->name,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(5),
                'seo_title' => 'Mother\'s Day Brunch Special at Bistro Bella',
                'seo_description' => 'Celebrate Mother\'s Day with our special brunch menu featuring brunch cocktails, artisan pastries, and savory selections.',
                'category_slug' => 'events-specials',
                'tag_slugs' => ['events', 'chef-special', 'seasonal-menu'],
            ],
            [
                'title' => 'Customer Spotlight: The Johnson Family',
                'excerpt' => 'Hear from the Johnson family about their memorable dining experience at Bistro Bella.',
                'content' => '<p>The Johnson family has been dining at Bistro Bella for over five years, and they recently celebrated their 25th wedding anniversary with us. We asked them to share their experience:</p>

<blockquote>
"Bistro Bella isn\'t just a restaurant to us—it\'s where we\'ve celebrated every milestone in our family. From our first date to our children\'s birthdays, the staff here has become like family. The food is consistently excellent, and the atmosphere is always warm and welcoming."
</blockquote>

<p>The Johnsons particularly love our:</p>
<ul>
<li>Traditional lasagna for family gatherings</li>
<li>Extensive wine list for special occasions</li>
<li>Private dining room for intimate celebrations</li>
</ul>

<p>"We wouldn\'t dream of celebrating anywhere else," Mrs. Johnson says. "Bistro Bella is our home away from home."</p>

<p>Thank you to the Johnson family for being such wonderful patrons. We look forward to many more celebrations together!</p>',
                'author' => $adminUser->name,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(2),
                'seo_title' => 'Customer Story: The Johnson Family at Bistro Bella',
                'seo_description' => 'Read about the Johnson family\'s memorable dining experiences and celebrations at Bistro Bella over the past five years.',
                'category_slug' => 'customer-stories',
                'tag_slugs' => ['customer-experience', 'events', 'fine-dining'],
            ],
            [
                'title' => 'Classic Tiramisu Recipe',
                'excerpt' => 'Learn how to make our signature tiramisu at home with this authentic Italian recipe.',
                'content' => '<h2>Ingredients (Serves 8-10)</h2>

<h3>For the Cream:</h3>
<ul>
<li>6 large egg yolks</li>
<li>¾ cup granulated sugar</li>
<li>1 cup mascarpone cheese</li>
<li>1½ cups heavy whipping cream</li>
</ul>

<h3>For Assembly:</h3>
<ul>
<li>2 cups strong brewed coffee, cooled</li>
<li>2 tablespoons coffee liqueur (optional)</li>
<li>24 ladyfinger cookies</li>
<li>Unsweetened cocoa powder for dusting</li>
<li>Dark chocolate shavings for garnish</li>
</ul>

<h2>Instructions</h2>

<h3>Step 1: Prepare the Coffee</h3>
<p>Brew strong coffee and let it cool completely. Stir in coffee liqueur if using. Set aside.</p>

<h3>Step 2: Make the Mascarpone Cream</h3>
<p>In a large bowl, whisk egg yolks and sugar until pale and thick. Add mascarpone and mix until smooth. In a separate bowl, whip the heavy cream to stiff peaks. Gently fold whipped cream into mascarpone mixture.</p>

<h3>Step 3: Assemble the Tiramisu</h3>
<p>Dip ladyfingers briefly in coffee mixture and arrange in a single layer in an 8x8-inch dish. Spread half the cream mixture over the ladyfingers. Repeat with another layer of dipped ladyfingers and remaining cream.</p>

<h3>Step 4: Chill and Serve</h3>
<p>Cover and refrigerate for at least 4 hours (preferably overnight). Before serving, dust with cocoa powder and garnish with chocolate shavings.</p>

<p><em>Note: This recipe requires raw eggs. Use pasteurized eggs if you prefer, or substitute with a cooked custard base.</em></p>',
                'author' => $adminUser->name,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(1),
                'seo_title' => 'Authentic Tiramisu Recipe from Bistro Bella',
                'seo_description' => 'Learn to make classic Italian tiramisu with our signature recipe featuring mascarpone cream and coffee-soaked ladyfingers.',
                'category_slug' => 'recipes',
                'tag_slugs' => ['recipes', 'italian-cuisine', 'cooking-tips'],
            ],
            [
                'title' => 'Summer Outdoor Dining Guide',
                'excerpt' => 'Make the most of our beautiful outdoor patio this summer with dining tips and seasonal recommendations.',
                'content' => '<p>As the weather warms up, our outdoor patio becomes the perfect setting for memorable dining experiences. Here are some tips to make the most of your summer visits:</p>

<h3>Best Times to Visit</h3>
<p>Our outdoor patio is open from 5 PM to 10 PM, weather permitting. Early evening reservations offer the best chance for your preferred table and allow you to enjoy the sunset over your meal.</p>

<h3>Summer Menu Highlights</h3>
<ul>
<li>Grilled seafood platter with seasonal vegetables</li>
<li>Cold gazpacho with local heirloom tomatoes</li>
<li>Lemon herb chicken with summer squash</li>
<li>Fresh berry tiramisu</li>
</ul>

<h3>Weather Considerations</h3>
<p>We provide heaters for cooler evenings and misters for hot days. In case of rain, we can accommodate your reservation indoors with the same menu and service.</p>

<h3>Private Events</h3>
<p>Our outdoor space is perfect for private events, weddings, and celebrations. Contact our events coordinator to discuss your special occasion.</p>

<p>Book your summer outdoor dining experience today!</p>',
                'author' => $adminUser->name,
                'status' => 'draft',
                'published_at' => null,
                'seo_title' => 'Summer Outdoor Dining at Bistro Bella',
                'seo_description' => 'Enjoy summer dining on our beautiful outdoor patio with seasonal menu highlights and perfect weather accommodations.',
                'category_slug' => 'events-specials',
                'tag_slugs' => ['events', 'seasonal-menu', 'fine-dining'],
            ],
        ];

        foreach ($blogPosts as $postData) {
            $category = $categories->where('slug', $postData['category_slug'])->first();

            if ($category) {
                $post = BlogPost::create([
                    'title' => $postData['title'],
                    'slug' => Str::slug($postData['title']),
                    'excerpt' => $postData['excerpt'],
                    'content' => $postData['content'],
                    'author' => $postData['author'],
                    'blog_category_id' => $category->id,
                    'status' => $postData['status'],
                    'published_at' => $postData['published_at'],
                    'seo_title' => $postData['seo_title'],
                    'seo_description' => $postData['seo_description'],
                ]);

                // Attach tags
                $tagIds = $tags->whereIn('slug', $postData['tag_slugs'])->pluck('id');
                $post->tags()->attach($tagIds);
            }
        }
    }
}