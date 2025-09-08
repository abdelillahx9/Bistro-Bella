<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        return Inertia::render('Public/Home');
    }

    public function menu()
    {
        return Inertia::render('Public/Menu');
    }

    public function blog()
    {
        return Inertia::render('Public/Blog');
    }

    public function reservations()
    {
        return Inertia::render('Public/Reservations');
    }

    public function about()
    {
        return Inertia::render('Public/About');
    }

    public function contact()
    {
        return Inertia::render('Public/Contact');
    }

    public function reserve()
    {
        return Inertia::render('Public/Reserve');
    }
}
