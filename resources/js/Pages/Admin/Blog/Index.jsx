import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Pagination from '@/Components/Pagination';

export default function Index({ blogPosts, categories, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || '');
    const [showSearch, setShowSearch] = useState(false);
    const [showStatusFilter, setShowStatusFilter] = useState(false);
    const [showCategoryFilter, setShowCategoryFilter] = useState(false);

    const { delete: destroy, processing } = useForm();

    // Real-time search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm !== filters.search || statusFilter !== filters.status || categoryFilter !== filters.category) {
                router.get(route('admin.blog.index'), {
                    search: searchTerm,
                    status: statusFilter,
                    category: categoryFilter
                }, {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['blogPosts']
                });
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, statusFilter, categoryFilter]);

    const clearFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        setCategoryFilter('');
        setShowSearch(false);
        setShowStatusFilter(false);
        setShowCategoryFilter(false);
    };

    const handleDelete = (blogPost) => {
        if (confirm(`Are you sure you want to delete "${blogPost.title}"?`)) {
            destroy(`/admin/blog/${blogPost.id}`);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            draft: 'bg-gray-100 text-gray-800',
            published: 'bg-green-100 text-green-800'
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-bold leading-tight text-gray-800">Blog Management</h2>}>
            <Head title="Blog Management - Admin" />

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
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder="Search posts..."
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
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">All statuses</option>
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            {/* Category Filter */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                    title="Filter by Category"
                                >
                                    <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </button>

                                {showCategoryFilter && (
                                    <div className="relative">
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                            className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="">All categories</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            {/* Clear Filters Button */}
                            {(searchTerm || statusFilter || categoryFilter) && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>

                        {/* Right side - Action Buttons */}
                        <div className="flex items-center space-x-3">
                            <Link
                                href="/admin/blog-tags"
                                className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                            >
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                                Manage Tags
                            </Link>
                            <Link
                                href="/admin/blog/create"
                                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                            >
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8M8 12h8" />
                                </svg>
                                Create Post
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-200 rounded-lg">
                    {/* Horizontal scroll only for wide tables */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-white">
                                <tr>
                                    <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Post</th>
                                    <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Author</th>
                                    <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Created</th>
                                    <th className="px-6 py-3 text-center font-medium font-sans text-[14px] text-black uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-[14px] font-normal font-sans text-gray-900">
                                {blogPosts.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                            No blog posts found. <Link href="/admin/blog/create" className="text-blue-600 hover:underline">Create your first post</Link>
                                        </td>
                                    </tr>
                                ) : (
                                    blogPosts.data.map((post) => (
                                        <tr key={post.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {post.featured_image && (
                                                        <img
                                                            className="h-10 w-10 rounded-lg object-cover mr-3"
                                                            src={`/storage/${post.featured_image}`}
                                                            alt={post.title}
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="text-[14px] font-normal font-sans text-gray-900 max-w-xs truncate">
                                                            {post.title}
                                                        </div>
                                                        <div className="text-xs text-gray-500 max-w-xs truncate">
                                                            {post.excerpt}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-900">
                                                {post.category?.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(post.status)}`}>
                                                    {post.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">
                                                {post.author}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-[14px] font-normal font-sans">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <Link
                                                        href={`/admin/blog/${post.id}`}
                                                        className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-50 transition-colors duration-200"
                                                        title="View"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </Link>
                                                    <Link
                                                        href={`/admin/blog/${post.id}/edit`}
                                                        className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-50 transition-colors duration-200"
                                                        title="Edit"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post)}
                                                        disabled={processing}
                                                        className="text-gray-600 hover:text-red-600 p-2 rounded-full hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                                                        title="Delete"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
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
                {blogPosts.data.length > 0 && (
                    <Pagination
                        links={blogPosts.links}
                        current_page={blogPosts.current_page}
                        last_page={blogPosts.last_page}
                    />
                )}
            </div>
        </AdminLayout>
    );
}