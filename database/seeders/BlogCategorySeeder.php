<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Restaurant News',
                'slug' => 'restaurant-news',
            ],
            [
                'name' => 'Chef\'s Corner',
                'slug' => 'chefs-corner',
            ],
            [
                'name' => 'Food & Wine',
                'slug' => 'food-wine',
            ],
            [
                'name' => 'Events & Specials',
                'slug' => 'events-specials',
            ],
            [
                'name' => 'Customer Stories',
                'slug' => 'customer-stories',
            ],
            [
                'name' => 'Recipes',
                'slug' => 'recipes',
            ],
        ];

        foreach ($categories as $category) {
            BlogCategory::create($category);
        }
    }
}