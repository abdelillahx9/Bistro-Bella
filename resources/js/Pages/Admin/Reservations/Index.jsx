import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Pagination from '@/Components/Pagination';

export default function ReservationsIndex({ reservations, filters, statuses, sources }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [source, setSource] = useState(filters.source || '');
    const [date, setDate] = useState(filters.date || '');
    const [showSearch, setShowSearch] = useState(false);
    const [showStatusFilter, setShowStatusFilter] = useState(false);
    const [showSourceFilter, setShowSourceFilter] = useState(false);
    const [showDateFilter, setShowDateFilter] = useState(false);

    // Real-time search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search !== filters.search || status !== filters.status || source !== filters.source || date !== filters.date) {
                router.get(route('admin.reservations.index'), { search, status, source, date }, {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['reservations']
                });
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, status, source, date]);

    const clearFilters = () => {
        setSearch('');
        setStatus('');
        setSource('');
        setDate('');
        setShowSearch(false);
        setShowStatusFilter(false);
        setShowSourceFilter(false);
        setShowDateFilter(false);
    };

    const formatTime = (timeString) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold leading-tight text-gray-800">Reservation Management</h2>}>
            <Head title="Reservation Management" />

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
                                        placeholder="Search reservations..."
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>

                            {showStatusFilter && (
                                <div className="relative">
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">All statuses</option>
                                        {statuses.map((s) => (
                                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Source Filter */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowSourceFilter(!showSourceFilter)}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                title="Filter by Source"
                            >
                                <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h1a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </button>

                            {showSourceFilter && (
                                <div className="relative">
                                    <select
                                        value={source}
                                        onChange={(e) => setSource(e.target.value)}
                                        className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">All sources</option>
                                        {sources.map((s) => (
                                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Date Filter */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowDateFilter(!showDateFilter)}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                title="Filter by Date"
                            >
                                <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </button>

                            {showDateFilter && (
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="pl-4 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Clear Filters Button */}
                        {(search || status || source || date) && (
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
                        href={route('admin.reservations.create')}
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8M8 12h8" />
                        </svg>
                        Create Reservation
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
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Guest</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Guests</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Source</th>
                                <th className="px-6 py-3 text-center font-medium font-sans text-[14px] text-black uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-[14px] font-normal font-sans text-gray-900">
                            {reservations.data.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                                        No reservations found. <Link href={route('admin.reservations.create')} className="text-blue-600 hover:underline">Create your first reservation</Link>
                                    </td>
                                </tr>
                            ) : (
                                reservations.data.map((reservation) => (
                                    <tr key={reservation.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-900">{reservation.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-normal font-sans text-gray-900">{reservation.name}</div>
                                            {reservation.user && (
                                                <div className="text-xs text-gray-500">Account: {reservation.user.name}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">
                                            <div>{reservation.email || 'N/A'}</div>
                                            <div>{reservation.phone || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">
                                            <div>{formatDate(reservation.reservation_date)}</div>
                                            <div>{formatTime(reservation.reservation_time)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">{reservation.guest_count}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' : reservation.status === 'seated' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                                                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${reservation.source === 'online' ? 'bg-blue-100 text-blue-800' : reservation.source === 'phone' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                                                {reservation.source.charAt(0).toUpperCase() + reservation.source.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-[14px] font-normal font-sans">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Link
                                                    href={route('admin.reservations.edit', reservation.id)}
                                                    className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
                                                    title="Edit"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </Link>
                                                <Link
                                                    href={route('admin.reservations.destroy', reservation.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                                                    onClick={(e) => { if (!confirm('Delete this reservation?')) e.preventDefault(); }}
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
            {reservations.data.length > 0 && (
                <Pagination
                    links={reservations.links}
                    current_page={reservations.current_page}
                    last_page={reservations.last_page}
                />
            )}
            </div>
        </AuthenticatedLayout>
    );
}
