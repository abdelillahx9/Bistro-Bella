import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ blogPosts, categories, filters }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [categoryFilter, setCategoryFilter] = useState(filters.category || '');

    const { delete: destroy, processing } = useForm();

    const handleDelete = (blogPost) => {
        if (confirm(`Are you sure you want to delete "${blogPost.title}"?`)) {
            destroy(route('admin.blog.destroy', blogPost.id));
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
        <AdminLayout>
            <Head title="Blog Management - Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
                                <div className="flex space-x-3">
                                    <Link
                                        href={route('admin.blog-tags.index')}
                                        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg"
                                    >
                                        Manage Tags
                                    </Link>
                                    <Link
                                        href={route('admin.blog.create')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                                    >
                                        Create New Post
                                    </Link>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Search by title..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    />
                                </div>
                                <div>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="">All Status</option>
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                    </select>
                                </div>
                                <div>
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <Link
                                        href={route('admin.blog.index', {
                                            search: searchTerm,
                                            status: statusFilter,
                                            category: categoryFilter
                                        })}
                                        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg text-center block"
                                    >
                                        Filter
                                    </Link>
                                </div>
                            </div>

                            {/* Blog Posts Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Post
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Author
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Created
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {blogPosts.data.map((post) => (
                                            <tr key={post.id}>
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
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {post.title}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {post.excerpt.substring(0, 50)}...
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-900">
                                                        {post.category?.name}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(post.status)}`}>
                                                        {post.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {post.author}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={route('admin.blog.edit', post.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post)}
                                                        disabled={processing}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {blogPosts.last_page > 1 && (
                                <div className="mt-6">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-700">
                                            Showing {blogPosts.from} to {blogPosts.to} of {blogPosts.total} results
                                        </div>
                                        <div className="flex space-x-1">
                                            {blogPosts.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-2 text-sm border rounded ${
                                                        link.active
                                                            ? 'bg-blue-600 text-white border-blue-600'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}