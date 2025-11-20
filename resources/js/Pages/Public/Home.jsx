import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Home({ featuredDishes = [], featuredReviews = [] }) {
    return (
        <PublicLayout>
            <Head title="Home - Bistro Bella" />
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="w-full relative rounded-xl shadow-xl">
                        <img
                            src="/assets/home_page2.png"  // From public/
                            alt="Hero Banner"
                            className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end items-center text-center px-6 py-6 rounded-lg">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                                Where Taste Meets Soul
                            </h1>
                            <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-8 max-w-2xl leading-relaxed drop-shadow-lg">
                                Experience the finest dining in town with our exquisite menu and impeccable service.
                            </h4>
                            <Link
                                href="/reservations"
                                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                                Reserve a Table
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-start text-gray-800 mb-12">
                        About Us
                    </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Bistro Bella is a culinary haven where passion for food meets a warm, inviting atmosphere. Our chefs craft each dish with care, using fresh, locally sourced ingredients to create a symphony of flavors that will tantalize your taste buds. Whether you're celebrating a special occasion or simply seeking an unforgettable dining experience, Bistro Bella is the perfect destination.
                </p>

                </div>
            </section>

            {/* Featured Dishes Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-start text-gray-800 mb-12">
                        Featured Dishes
                    </h2>

                    {featuredDishes.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredDishes.map((dish) => (
                                <div key={dish.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <img
                                        src={dish.image_path || "/assets/dish1.png"}
                                        alt={dish.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{dish.name}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            {dish.description || "A delicious dish from our menu."}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-orange-600">${dish.price}</span>
                                            {dish.category && (
                                                <span className="text-sm text-gray-500">{dish.category.name}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No featured dishes available at the moment.</p>
                            <Link
                                href="/menu"
                                className="inline-block mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                            >
                                View Full Menu
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-start text-gray-800 mb-12">
                        Customer Reviews
                    </h2>

                    <div className="space-y-8 max-w-4xl mx-auto">
                        {featuredReviews && featuredReviews.length > 0 ? (
                            featuredReviews.map((review, index) => (
                                <div key={review.id} className="flex items-start space-x-4">
                                    <img
                                        src="/assets/profile.png"
                                        alt={review.user.name}
                                        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-lg font-semibold text-gray-800">{review.user.name}</h3>
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Featured
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-3">
                                            {new Date(review.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>

                                        {/* Stars */}
                                        <div className="flex mb-3">
                                            {[...Array(5)].map((_, starIndex) => (
                                                <svg
                                                    key={starIndex}
                                                    className={`w-5 h-5 ${starIndex < review.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>

                                        <p className="text-gray-600 leading-relaxed">
                                            "{review.comment}"
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No featured reviews yet. Be the first to leave a review!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>


        </PublicLayout>
    );
}
