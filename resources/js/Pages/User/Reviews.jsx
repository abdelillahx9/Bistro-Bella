import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Reviews({ reviews, stats, menus }) {
    const { flash } = usePage().props;
    const [selectedRating, setSelectedRating] = useState(0);

    const reviewForm = useForm({
        menu_id: '',
        rating: 0,
        comment: '',
    });

    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
        reviewForm.setData('rating', rating);
    };

    const submitReview = (e) => {
        e.preventDefault();
        reviewForm.post(route('reviews.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reviewForm.reset();
                setSelectedRating(0);
            }
        });
    };

    const renderStars = (rating, interactive = false, onClick = null) => {
        return [1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                disabled={!interactive}
                onClick={() => interactive && onClick && onClick(star)}
                className={`${
                    star <= rating
                        ? 'text-yellow-400 hover:text-yellow-500'
                        : 'text-gray-300 hover:text-yellow-400'
                } transition-colors ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
            >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            </button>
        ));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <PublicLayout>
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

                            {/* Flash Messages */}
                            {flash?.success && (
                                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-sm text-green-800 font-medium">{flash.success}</p>
                                    </div>
                                </div>
                            )}

                            {flash?.error && (
                                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        <p className="text-sm text-red-800 font-medium">{flash.error}</p>
                                    </div>
                                </div>
                            )}

                            {/* Overall Rating */}
                            <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">Overall Rating</h2>
                                        <div className="flex items-center mt-2">
                                            <div className="flex text-yellow-400 mr-2">
                                                {renderStars(Math.round(stats.averageRating))}
                                            </div>
                                            <span className="text-lg font-semibold text-gray-800">{stats.averageRating}</span>
                                            <span className="ml-1 text-gray-600">({stats.totalReviews} reviews)</span>
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
                                <form onSubmit={submitReview} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Menu Item</label>
                                        <select
                                            value={reviewForm.data.menu_id}
                                            onChange={(e) => reviewForm.setData('menu_id', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            required
                                        >
                                            <option value="">Choose a menu item...</option>
                                            {menus.map((menu) => (
                                                <option key={menu.id} value={menu.id}>
                                                    {menu.name}
                                                </option>
                                            ))}
                                        </select>
                                        {reviewForm.errors.menu_id && (
                                            <p className="mt-1 text-sm text-red-600">{reviewForm.errors.menu_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                        <div className="flex space-x-1">
                                            {renderStars(selectedRating, true, handleRatingClick)}
                                        </div>
                                        {reviewForm.errors.rating && (
                                            <p className="mt-1 text-sm text-red-600">{reviewForm.errors.rating}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Review
                                        </label>
                                        <textarea
                                            id="comment"
                                            value={reviewForm.data.comment}
                                            onChange={(e) => reviewForm.setData('comment', e.target.value)}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Tell others about your dining experience..."
                                        ></textarea>
                                        {reviewForm.errors.comment && (
                                            <p className="mt-1 text-sm text-red-600">{reviewForm.errors.comment}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={reviewForm.processing}
                                        className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        {reviewForm.processing ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </form>
                            </div>

                            {/* Reviews List */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-800">Recent Reviews</h3>

                                {reviews.data.length > 0 ? (
                                    reviews.data.map((review) => (
                                        <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                                        <span className="text-orange-600 font-semibold">
                                                            {review.user.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-800">{review.user.name}</h4>
                                                        <div className="flex items-center space-x-2">
                                                            <div className="flex text-yellow-400">
                                                                {renderStars(review.rating)}
                                                            </div>
                                                            <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {review.menu && (
                                                    <div className="text-sm text-gray-600">
                                                        Reviewed: <span className="font-medium">{review.menu.name}</span>
                                                    </div>
                                                )}
                                            </div>
                                            {review.comment && (
                                                <p className="text-gray-600">{review.comment}</p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                                        <p className="text-gray-600">Be the first to share your dining experience!</p>
                                    </div>
                                )}

                                {/* Pagination */}
                                {reviews.last_page > 1 && (
                                    <div className="flex justify-center mt-8">
                                        <div className="flex space-x-2">
                                            {reviews.links.map((link, index) => (
                                                <a
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-2 rounded-lg text-sm font-medium ${
                                                        link.active
                                                            ? 'bg-orange-500 text-white'
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}