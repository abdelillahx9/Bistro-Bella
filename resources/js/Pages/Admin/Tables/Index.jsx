import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Pagination from '@/Components/Pagination';

export default function TablesIndex({ tables, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [showSearch, setShowSearch] = useState(false);
    const [showStatusFilter, setShowStatusFilter] = useState(false);

    // Real-time search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search !== filters.search || status !== filters.status) {
                router.get(route('admin.tables.index'), { search, status }, {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['tables']
                });
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, status]);

    const clearFilters = () => {
        setSearch('');
        setStatus('');
        setShowSearch(false);
        setShowStatusFilter(false);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold leading-tight text-gray-800">Table Management</h2>}>
            <Head title="Table Management" />

            <div className="min-h-screen bg-gray-50 p-6">

            {/* Search and Filter Section */}
            <div className="mb-6 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    {/* Left side - Search and Filters */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowSearch(!showSearch)}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                title="Search"
                            >
                                <svg
                                    className="h-5 w-5 text-black"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>

                            {showSearch && (
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search tables..."
                                        className="pl-4 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        autoFocus
                                    />
                                </div>
                            )}
                        </div>

                        {/* Status Filter */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowStatusFilter(!showStatusFilter)}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                title="Filter by Status"
                            >
                                <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                            </button>

                            {showStatusFilter && (
                                <div className="relative">
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">All tables</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Clear Filters Button */}
                        {(search || status) && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-gray-500 hover:text-gray-700 underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* Right side - Create Button */}
                    <Link
                        href={route('admin.tables.create')}
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8M8 12h8" />
                        </svg>
                        Create Table
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-lg">
                {/* Horizontal scroll only for wide tables */}
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-white">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Table Number</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Capacity</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Current Reservations</th>
                                <th className="px-6 py-3 text-center font-medium font-sans text-[14px] text-black uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-[14px] font-normal font-sans text-gray-900">
                            {tables.data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No tables found. <Link href={route('admin.tables.create')} className="text-blue-600 hover:underline">Create your first table</Link>
                                    </td>
                                </tr>
                            ) : (
                                tables.data.map((table) => (
                                    <tr key={table.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-900">{table.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-medium font-sans text-gray-900">{table.table_number}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">{table.capacity} guests</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${table.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {table.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">
                                            {table.reservations_count || 0} reservations
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-[14px] font-normal font-sans">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Link
                                                    href={route('admin.tables.edit', table.id)}
                                                    className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
                                                    title="Edit"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </Link>
                                                <Link
                                                    href={route('admin.tables.destroy', table.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                                                    onClick={(e) => { if (!confirm('Delete this table?')) e.preventDefault(); }}
                                                    title="Delete"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Pagination */}
            {tables.data.length > 0 && (
                <Pagination
                    links={tables.links}
                    current_page={tables.current_page}
                    last_page={tables.last_page}
                />
            )}
            </div>
        </AuthenticatedLayout>
    );
}
