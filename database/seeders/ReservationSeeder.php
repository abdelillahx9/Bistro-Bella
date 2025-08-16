<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $statuses = ['pending', 'confirmed', 'seated', 'cancelled'];
        $sources = ['online', 'phone', 'walk-in'];

        // Create sample reservations
        for ($i = 0; $i < 20; $i++) {
            $date = Carbon::now()->addDays(rand(-30, 30));
            $time = sprintf('%02d:%02d', rand(17, 22), rand(0, 3) * 15); // Times between 5:00 PM and 10:45 PM in 15-min intervals

            Reservation::create([
                'user_id' => rand(0, 1) ? $users->random()->id : null, // 50% chance of having a user
                'name' => fake()->name(),
                'email' => rand(0, 1) ? fake()->email() : null,
                'phone' => rand(0, 1) ? fake()->phoneNumber() : null,
                'reservation_date' => $date->format('Y-m-d'),
                'reservation_time' => $time,
                'guest_count' => rand(1, 8),
                'special_requests' => rand(0, 1) ? fake()->sentence() : null,
                'status' => $statuses[array_rand($statuses)],
                'source' => $sources[array_rand($sources)],
                'created_at' => $date->subDays(rand(1, 5)),
                'updated_at' => $date->subDays(rand(0, 3)),
            ]);
        }
    }
}
