import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function Index({ tags }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (tag) => {
        if (confirm(`Are you sure you want to delete "${tag.name}"?`)) {
            destroy(route('admin.blog-tags.destroy', tag.id));
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-bold leading-tight text-gray-800">Blog Tags Management</h2>}>
            <Head title="Blog Tags Management - Admin" />

            <div className="min-h-screen bg-gray-50 p-6">
                {/* Action Buttons Section */}
                <div className="mb-6 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div></div> {/* Empty left side for balance */}
                        <div className="flex items-center space-x-3">
                            <Link
                                href={route('admin.blog.index')}
                                className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                            >
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Blog Posts
                            </Link>
                            <Link
                                href={route('admin.blog-tags.create')}
                                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                            >
                                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8M8 12h8" />
                                </svg>
                                Create Tag
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
                                    <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Slug</th>
                                    <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Usage Count</th>
                                    <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Created</th>
                                    <th className="px-6 py-3 text-center font-medium font-sans text-[14px] text-black uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 text-[14px] font-normal font-sans text-gray-900">
                                {tags.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                            No tags found. <Link href={route('admin.blog-tags.create')} className="text-blue-600 hover:underline">Create your first tag</Link>
                                        </td>
                                    </tr>
                                ) : (
                                    tags.data.map((tag) => (
                                        <tr key={tag.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-900">
                                                {tag.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">
                                                {tag.slug}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                    (tag.blog_posts_count || 0) > 0
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {(tag.blog_posts_count || 0)} posts
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">
                                                {new Date(tag.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-[14px] font-normal font-sans">
                                                <div className="flex items-center justify-center space-x-2">
                                                    <Link
                                                        href={route('admin.blog-tags.edit', tag.id)}
                                                        className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-50 transition-colors duration-200"
                                                        title="Edit"
                                                    >
                                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(tag)}
                                                        disabled={processing || (tag.blog_posts_count > 0)}
                                                        className={`p-2 rounded-full transition-colors duration-200 ${
                                                            tag.blog_posts_count > 0
                                                                ? 'text-gray-400 cursor-not-allowed'
                                                                : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
                                                        }`}
                                                        title={tag.blog_posts_count > 0 ? 'Cannot delete tag in use' : 'Delete'}
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
                {tags.data.length > 0 && (
                    <Pagination
                        links={tags.links}
                        current_page={tags.current_page}
                        last_page={tags.last_page}
                    />
                )}
            </div>
        </AdminLayout>
    );
}