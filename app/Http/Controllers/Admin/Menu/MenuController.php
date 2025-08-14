<?php

namespace App\Http\Controllers\Admin\Menu;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    /**
     * Display the admin menu.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Menu/index');
    }
}
