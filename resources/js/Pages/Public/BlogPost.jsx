import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function BlogPost({ post, relatedPosts }) {
    return (
        <PublicLayout>
            <Head title={`${post.title} - Bistro Bella Blog`} />

            <article className="py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <Link href="/blog" className="text-orange-600 hover:text-orange-800">
                            ← Back to Blog
                        </Link>
                    </nav>

                    {/* Post Header */}
                    <header className="mb-8">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                                {post.category}
                            </span>
                            <span className="mx-3">•</span>
                            <span>{post.read_time} min read</span>
                            <span className="mx-3">•</span>
                            <span>{new Date(post.published_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

                        <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>

                        <div className="flex items-center">
                            <div className="text-sm text-gray-500">
                                By <span className="font-medium text-gray-700">{post.author}</span>
                            </div>
                        </div>
                    </header>

                    {/* Featured Image */}
                    <div className="mb-8">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-96 object-cover rounded-lg shadow-lg"
                            onError={(e) => {
                                e.target.src = '/images/placeholder-blog.jpg';
                            }}
                        />
                    </div>

                    {/* Post Content */}
                    <div className="prose prose-lg max-w-none mb-12">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    {/* Tags */}
                    <div className="mb-12">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                                <Link
                                    key={index}
                                    href={`/blog?tag=${tag.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-orange-100 hover:text-orange-700 transition-colors"
                                >
                                    #{tag}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg shadow-md p-8 text-white text-center mb-12">
                        <h3 className="text-2xl font-semibold mb-2">Ready to Experience What You've Read About?</h3>
                        <p className="text-orange-100 mb-6">
                            Turn inspiration into reality. Visit Bistro Bella and taste the difference.
                        </p>
                        <Link
                            href="/reservations"
                            className="inline-block bg-white text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                        >
                            Make a Reservation
                        </Link>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Related Posts</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPosts.map((relatedPost) => (
                                    <div key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                        <img
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            className="w-full h-32 object-cover"
                                            onError={(e) => {
                                                e.target.src = '/images/placeholder-blog.jpg';
                                            }}
                                        />
                                        <div className="p-4">
                                            <div className="flex items-center text-xs text-gray-500 mb-2">
                                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                                                    {relatedPost.category}
                                                </span>
                                                <span className="mx-2">•</span>
                                                <span>{relatedPost.read_time} min</span>
                                            </div>
                                            <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                                <Link href={`/blog/${relatedPost.slug}`} className="hover:text-orange-600 transition-colors">
                                                    {relatedPost.title}
                                                </Link>
                                            </h4>
                                            <p className="text-gray-600 text-sm">{relatedPost.excerpt.substring(0, 100)}...</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </PublicLayout>
    );
}