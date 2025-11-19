import AuthenticatedLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ totalReservationsToday, totalActiveTables, totalReviewsToday, averageRatingToday, fiveStarReviewsToday, upcomingReservations = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-900 mb-2">Total Reviews Today</h3>
                                    <div className="text-3xl font-bold text-gray-900">{totalReviewsToday}</div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-900 mb-2">Average Rating Today</h3>
                                    <div className="text-3xl font-bold text-gray-900">{averageRatingToday}</div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-900 mb-2">5-Star Reviews Today</h3>
                                    <div className="text-3xl font-bold text-gray-900">{fiveStarReviewsToday}</div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-4">Today's Reservations</h2>
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="p-6">
                                        {upcomingReservations.length > 0 ? (
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {upcomingReservations.map((reservation) => (
                                                            <tr key={reservation.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.name}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.reservation_time}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.phone || reservation.email}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.guest_count}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${reservation.status_color}`}>
                                                                        {reservation.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">No reservations for today.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
