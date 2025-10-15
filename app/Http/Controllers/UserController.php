<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('User/Dashboard');
    }

    public function reservations()
    {
        return Inertia::render('User/Reservations');
    }

    public function profile()
    {
        return Inertia::render('User/Profile');
    }

    public function menu()
    {
        return Inertia::render('User/Menu');
    }

    public function contact()
    {
        return Inertia::render('User/Contact');
    }

    public function events()
    {
        return Inertia::render('User/Events');
    }

    public function reviews()
    {
        return Inertia::render('User/Reviews');
    }

    public function activity()
    {
        return Inertia::render('User/Activity');
    }
}