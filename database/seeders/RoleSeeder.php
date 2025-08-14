<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $userRole = Role::create(['name' => 'user']);

        // Create permissions (optional - you can add more later)
        $permissions = [
            'view dashboard',
            'manage users',
            'manage orders',
            'manage menu',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Assign permissions to admin role
        $adminRole->givePermissionTo($permissions);

        // User role gets basic permissions (you can customize this)
        $userRole->givePermissionTo(['view dashboard']);
    }
}
