import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';

export default function Events() {
    return (
        <UserLayout>
            <Head title="Events - Bistro Bella" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
                            <p className="text-gray-600 mb-8">
                                Join us for special events and celebrations. Reserve your spot for these exclusive experiences.
                            </p>

                            <div className="space-y-6">
                                {/* Event 1 */}
                                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-3">
                                                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    Wine Tasting
                                                </div>
                                                <span className="text-gray-500 text-sm">December 15, 2024</span>
                                                <span className="text-gray-500 text-sm">7:00 PM</span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Italian Wine Evening</h3>
                                            <p className="text-gray-600 mb-4">
                                                Join us for an exclusive wine tasting featuring the finest Italian wines paired with our chef's special dishes.
                                                Learn about wine regions and enjoy live music.
                                            </p>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-lg font-semibold text-orange-600">$75 per person</span>
                                                <span className="text-sm text-gray-500">Limited to 20 guests</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 md:mt-0 md:ml-6">
                                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                                Reserve Spot
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Event 2 */}
                                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-3">
                                                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    Cooking Class
                                                </div>
                                                <span className="text-gray-500 text-sm">December 20, 2024</span>
                                                <span className="text-gray-500 text-sm">6:00 PM</span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Pasta Making Workshop</h3>
                                            <p className="text-gray-600 mb-4">
                                                Learn the art of handmade pasta from our executive chef. Discover traditional techniques and create your own
                                                signature pasta dish to take home.
                                            </p>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-lg font-semibold text-orange-600">$95 per person</span>
                                                <span className="text-sm text-gray-500">Includes take-home ingredients</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 md:mt-0 md:ml-6">
                                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                                Join Class
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Event 3 */}
                                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-3">
                                                <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    Holiday Special
                                                </div>
                                                <span className="text-gray-500 text-sm">December 24, 2024</span>
                                                <span className="text-gray-500 text-sm">8:00 PM</span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Christmas Eve Dinner</h3>
                                            <p className="text-gray-600 mb-4">
                                                Celebrate the holiday season with a special multi-course dinner featuring seasonal ingredients and festive decorations.
                                                Perfect for couples and small groups.
                                            </p>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-lg font-semibold text-orange-600">$125 per person</span>
                                                <span className="text-sm text-gray-500">Prix fixe menu</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 md:mt-0 md:ml-6">
                                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                                Book Table
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Event 4 */}
                                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-3">
                                                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    Live Music
                                                </div>
                                                <span className="text-gray-500 text-sm">Every Friday</span>
                                                <span className="text-gray-500 text-sm">8:00 PM</span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Friday Night Jazz</h3>
                                            <p className="text-gray-600 mb-4">
                                                Enjoy live jazz music every Friday evening. No cover charge, just great music and excellent food.
                                                Perfect for date night or casual gatherings.
                                            </p>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-lg font-semibold text-orange-600">No cover charge</span>
                                                <span className="text-sm text-gray-500">Regular menu available</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 md:mt-0 md:ml-6">
                                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                                Make Reservation
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}