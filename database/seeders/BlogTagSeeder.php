<?php

namespace Database\Seeders;

use App\Models\BlogTag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            [
                'name' => 'Italian Cuisine',
                'slug' => 'italian-cuisine',
            ],
            [
                'name' => 'Fine Dining',
                'slug' => 'fine-dining',
            ],
            [
                'name' => 'Wine Pairing',
                'slug' => 'wine-pairing',
            ],
            [
                'name' => 'Seasonal Menu',
                'slug' => 'seasonal-menu',
            ],
            [
                'name' => 'Chef Special',
                'slug' => 'chef-special',
            ],
            [
                'name' => 'Local Ingredients',
                'slug' => 'local-ingredients',
            ],
            [
                'name' => 'Events',
                'slug' => 'events',
            ],
            [
                'name' => 'Reservations',
                'slug' => 'reservations',
            ],
            [
                'name' => 'Customer Experience',
                'slug' => 'customer-experience',
            ],
            [
                'name' => 'Recipes',
                'slug' => 'recipes',
            ],
            [
                'name' => 'Cooking Tips',
                'slug' => 'cooking-tips',
            ],
            [
                'name' => 'Food Photography',
                'slug' => 'food-photography',
            ],
        ];

        foreach ($tags as $tag) {
            BlogTag::create($tag);
        }
    }
}