import AuthenticatedLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Pagination from '@/Components/Pagination';

export default function ReviewsIndex({ reviews, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [user, setUser] = useState(filters.user || '');
    const [ratingSort, setRatingSort] = useState(filters.rating_sort || '');
    const [showSearch, setShowSearch] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    // Real-time search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search !== filters.search || user !== filters.user || ratingSort !== filters.rating_sort) {
                router.get(route('admin.reviews.index'), { search, user, rating_sort: ratingSort }, {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['reviews']
                });
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, user, ratingSort]);

    const clearFilters = () => {
        setSearch('');
        setUser('');
        setRatingSort('');
        setShowSearch(false);
        setShowFilter(false);
    };

    const toggleFeatured = (reviewId) => {
        router.patch(route('admin.reviews.toggle-featured', reviewId), {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Optionally refresh the page or update state
            }
        });
    };

    const toggleHidden = (reviewId) => {
        router.patch(route('admin.reviews.toggle-hidden', reviewId), {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Optionally refresh the page or update state
            }
        });
    };

    const renderStars = (rating) => {
        return [1, 2, 3, 4, 5].map((star) => (
            <svg
                key={star}
                className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                viewBox="0 0 24 24"
            >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
        ));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold leading-tight text-gray-800">Reviews Management</h2>}>
            <Head title="Reviews Management" />

            <div className="min-h-screen bg-gray-50 p-6">

            {/* Search and Filter Section */}
            <div className="mb-6 rounded-lg  p-4">
                <div className="flex items-center justify-between">
                    {/* Left side - Search and Filter */}
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
                                        placeholder="Search reviews..."
                                        className="pl-4 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        autoFocus
                                    />
                                </div>
                            )}
                        </div>

                        {/* Filter */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                title="Filter"
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
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                                    />
                                </svg>
                            </button>

                            {showFilter && (
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                        placeholder="Filter by user..."
                                        className="pl-4 pr-4 py-2 w-48 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <select
                                        value={ratingSort}
                                        onChange={(e) => setRatingSort(e.target.value)}
                                        className="block w-32 pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">Sort by Rating</option>
                                        <option value="desc">Highest First</option>
                                        <option value="asc">Lowest First</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Clear Filters Button */}
                        {(search || user || ratingSort) && (
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
                            <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Rating</th>
                            <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Review</th>
                            <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Featured</th>
                            <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Hidden</th>
                            <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-center font-medium font-sans text-[14px] text-black uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-[14px] font-normal font-sans text-gray-900">
                        {reviews.data.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                    No reviews found.
                                </td>
                            </tr>
                        ) : (
                            reviews.data.map((review) => (
                                <tr key={review.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                                                <span className="text-orange-600 font-semibold text-sm">
                                                    {review.user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="text-[14px] font-normal font-sans text-gray-900">
                                                {review.user.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-1">
                                            {renderStars(review.rating)}
                                            <span className="ml-2 text-sm text-gray-600">({review.rating})</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-[14px] font-normal font-sans text-gray-900 max-w-xs truncate">
                                            {review.comment || 'No comment provided'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => toggleFeatured(review.id)}
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors duration-200 ${
                                                review.is_featured
                                                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                            }`}
                                            title={review.is_featured ? 'Click to unfeature' : 'Click to feature'}
                                        >
                                            {review.is_featured ? 'Featured' : 'Not Featured'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => toggleHidden(review.id)}
                                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors duration-200 ${
                                                review.is_hidden
                                                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                            }`}
                                            title={review.is_hidden ? 'Click to show' : 'Click to hide'}
                                        >
                                            {review.is_hidden ? 'Hidden' : 'Visible'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">
                                        {formatDate(review.created_at)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-[14px] font-normal font-sans">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Link
                                                href={route('admin.reviews.destroy', review.id)}
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