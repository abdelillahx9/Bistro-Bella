import AuthenticatedLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Pagination from '@/Components/Pagination';

export default function ReviewsIndex({ reviews, menus, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [menuFilter, setMenuFilter] = useState(filters.menu || '');
    const [userFilter, setUserFilter] = useState(filters.user || '');
    const [ratingSort, setRatingSort] = useState(filters.rating_sort || '');
    const [showSearch, setShowSearch] = useState(false);
    const [showMenuFilter, setShowMenuFilter] = useState(false);
    const [showUserFilter, setShowUserFilter] = useState(false);

    // Real-time search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search !== filters.search || menuFilter !== filters.menu || userFilter !== filters.user || ratingSort !== filters.rating_sort) {
                router.get(route('admin.menu.reviews.index'), {
                    search,
                    menu: menuFilter,
                    user: userFilter,
                    rating_sort: ratingSort
                }, {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['reviews']
                });
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, menuFilter, userFilter, ratingSort]);

    const clearFilters = () => {
        setSearch('');
        setMenuFilter('');
        setUserFilter('');
        setRatingSort('');
        setShowSearch(false);
        setShowMenuFilter(false);
        setShowUserFilter(false);
    };

    const handleRatingSort = (direction) => {
        setRatingSort(direction);
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold leading-tight text-gray-800">Menu Management</h2>}>
            <Head title="Menu Reviews" />

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
                                            placeholder="Search by comment..."
                                            className="pl-4 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            autoFocus
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Menu Filter */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setShowMenuFilter(!showMenuFilter)}
                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                    title="Filter by Menu"
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
                                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </button>

                                {showMenuFilter && (
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={menuFilter}
                                            onChange={(e) => setMenuFilter(e.target.value)}
                                            placeholder="Search by menu name..."
                                            className="pl-4 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            autoFocus
                                        />
                                    </div>
                                )}
                            </div>

                            {/* User Filter */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setShowUserFilter(!showUserFilter)}
                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                    title="Filter by User"
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
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </button>

                                {showUserFilter && (
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={userFilter}
                                            onChange={(e) => setUserFilter(e.target.value)}
                                            placeholder="Search by user name..."
                                            className="pl-4 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            autoFocus
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Clear Filters Button */}
                            {(search || menuFilter || userFilter || ratingSort) && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-white">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Menu</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">
                                    <div className="flex items-center space-x-2">
                                        <span>Rating</span>
                                        <div className="flex flex-col space-y-1">
                                            <button
                                                onClick={() => handleRatingSort('desc')}
                                                className={`p-1 rounded hover:bg-gray-100 transition-colors ${ratingSort === 'desc' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                                                title="Sort High to Low"
                                            >
                                                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleRatingSort('asc')}
                                                className={`p-1 rounded hover:bg-gray-100 transition-colors ${ratingSort === 'asc' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                                                title="Sort Low to High"
                                            >
                                                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Comment</th>
                                <th className="px-6 py-3 text-center font-medium font-sans text-[14px] text-black uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-[14px] font-normal font-sans text-gray-900">
                            {reviews.data.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No reviews found.
                                    </td>
                                </tr>
                            ) : (
                                reviews.data.map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-900">{r.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-normal font-sans text-gray-900">{r.menu?.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">{r.user?.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex items-center">
                                                    {renderStars(r.rating)}
                                                </div>
                                                <span className="text-[14px] font-normal font-sans text-gray-500">({r.rating})</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[14px] font-normal font-sans text-gray-500">
                                            <div className="max-w-xs truncate">{r.comment || '-'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-[14px] font-normal font-sans">
                                            <div className="flex items-center justify-center">
                                                <Link
                                                    href={route('admin.menu.reviews.destroy', r.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                                                    onClick={(e) => { if (!confirm('Delete this review?')) e.preventDefault(); }}
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

                {/* Custom Pagination */}
                {reviews.data.length > 0 && (
                    <Pagination
                        links={reviews.links}
                        current_page={reviews.current_page}
                        last_page={reviews.last_page}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
