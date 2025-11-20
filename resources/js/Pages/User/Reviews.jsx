import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Reviews({ reviews, stats, auth }) {
    const { flash } = usePage().props;
    const [selectedRating, setSelectedRating] = useState(0);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const reviewForm = useForm({
        rating: 0,
        comment: '',
    });

    const deleteForm = useForm({});

    const handleRatingClick = (rating) => {
        setSelectedRating(rating);
        reviewForm.setData('rating', rating);
    };

    const submitReview = (e) => {
        e.preventDefault();
        reviewForm.post(route('user.reviews.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reviewForm.reset();
                setSelectedRating(0);
                setShowReviewForm(false);
            }
        });
    };

    const deleteReview = (reviewId) => {
        deleteForm.delete(route('user.reviews.destroy', reviewId), {
            preserveScroll: true,
            onSuccess: () => {
                setShowDeleteConfirm(null);
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

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Restaurant Reviews
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                            Discover what our guests are saying about their dining experience at Bistro Bella
                        </p>

                        {/* Overall Rating Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto mb-8">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-gray-900 mb-2">
                                    {stats.averageRating.toFixed(1)}
                                </div>
                                <div className="flex justify-center mb-3">
                                    {renderStars(Math.round(stats.averageRating))}
                                </div>
                                <p className="text-gray-600">
                                    Based on {stats.totalReviews} reviews
                                </p>
                            </div>
                        </div>

                        {(() => {
                            const hasReview = auth.user && reviews.data.some(review => review.user.id === auth.user.id);
                            return (
                                <button
                                    onClick={() => setShowReviewForm(true)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    {hasReview ? 'Update Your Review' : 'Write a Review'}
                                </button>
                            );
                        })()}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-green-800 font-medium">{flash.success}</p>
                        </div>
                    </div>
                )}

                {flash?.error && (
                    <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-red-800 font-medium">{flash.error}</p>
                        </div>
                    </div>
                )}

                {/* Review Form Modal */}
                {showReviewForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Share Your Experience</h2>
                                    <button
                                        onClick={() => setShowReviewForm(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <form onSubmit={submitReview} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                                            How would you rate your experience?
                                        </label>
                                        <div className="flex space-x-2">
                                            {renderStars(selectedRating, true, handleRatingClick)}
                                        </div>
                                        {reviewForm.errors.rating && (
                                            <p className="mt-2 text-sm text-red-600">{reviewForm.errors.rating}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-3">
                                            Tell us about your visit
                                        </label>
                                        <textarea
                                            id="comment"
                                            value={reviewForm.data.comment}
                                            onChange={(e) => reviewForm.setData('comment', e.target.value)}
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                                            placeholder="What did you enjoy most? What could we improve? Share your thoughts..."
                                        ></textarea>
                                        {reviewForm.errors.comment && (
                                            <p className="mt-2 text-sm text-red-600">{reviewForm.errors.comment}</p>
                                        )}
                                    </div>

                                    <div className="flex space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowReviewForm(false)}
                                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={reviewForm.processing}
                                            className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                                        >
                                            {reviewForm.processing ? 'Submitting...' : 'Submit Review'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
                            <div className="p-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Delete Review</h2>
                                    <p className="text-gray-600 mb-8">
                                        Are you sure you want to delete this review? This action cannot be undone.
                                    </p>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => setShowDeleteConfirm(null)}
                                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => deleteReview(showDeleteConfirm)}
                                            disabled={deleteForm.processing}
                                            className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                                        >
                                            {deleteForm.processing ? 'Deleting...' : 'Delete Review'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Reviews Grid */}
                <div className="mb-12">
                    {/* User's Review Section */}
                    {auth.user && (() => {
                        const userReview = reviews.data.find(review => review.user.id === auth.user.id);
                        if (userReview) {
                            return (
                                <div className="mb-12">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Review</h2>
                                    <div className="max-w-2xl">
                                        <div className={`bg-white rounded-2xl shadow-lg overflow-hidden ${userReview.is_featured ? 'ring-2 ring-yellow-400' : ''}`}>
                                            {userReview.is_featured && (
                                                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 text-sm font-semibold text-center">
                                                    ⭐ Featured Review
                                                </div>
                                            )}

                                            <div className="p-6">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                                            <span className="text-white font-bold text-lg">
                                                                {userReview.user.name.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900">{userReview.user.name}</h4>
                                                            <p className="text-sm text-gray-500">{formatDate(userReview.created_at)}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => setShowDeleteConfirm(userReview.id)}
                                                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                                                        title="Delete review"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                <div className="flex items-center mb-4">
                                                    {renderStars(userReview.rating)}
                                                    <span className="ml-2 text-sm text-gray-600">
                                                        {userReview.rating}/5
                                                    </span>
                                                </div>

                                                {userReview.comment && (
                                                    <p className="text-gray-700 leading-relaxed">
                                                        "{userReview.comment}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })()}

                    {/* Recent Reviews Section */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Reviews</h2>

                        {reviews.data.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {reviews.data
                                    .filter(review => !auth.user || review.user.id !== auth.user.id)
                                    .map((review) => (
                                        <div
                                            key={review.id}
                                            className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
                                                review.is_featured ? 'ring-2 ring-yellow-400' : ''
                                            }`}
                                        >
                                            {review.is_featured && (
                                                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-4 py-2 text-sm font-semibold text-center">
                                                    ⭐ Featured Review
                                                </div>
                                            )}

                                            <div className="p-6">
                                                <div className="flex items-center space-x-3 mb-4">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-bold text-lg">
                                                            {review.user.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                                                        <p className="text-sm text-gray-500">{formatDate(review.created_at)}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center mb-4">
                                                    {renderStars(review.rating)}
                                                    <span className="ml-2 text-sm text-gray-600">
                                                        {review.rating}/5
                                                    </span>
                                                </div>

                                                {review.comment && (
                                                    <p className="text-gray-700 leading-relaxed">
                                                        "{review.comment}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Reviews Yet</h3>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                    Be the first to share your dining experience and help others discover Bistro Bella!
                                </p>
                                <button
                                    onClick={() => setShowReviewForm(true)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
                                >
                                    Write the First Review
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination */}
                {reviews.last_page > 1 && (
                    <div className="flex justify-center">
                        <div className="flex space-x-2">
                            {reviews.links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.url}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                        link.active
                                            ? 'bg-orange-500 text-white shadow-lg'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}