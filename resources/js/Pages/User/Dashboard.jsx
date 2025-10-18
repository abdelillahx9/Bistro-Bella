import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard({ upcomingReservation, reservationStats }) {
    const { auth } = usePage().props;
    const user = auth.user;

    // Mock data for special offers - in real app this would come from props
    const specialOffers = [
        {
            id: 1,
            title: 'Holiday Special',
            description: 'Free dessert with any main course',
            validUntil: 'Dec 31, 2024',
            image: '/assets/special1.png'
        },
        {
            id: 2,
            title: 'Wine Tasting Event',
            description: 'Italian wines paired with our signature dishes',
            validUntil: 'Dec 20, 2024',
            image: '/assets/special2.png'
        },
        {
            id: 3,
            title: 'Weekend Brunch',
            description: 'Bottomless mimosas with brunch menu',
            validUntil: 'Dec 22, 2024',
            image: '/assets/special3.png'
        }
    ];

    return (
        <PublicLayout>
            <Head title="Dashboard - Bistro Bella" />

            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Header Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-6 md:mb-0">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    Welcome back, {user.name}
                                </h1>
                                <p className="text-gray-600">
                                    Ready to make another memorable dining experience?
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Make New Reservation
                                </button>
                                <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    View Menu
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Widget 1 - Upcoming Reservation */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Reservation</h2>

                                {upcomingReservation ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    {new Date(upcomingReservation.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                                <p className="text-gray-600">{upcomingReservation.time}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                upcomingReservation.status === 'confirmed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {upcomingReservation.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500">Guests</p>
                                                <p className="font-medium text-gray-900">{upcomingReservation.guests}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Table</p>
                                                <p className="font-medium text-gray-900">{upcomingReservation.table_number}</p>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <p className="text-gray-500 text-sm">Location</p>
                                            <p className="font-medium text-gray-900">{upcomingReservation.branch}</p>
                                        </div>

                                        <div className="flex space-x-3 pt-4">
                                            <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                                Modify
                                            </button>
                                            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming reservations</h3>
                                        <p className="text-gray-600 mb-6">Book your next dining experience</p>
                                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                            Book a Table
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Widget 2 - Reservation Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Reservation Summary</h2>

                                <div className="space-y-6">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-orange-500 mb-1">
                                            {reservationStats.totalReservations}
                                        </div>
                                        <p className="text-sm text-gray-600">Total Reservations</p>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm text-gray-600">Last Visit</span>
                                            <span className="text-sm font-medium text-gray-900">
                                                {new Date(reservationStats.lastVisited).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm text-gray-600">Favorite Dish</span>
                                            <span className="text-sm font-medium text-gray-900">
                                                {reservationStats.favoriteDish}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Avg Group Size</span>
                                            <span className="text-sm font-medium text-gray-900">
                                                {reservationStats.averageGroupSize}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Widget 3 - Special Offers */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Special Offers</h2>

                                <div className="space-y-4">
                                    {specialOffers.map((offer) => (
                                        <div key={offer.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">
                                                        {offer.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-600 mt-1">
                                                        {offer.description}
                                                    </p>
                                                    <p className="text-xs text-orange-600 mt-1">
                                                        Valid until {offer.validUntil}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
