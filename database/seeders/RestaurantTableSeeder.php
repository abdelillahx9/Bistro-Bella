<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RestaurantTable;

class RestaurantTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tables = [
            ['table_number' => 'T01', 'capacity' => 4, 'is_active' => true],
            ['table_number' => 'T02', 'capacity' => 4, 'is_active' => true],
            ['table_number' => 'T03', 'capacity' => 4, 'is_active' => true],
            ['table_number' => 'T04', 'capacity' => 4, 'is_active' => true],
            ['table_number' => 'T05', 'capacity' => 4, 'is_active' => true],
            ['table_number' => 'T06', 'capacity' => 4, 'is_active' => true],
            ['table_number' => 'T07', 'capacity' => 4, 'is_active' => true],
            ['table_number' => 'T08', 'capacity' => 4, 'is_active' => true],
            ['table_number' => 'A01', 'capacity' => 4, 'is_active' => true],
            ['table_number' => 'A02', 'capacity' => 4, 'is_active' => true],
            ['table_number' => 'A03', 'capacity' => 4, 'is_active' => true],
            ['table_number' => 'A04', 'capacity' => 4, 'is_active' => false], // inactive table
            ['table_number' => 'B01', 'capacity' => 4, 'is_active' => true],
            ['table_number' => 'B02', 'capacity' => 4, 'is_active' => true],
            ['table_number' => 'B03', 'capacity' => 4, 'is_active' => true],
        ];

        foreach ($tables as $table) {
            RestaurantTable::create($table);
        }
    }
}
