<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenuCategory;
use Illuminate\Support\Str;

class MenuCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Starters', 'description' => 'Delicious starters to begin your meal.'],
            ['name' => 'Main Courses', 'description' => 'Hearty main dishes.'],
            ['name' => 'Desserts', 'description' => 'Sweet treats to finish.'],
            ['name' => 'Beverages', 'description' => 'Refreshing drinks and more.'],
        ];

        foreach ($categories as $cat) {
            MenuCategory::create([
                'name' => $cat['name'],
                'slug' => Str::slug($cat['name']),
                'description' => $cat['description'] ?? null,
            ]);
        }
    }
}
