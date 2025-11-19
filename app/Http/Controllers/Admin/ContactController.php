<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Contact;

class ContactController extends Controller
{
    /**
     * Display a listing of the contact messages.
     */
    public function index(): Response
    {
        $contacts = Contact::orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts,
        ]);
    }
}