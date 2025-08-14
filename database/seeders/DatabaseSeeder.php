<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles first
        $this->call(RoleSeeder::class);

        // User::factory(10)->create();

        // Create test user with user role
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'user@bistrobella.com',
            'password' => bcrypt('password123'),
        ]);
        $testUser->assignRole('user');

        // Create admin user
        $adminUser = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@bistrobella.com',
            'password' => bcrypt('admin123'),
        ]);
        $adminUser->assignRole('admin');
    }
}
