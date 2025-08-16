<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            'Spicy',
            'Vegan',
            'Gluten Free',
            'Healthy',
            'Chef Special',
            'Popular',
            'Seasonal',
            'Traditional',
            'Fusion',
            'New',
            'Signature',
            'Light',
            'Hearty',
            'Comfort Food',
            'Fresh',
        ];

        foreach ($tags as $tagName) {
            Tag::create([
                'name' => $tagName,
            ]);
        }
    }
}
