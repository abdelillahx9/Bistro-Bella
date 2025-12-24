<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, update any 'online' values to 'website'
        DB::statement("UPDATE reservations SET source = 'website' WHERE source = 'online'");
        
        // Then change the enum
        DB::statement("ALTER TABLE reservations MODIFY COLUMN source ENUM('website', 'phone', 'walk-in') NOT NULL DEFAULT 'website'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Change back to the original enum
        DB::statement("ALTER TABLE reservations MODIFY COLUMN source ENUM('online', 'phone', 'walk-in') NOT NULL DEFAULT 'online'");
        
        // Update 'website' values back to 'online'
        DB::statement("UPDATE reservations SET source = 'online' WHERE source = 'website'");
    }
};
