import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ tags }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (tag) => {
        if (confirm(`Are you sure you want to delete "${tag.name}"?`)) {
            destroy(route('admin.blog-tags.destroy', tag.id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Blog Tags Management - Admin" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Blog Tags Management</h1>
                                <div className="flex space-x-3">
                                    <Link
                                        href={route('admin.blog.index')}
                                        className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg"
                                    >
                                        Back to Blog Posts
                                    </Link>
                                    <Link
                                        href={route('admin.blog-tags.create')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
                                    >
                                        Create New Tag
                                    </Link>
                                </div>
                            </div>

                            {/* Tags Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Slug
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Usage Count
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
                                        {tags.data.map((tag) => (
                                            <tr key={tag.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {tag.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-500">
                                                        {tag.slug}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-sm text-gray-900">
                                                        {tag.blog_posts_count || 0} posts
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(tag.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link
                                                        href={route('admin.blog-tags.edit', tag.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(tag)}
                                                        disabled={processing || (tag.blog_posts_count > 0)}
                                                        className={`${
                                                            tag.blog_posts_count > 0
                                                                ? 'text-gray-400 cursor-not-allowed'
                                                                : 'text-red-600 hover:text-red-900'
                                                        }`}
                                                        title={tag.blog_posts_count > 0 ? 'Cannot delete tag in use' : ''}
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
                            {tags.last_page > 1 && (
                                <div className="mt-6">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm text-gray-700">
                                            Showing {tags.from} to {tags.to} of {tags.total} results
                                        </div>
                                        <div className="flex space-x-1">
                                            {tags.links.map((link, index) => (
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