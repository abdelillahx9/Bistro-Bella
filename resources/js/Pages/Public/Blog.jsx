import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Blog({ blogPosts, categories, tags }) {
    return (
        <PublicLayout>
            <Head title="Blog - Bistro Bella" />

            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Blog</h1>
                        <p className="text-lg text-gray-600">Stories, recipes, and news from Bistro Bella</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {/* Featured Posts */}
                            {blogPosts.filter(post => post.featured).length > 0 && (
                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Posts</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {blogPosts.filter(post => post.featured).map((post) => (
                                            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-48 object-cover"
                                                    onError={(e) => {
                                                        e.target.src = '/images/placeholder-blog.jpg';
                                                    }}
                                                />
                                                <div className="p-6">
                                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                                            {post.category}
                                                        </span>
                                                        <span className="mx-2">•</span>
                                                        <span>{post.read_time} min read</span>
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                                                            {post.title}
                                                        </Link>
                                                    </h3>
                                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-500">By {post.author}</span>
                                                        <span className="text-sm text-gray-500">{new Date(post.published_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* All Posts */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Posts</h2>
                                <div className="space-y-6">
                                    {blogPosts.map((post) => (
                                        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                            <div className="md:flex">
                                                <div className="md:w-1/3">
                                                    <img
                                                        src={post.image}
                                                        alt={post.title}
                                                        className="w-full h-48 md:h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = '/images/placeholder-blog.jpg';
                                                        }}
                                                    />
                                                </div>
                                                <div className="md:w-2/3 p-6">
                                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                                            {post.category}
                                                        </span>
                                                        <span className="mx-2">•</span>
                                                        <span>{post.read_time} min read</span>
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                                                            {post.title}
                                                        </Link>
                                                    </h3>
                                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-gray-500">By {post.author}</span>
                                                        <span className="text-sm text-gray-500">{new Date(post.published_at).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="mt-4 flex flex-wrap gap-2">
                                                        {post.tags.map((tag, index) => (
                                                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            {/* Categories */}
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.slug}
                                            href={`/blog?category=${category.slug}`}
                                            className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            <span>{category.name}</span>
                                            <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                                                {category.count}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <Link
                                            key={tag.slug}
                                            href={`/blog?tag=${tag.slug}`}
                                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                        >
                                            #{tag.name} ({tag.count})
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md p-6 text-white">
                                <h3 className="text-lg font-semibold mb-2">Ready to Experience Bistro Bella?</h3>
                                <p className="text-blue-100 mb-4 text-sm">
                                    Inspired by our blog? Come taste our culinary creations in person.
                                </p>
                                <Link
                                    href="/reservations"
                                    className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                                >
                                    Make a Reservation
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
