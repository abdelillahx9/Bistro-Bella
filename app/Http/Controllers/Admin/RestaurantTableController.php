<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RestaurantTable;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RestaurantTableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $status = $request->get('status');

        $tables = RestaurantTable::query()
            ->when($search, function ($query, $search) {
                $query->where('table_number', 'like', "%{$search}%");
            })
            ->when($status !== null, function ($query) use ($status) {
                $query->where('is_active', $status === 'active');
            })
            ->withCount('reservations')
            ->orderBy('table_number')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Tables/Index', [
            'tables' => $tables,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Tables/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'table_number' => 'required|string|max:50|unique:restaurant_tables,table_number',
            'capacity' => 'required|integer|min:1|max:20',
            'is_active' => 'boolean',
        ]);

        RestaurantTable::create([
            'table_number' => $request->table_number,
            'capacity' => $request->capacity,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()->route('admin.tables.index')->with('success', 'Table created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RestaurantTable $table)
    {
        return Inertia::render('Admin/Tables/Edit', [
            'table' => $table,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RestaurantTable $table)
    {
        $request->validate([
            'table_number' => 'required|string|max:50|unique:restaurant_tables,table_number,' . $table->id,
            'capacity' => 'required|integer|min:1|max:20',
            'is_active' => 'boolean',
        ]);

        $table->update([
            'table_number' => $request->table_number,
            'capacity' => $request->capacity,
            'is_active' => $request->boolean('is_active', true),
        ]);

        return redirect()->route('admin.tables.index')->with('success', 'Table updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RestaurantTable $table)
    {
        $table->delete();

        return redirect()->route('admin.tables.index')->with('success', 'Table deleted successfully.');
    }
}
