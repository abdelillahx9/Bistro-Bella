<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;
use App\Models\MenuCategory;
use App\Models\Tag;
use Illuminate\Support\Str;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // Get existing categories and tags
        $categories = MenuCategory::all()->keyBy('name');
        $tags = Tag::all()->keyBy('name');

        $menuItems = [
            // Starters
            [
                'category' => 'Starters',
                'name' => 'Bruschetta',
                'description' => 'Toasted bread topped with fresh tomatoes, basil, garlic, and olive oil.',
                'price' => 12.99,
                'is_vegetarian' => true,
                'is_gluten_free' => false,
                'is_available' => true,
                'tags' => ['Fresh', 'Traditional', 'Light']
            ],
            [
                'category' => 'Starters',
                'name' => 'Calamari Fritti',
                'description' => 'Crispy fried squid rings served with marinara sauce and lemon.',
                'price' => 16.99,
                'is_vegetarian' => false,
                'is_gluten_free' => false,
                'is_available' => true,
                'tags' => ['Popular', 'Traditional', 'Fresh']
            ],
            [
                'category' => 'Starters',
                'name' => 'Caprese Salad',
                'description' => 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze.',
                'price' => 14.99,
                'is_vegetarian' => true,
                'is_gluten_free' => true,
                'is_available' => true,
                'tags' => ['Vegan', 'Gluten Free', 'Fresh', 'Light']
            ],
            [
                'category' => 'Starters',
                'name' => 'Buffalo Wings',
                'description' => 'Spicy chicken wings tossed in buffalo sauce with celery and blue cheese.',
                'price' => 15.99,
                'is_vegetarian' => false,
                'is_gluten_free' => true,
                'is_available' => true,
                'tags' => ['Spicy', 'Popular', 'Comfort Food']
            ],

            // Main Courses
            [
                'category' => 'Main Courses',
                'name' => 'Grilled Salmon',
                'description' => 'Fresh Atlantic salmon grilled to perfection with lemon herb butter.',
                'price' => 28.99,
                'is_vegetarian' => false,
                'is_gluten_free' => true,
                'is_available' => true,
                'tags' => ['Healthy', 'Fresh', 'Popular', 'Chef Special']
            ],
            [
                'category' => 'Main Courses',
                'name' => 'Pasta Primavera',
                'description' => 'Seasonal vegetables tossed with penne pasta in a light garlic olive oil sauce.',
                'price' => 22.99,
                'is_vegetarian' => true,
                'is_gluten_free' => false,
                'is_available' => true,
                'tags' => ['Vegan', 'Light', 'Seasonal', 'Popular']
            ],
            [
                'category' => 'Main Courses',
                'name' => 'Chicken Parmesan',
                'description' => 'Breaded chicken breast topped with marinara sauce and melted mozzarella.',
                'price' => 26.99,
                'is_vegetarian' => false,
                'is_gluten_free' => false,
                'is_available' => true,
                'tags' => ['Traditional', 'Comfort Food', 'Popular']
            ],
            [
                'category' => 'Main Courses',
                'name' => 'Beef Tenderloin',
                'description' => 'Prime beef tenderloin cooked to your preference with red wine reduction.',
                'price' => 42.99,
                'is_vegetarian' => false,
                'is_gluten_free' => true,
                'is_available' => true,
                'tags' => ['Signature', 'Chef Special', 'Hearty']
            ],
            [
                'category' => 'Main Courses',
                'name' => 'Mushroom Risotto',
                'description' => 'Creamy Arborio rice with wild mushrooms, parmesan, and truffle oil.',
                'price' => 24.99,
                'is_vegetarian' => true,
                'is_gluten_free' => true,
                'is_available' => true,
                'tags' => ['Vegan', 'Gluten Free', 'Chef Special', 'Seasonal']
            ],
            [
                'category' => 'Main Courses',
                'name' => 'Spicy Thai Curry',
                'description' => 'Coconut curry with vegetables and your choice of protein, served with jasmine rice.',
                'price' => 23.99,
                'is_vegetarian' => false,
                'is_gluten_free' => true,
                'is_available' => true,
                'tags' => ['Spicy', 'Fusion', 'Healthy', 'New']
            ],

            // Desserts
            [
                'category' => 'Desserts',
                'name' => 'Tiramisu',
                'description' => 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.',
                'price' => 9.99,
                'is_vegetarian' => true,
                'is_gluten_free' => false,
                'is_available' => true,
                'tags' => ['Traditional', 'Popular', 'Signature']
            ],
            [
                'category' => 'Desserts',
                'name' => 'Chocolate Lava Cake',
                'description' => 'Warm chocolate cake with molten center, served with vanilla ice cream.',
                'price' => 11.99,
                'is_vegetarian' => true,
                'is_gluten_free' => false,
                'is_available' => true,
                'tags' => ['Popular', 'Comfort Food', 'Chef Special']
            ],
            [
                'category' => 'Desserts',
                'name' => 'Seasonal Fruit Tart',
                'description' => 'Fresh seasonal fruits on a buttery pastry crust with custard filling.',
                'price' => 10.99,
                'is_vegetarian' => true,
                'is_gluten_free' => false,
                'is_available' => true,
                'tags' => ['Fresh', 'Seasonal', 'Light']
            ],
            [
                'category' => 'Desserts',
                'name' => 'Gelato Selection',
                'description' => 'Three scoops of house-made Italian gelato in your choice of flavors.',
                'price' => 8.99,
                'is_vegetarian' => true,
                'is_gluten_free' => true,
                'is_available' => true,
                'tags' => ['Traditional', 'Light', 'Fresh']
            ],

            // Beverages
            [
                'category' => 'Beverages',
                'name' => 'House Wine Selection',
                'description' => 'Red or white wine by the glass, carefully selected by our sommelier.',
                'price' => 8.99,
                'is_vegetarian' => true,
                'is_gluten_free' => true,
                'is_available' => true,
                'tags' => ['Popular', 'Traditional']
            ],
            [
                'category' => 'Beverages',
                'name' => 'Craft Beer',
                'description' => 'Rotating selection of local craft beers on tap.',
                'price' => 6.99,
                'is_vegetarian' => true,
                'is_gluten_free' => true,
                'is_available' => true,
                'tags' => ['Popular', 'Fresh', 'New']
            ],
            [
                'category' => 'Beverages',
                'name' => 'Fresh Juice',
                'description' => 'Freshly squeezed orange, apple, or mixed berry juice.',
                'price' => 5.99,
                'is_vegetarian' => true,
                'is_gluten_free' => true,
                'is_available' => true,
                'tags' => ['Healthy', 'Fresh', 'Light']
            ],
            [
                'category' => 'Beverages',
                'name' => 'Italian Soda',
                'description' => 'Sparkling water with your choice of natural fruit syrup.',
                'price' => 4.99,
                'is_vegetarian' => true,
                'is_gluten_free' => true,
                'is_available' => true,
                'tags' => ['Light', 'Traditional', 'Healthy']
            ],
            [
                'category' => 'Beverages',
                'name' => 'Specialty Coffee',
                'description' => 'Espresso, cappuccino, or latte made with premium beans.',
                'price' => 4.99,
                'is_vegetarian' => true,
                'is_gluten_free' => true,
                'is_available' => true,
                'tags' => ['Popular', 'Traditional']
            ]
        ];

        foreach ($menuItems as $item) {
            $category = $categories[$item['category']];

            $menu = Menu::create([
                'category_id' => $category->id,
                'name' => $item['name'],
                'slug' => Str::slug($item['name']),
                'description' => $item['description'],
                'price' => $item['price'],
                'is_vegetarian' => $item['is_vegetarian'],
                'is_gluten_free' => $item['is_gluten_free'],
                'is_available' => $item['is_available'],
            ]);

            // Attach tags
            if (isset($item['tags']) && is_array($item['tags'])) {
                $tagIds = [];
                foreach ($item['tags'] as $tagName) {
                    if (isset($tags[$tagName])) {
                        $tagIds[] = $tags[$tagName]->id;
                    }
                }
                $menu->tags()->attach($tagIds);
            }
        }
    }
}