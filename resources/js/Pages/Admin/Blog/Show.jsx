import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ blogPost }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Fallback if blogPost is somehow missing, though Inertia should handle this.
    // We render a basic state instead of blocking with "Loading..."
    const post = blogPost || {};

    return (
        <AdminLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Blog Post Details</h2>}
        >
            <Head title={`${post.title || 'Blog Post'} - Admin Blog`} />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-4xl">
                    {/* Breadcrumb */}
                    <nav className="mb-6 text-sm text-gray-500">
                        <Link href={route('admin.blog.index')} className="hover:text-gray-700">Blog Posts</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">#{post.id || 'New'}</span>
                    </nav>

                    {/* Post Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                        <div className="px-6 py-8">
                            <div className="flex items-start space-x-6">
                                {/* Featured Image */}
                                <div className="flex-shrink-0">
                                    {post.featured_image ? (
                                        <img
                                            src={`/storage/${post.featured_image}`}
                                            alt={post.title || 'Blog Image'}
                                            className="h-24 w-24 rounded-lg object-cover border-4 border-gray-100 shadow-lg"
                                        />
                                    ) : (
                                        <div className="h-24 w-24 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                            <span className="text-2xl font-bold text-white">
                                                {(post.title || 'B').charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Post Info */}
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{post.title || 'Untitled Post'}</h1>
                                    <p className="text-gray-600 mb-2 line-clamp-2">{post.excerpt || 'No excerpt available'}</p>
                                    <div className="flex items-center space-x-4">
                                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                                            post.status === 'published'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {post.status || 'Draft'}
                                        </span>
                                        {post.category && (
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {post.category.name}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-3">
                                    {post.id && (
                                        <Link
                                            href={`/admin/blog/${post.id}/edit`}
                                            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                                        >
                                            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit Post
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Post Content Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Post Content</h3>
                        </div>

                        <div className="px-6 py-6">
                            <div className="prose prose-lg max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: post.content || '<p className="text-gray-500 italic">No content available</p>' }} />
                            </div>
                        </div>
                    </div>

                    {/* Post Details Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Post Details</h3>
                        </div>

                        <div className="px-6 py-6">
                            <dl className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Post ID</dt>
                                    <dd className="text-sm text-gray-900 font-mono">#{post.id || '-'}</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Title</dt>
                                    <dd className="text-sm text-gray-900">{post.title || '-'}</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Slug</dt>
                                    <dd className="text-sm text-gray-900 font-mono">{post.slug || '-'}</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Author</dt>
                                    <dd className="text-sm text-gray-900">{post.author || '-'}</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Category</dt>
                                    <dd className="text-sm text-gray-900">
                                        {post.category ? post.category.name : 'No Category'}
                                    </dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Status</dt>
                                    <dd className="text-sm text-gray-900">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            post.status === 'published'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {post.status || 'Draft'}
                                        </span>
                                    </dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Published Date</dt>
                                    <dd className="text-sm text-gray-900">
                                        {post.published_at ? formatDate(post.published_at) : 'Not published'}
                                    </dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Created</dt>
                                    <dd className="text-sm text-gray-900">{formatDate(post.created_at)}</dd>
                                </div>

                                {post.seo_title && (
                                    <div className="bg-gray-50 px-4 py-3 rounded-lg sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500 mb-1">SEO Title</dt>
                                        <dd className="text-sm text-gray-900">{post.seo_title}</dd>
                                    </div>
                                )}

                                {post.seo_description && (
                                    <div className="bg-gray-50 px-4 py-3 rounded-lg sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500 mb-1">SEO Description</dt>
                                        <dd className="text-sm text-gray-900">{post.seo_description}</dd>
                                    </div>
                                )}

                                <div className="bg-gray-50 px-4 py-3 rounded-lg sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Last Updated</dt>
                                    <dd className="text-sm text-gray-900">{formatDate(post.updated_at)}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Tags Section */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Tags</h3>
                            </div>

                            <div className="px-6 py-6">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                        >
                                            #{tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Back Button */}
                    <div className="mt-6">
                        <Link
                            href={route('admin.blog.index')}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Blog Posts
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}