import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ upcomingReservation, reservationHistory, reservationStats }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    const modifyForm = useForm({
        reservation_date: '',
        reservation_time: '',
        guest_count: 1,
        special_requests: '',
    });

    const handleModifyReservation = () => {
        modifyForm.patch(route('user.reservations.update', selectedReservation.id), {
            preserveScroll: true,
            onSuccess: () => {
                setShowModifyModal(false);
                setSelectedReservation(null);
            }
        });
    };

    const handleCancelReservation = () => {
        if (confirm('Are you sure you want to cancel this reservation?')) {
            modifyForm.patch(route('user.reservations.cancel', selectedReservation.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setShowCancelModal(false);
                    setSelectedReservation(null);
                }
            });
        }
    };

    const openModifyModal = (reservation) => {
        setSelectedReservation(reservation);
        modifyForm.setData({
            reservation_date: reservation.reservation_date,
            reservation_time: reservation.reservation_time,
            guest_count: reservation.guest_count,
            special_requests: reservation.special_requests || '',
        });
        setShowModifyModal(true);
    };

    const openCancelModal = (reservation) => {
        setSelectedReservation(reservation);
        setShowCancelModal(true);
    };

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
                                <Link
                                    href="/reservations"
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Make New Reservation
                                </Link>
                                <Link
                                    href="/menu"
                                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    View Menu
                                </Link>
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
                                                <p className="font-medium text-gray-900">{upcomingReservation.guest_count}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Status</p>
                                                <p className="font-medium text-gray-900 capitalize">{upcomingReservation.status}</p>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <p className="text-gray-500 text-sm">Reservation Time</p>
                                            <p className="font-medium text-gray-900">
                                                {new Date(upcomingReservation.reservation_date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })} at {upcomingReservation.reservation_time}
                                            </p>
                                        </div>

                                        <div className="flex space-x-3 pt-4">
                                            <button
                                                onClick={() => openModifyModal(upcomingReservation)}
                                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Modify
                                            </button>
                                            <button
                                                onClick={() => openCancelModal(upcomingReservation)}
                                                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
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
                                        <Link
                                            href="/reservations"
                                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                        >
                                            Book a Table
                                        </Link>
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
                                                {reservationStats.lastVisited
                                                    ? new Date(reservationStats.lastVisited).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })
                                                    : 'No visits yet'
                                                }
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-sm text-gray-600">Favorite Dish</span>
                                            <span className="text-sm font-medium text-gray-900">
                                                {reservationStats.favoriteDish || 'Not available'}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Avg Group Size</span>
                                            <span className="text-sm font-medium text-gray-900">
                                                {reservationStats.averageGroupSize > 0 ? reservationStats.averageGroupSize.toFixed(1) : 'N/A'}
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

                    {/* Reservation History Section */}
                    <div className="mt-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Reservation History</h2>

                            {reservationHistory && reservationHistory.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Date & Time
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Guests
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {reservationHistory.map((reservation) => (
                                                <tr key={reservation.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {new Date(reservation.reservation_date).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {reservation.reservation_time}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {reservation.guest_count} {reservation.guest_count === 1 ? 'Guest' : 'Guests'}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            reservation.status === 'confirmed'
                                                                ? 'bg-green-100 text-green-800'
                                                                : reservation.status === 'pending'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : reservation.status === 'cancelled'
                                                                ? 'bg-red-100 text-red-800'
                                                                : reservation.status === 'seated'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        {reservation.status === 'confirmed' && new Date(reservation.reservation_date) >= new Date() ? (
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={() => openModifyModal(reservation)}
                                                                    className="text-blue-600 hover:text-blue-900"
                                                                >
                                                                    Modify
                                                                </button>
                                                                <button
                                                                    onClick={() => openCancelModal(reservation)}
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-400">-</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No reservation history</h3>
                                    <p className="text-gray-600">Your reservation history will appear here</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* Modify Reservation Modal */}
            {showModifyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-gray-900">Modify Reservation</h3>
                                <button
                                    onClick={() => setShowModifyModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); handleModifyReservation(); }} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Reservation Date
                                    </label>
                                    <input
                                        type="date"
                                        value={modifyForm.data.reservation_date}
                                        onChange={(e) => modifyForm.setData('reservation_date', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        min={new Date().toISOString().split('T')[0]}
                                        required
                                    />
                                    {modifyForm.errors.reservation_date && (
                                        <p className="mt-1 text-sm text-red-600">{modifyForm.errors.reservation_date}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Reservation Time
                                    </label>
                                    <input
                                        type="time"
                                        value={modifyForm.data.reservation_time}
                                        onChange={(e) => modifyForm.setData('reservation_time', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        required
                                    />
                                    {modifyForm.errors.reservation_time && (
                                        <p className="mt-1 text-sm text-red-600">{modifyForm.errors.reservation_time}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Guests
                                    </label>
                                    <select
                                        value={modifyForm.data.guest_count}
                                        onChange={(e) => modifyForm.setData('guest_count', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        required
                                    >
                                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                            <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                        ))}
                                    </select>
                                    {modifyForm.errors.guest_count && (
                                        <p className="mt-1 text-sm text-red-600">{modifyForm.errors.guest_count}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Special Requests
                                    </label>
                                    <textarea
                                        value={modifyForm.data.special_requests || ''}
                                        onChange={(e) => modifyForm.setData('special_requests', e.target.value)}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Any special requests or dietary requirements..."
                                    />
                                    {modifyForm.errors.special_requests && (
                                        <p className="mt-1 text-sm text-red-600">{modifyForm.errors.special_requests}</p>
                                    )}
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModifyModal(false)}
                                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={modifyForm.processing}
                                        className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        {modifyForm.processing ? 'Updating...' : 'Update Reservation'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Reservation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center mb-4">
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-medium text-gray-900">Cancel Reservation</h3>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-sm text-gray-600">
                                    Are you sure you want to cancel your reservation for{' '}
                                    <span className="font-medium">
                                        {new Date(selectedReservation.reservation_date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric'
                                        })} at {selectedReservation.reservation_time}
                                    </span>
                                    ? This action cannot be undone.
                                </p>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowCancelModal(false)}
                                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Keep Reservation
                                </button>
                                <button
                                    onClick={handleCancelReservation}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Cancel Reservation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
