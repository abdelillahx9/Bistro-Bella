<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the user homepage.
     */
    public function index(): Response
    {
        return Inertia::render('Home');
    }
}
