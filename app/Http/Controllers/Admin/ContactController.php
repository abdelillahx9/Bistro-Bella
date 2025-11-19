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
    public function index(Request $request): Response
    {
        $filter = $request->get('filter', 'new');

        $query = Contact::orderBy('created_at', 'desc');

        switch ($filter) {
            case 'all':
                // No filter, show all
                break;
            case 'new':
                $query->where('archived', false);
                break;
            case 'archived':
                $query->where('archived', true);
                break;
        }

        $contacts = $query->paginate(15);

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts,
            'currentFilter' => $filter,
        ]);
    }

    /**
     * Display the specified contact message.
     */
    public function show(Contact $contact): Response
    {
        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $contact,
        ]);
    }

    /**
     * Archive the specified contact message.
     */
    public function archive(Contact $contact)
    {
        $contact->update(['archived' => true]);

        return redirect()->back()->with('success', 'Contact message archived successfully.');
    }
}