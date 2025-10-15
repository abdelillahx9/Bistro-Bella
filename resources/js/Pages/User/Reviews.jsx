import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';

export default function Reviews() {
    return (
        <UserLayout>
            <Head title="Reviews - Bistro Bella" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold">Restaurant Reviews</h1>
                                    <p className="text-gray-600 mt-1">Share your experience and read what others have to say</p>
                                </div>
                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    Write a Review
                                </button>
                            </div>

                            {/* Overall Rating */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">Overall Rating</h2>
                                        <div className="flex items-center mt-2">
                                            <div className="flex text-yellow-400">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg key={star} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="ml-2 text-lg font-semibold text-gray-800">4.8</span>
                                            <span className="ml-1 text-gray-600">(127 reviews)</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-600">Based on recent reviews</div>
                                    </div>
                                </div>
                            </div>

                            {/* Review Form */}
                            <div className="border border-gray-200 rounded-lg p-6 mb-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Write Your Review</h3>
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                        <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                                                >
                                                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                    </svg>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 mb-2">
                                            Review Title
                                        </label>
                                        <input
                                            type="text"
                                            id="review-title"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Summarize your experience"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="review-content" className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Review
                                        </label>
                                        <textarea
                                            id="review-content"
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Tell others about your dining experience..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Submit Review
                                    </button>
                                </form>
                            </div>

                            {/* Reviews List */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-800">Recent Reviews</h3>

                                {/* Review 1 */}
                                <div className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                                <span className="text-orange-600 font-semibold">JD</span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800">John Doe</h4>
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex text-yellow-400">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-gray-500">2 days ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="font-medium text-gray-800 mb-2">Amazing Italian Experience!</h5>
                                    <p className="text-gray-600">
                                        The pasta primavera was absolutely delicious. The service was excellent and the atmosphere was perfect for our anniversary dinner.
                                        Highly recommend the wine pairing!
                                    </p>
                                </div>

                                {/* Review 2 */}
                                <div className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <span className="text-green-600 font-semibold">SM</span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800">Sarah Miller</h4>
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex text-yellow-400">
                                                        {[1, 2, 3, 4].map((star) => (
                                                            <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                            </svg>
                                                        ))}
                                                        <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 24 24">
                                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                        </svg>
                                                    </div>
                                                    <span className="text-sm text-gray-500">1 week ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="font-medium text-gray-800 mb-2">Great food, slow service</h5>
                                    <p className="text-gray-600">
                                        The food was excellent, especially the grilled salmon. However, the service was a bit slow during our visit.
                                        The staff was friendly though, and the ambiance was lovely.
                                    </p>
                                </div>

                                {/* Review 3 */}
                                <div className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold">MR</span>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800">Mike Rodriguez</h4>
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex text-yellow-400">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span className="text-sm text-gray-500">2 weeks ago</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 className="font-medium text-gray-800 mb-2">Perfect for special occasions</h5>
                                    <p className="text-gray-600">
                                        We celebrated our wedding anniversary here and it was perfect! The staff went above and beyond to make our evening special.
                                        The chocolate lava cake was to die for!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}