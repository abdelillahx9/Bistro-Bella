<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Home');
    }

    public function profile()
    {
        return Inertia::render('User/Profile');
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