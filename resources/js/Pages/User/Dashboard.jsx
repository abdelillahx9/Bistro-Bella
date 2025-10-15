import UserLayout from '@/Layouts/UserLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth.user;

    // Mock data - in real app this would come from props
    const upcomingReservation = {
        date: '2024-12-20',
        time: '7:00 PM',
        guests: 4,
        tableNumber: '12',
        specialRequests: 'Window seat preferred'
    };

    const recentReservations = [
        { date: '2024-12-15', total: '$89.50', items: 'Pasta Primavera, Grilled Salmon' },
        { date: '2024-12-08', total: '$67.25', items: 'Caesar Salad, Beef Tenderloin' },
        { date: '2024-12-01', total: '$45.75', items: 'Chicken Parmesan' }
    ];

    const favoriteDishes = [
        { name: 'Pasta Primavera', price: '$12.99', image: '/assets/dish1.png' },
        { name: 'Grilled Salmon', price: '$18.99', image: '/assets/dish2.png' },
        { name: 'Beef Tenderloin', price: '$28.99', image: '/assets/dish3.png' },
        { name: 'Chicken Parmesan', price: '$22.99', image: '/assets/dish4.png' }
    ];

    const notifications = [
        { id: 1, type: 'reservation', message: 'Your reservation for Dec 20 has been confirmed!', time: '2 hours ago', read: false },
        { id: 2, type: 'promotion', message: '🎄 Holiday Special: Free dessert with any main course!', time: '1 day ago', read: false },
        { id: 3, type: 'loyalty', message: 'You earned 50 loyalty points from your last visit!', time: '3 days ago', read: true }
    ];

    return (
        <UserLayout>
            <Head title="Dashboard - Bistro Bella" />

            <div className="py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">

                    {/* 1. Header Section */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg overflow-hidden">
                        <div className="px-6 py-8 text-white">
                            <h1 className="text-3xl font-bold mb-2">
                                Welcome back, {user.name} 👋
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                <div className="bg-white/10 rounded-lg p-4">
                                    <h3 className="font-semibold mb-1">Next Reservation</h3>
                                    <p className="text-sm opacity-90">Dec 20, 7:00 PM</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <h3 className="font-semibold mb-1">Loyalty Points</h3>
                                    <p className="text-sm opacity-90">850 pts (Gold Tier)</p>
                                </div>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <h3 className="font-semibold mb-1">Today's Tip</h3>
                                    <p className="text-sm opacity-90">Try our new seasonal menu! 🍂</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Quick Action Buttons */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                            <div className="text-center">
                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm font-medium">Book a Table</span>
                            </div>
                        </button>

                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                            <div className="text-center">
                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span className="text-sm font-medium">My Reservations</span>
                            </div>
                        </button>

                        <button className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                            <div className="text-center">
                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <span className="text-sm font-medium">Order Online</span>
                            </div>
                        </button>

                        <button className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                            <div className="text-center">
                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-sm font-medium">Edit Profile</span>
                            </div>
                        </button>

                        <button className="bg-red-500 hover:bg-red-600 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                            <div className="text-center">
                                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="text-sm font-medium">View Menu</span>
                            </div>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* 3. Upcoming Reservations */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Reservation</h2>
                            {upcomingReservation ? (
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                {new Date(upcomingReservation.date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </h3>
                                            <p className="text-sm text-gray-600">{upcomingReservation.time}</p>
                                        </div>
                                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                                            Confirmed
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                        <div>
                                            <span className="text-gray-500">Guests:</span>
                                            <span className="ml-2 font-medium">{upcomingReservation.guests}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Table:</span>
                                            <span className="ml-2 font-medium">{upcomingReservation.tableNumber}</span>
                                        </div>
                                    </div>
                                    {upcomingReservation.specialRequests && (
                                        <p className="text-sm text-gray-600 mb-4">
                                            <span className="font-medium">Note:</span> {upcomingReservation.specialRequests}
                                        </p>
                                    )}
                                    <div className="flex space-x-2">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                            Modify
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">No upcoming reservations</h3>
                                    <p className="text-gray-600 mb-4">Book your next dining experience with us!</p>
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                        Book a Table Now
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* 4. Past Reservations */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
                                <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                                    View All →
                                </button>
                            </div>
                            <div className="space-y-3">
                                {recentReservations.map((reservation, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {new Date(reservation.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                            <p className="text-sm text-gray-600">{reservation.items}</p>
                                        </div>
                                        <span className="font-semibold text-gray-800">{reservation.total}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 5. Favorites */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">My Favorites</h2>
                                <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                                    View All →
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {favoriteDishes.slice(0, 4).map((dish, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <span className="text-xs font-medium text-gray-600">🍽️</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-gray-800 truncate">{dish.name}</h4>
                                                <p className="text-sm text-orange-600 font-semibold">{dish.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 6. Notifications */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h2>
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {notifications.map((notification) => (
                                    <div key={notification.id} className={`p-3 rounded-lg border ${notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-800">{notification.message}</p>
                                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                            </div>
                                            {!notification.read && (
                                                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 text-orange-600 hover:text-orange-700 text-sm font-medium">
                                View All Notifications →
                            </button>
                        </div>

                    </div>

                    {/* 7. Loyalty & Rewards */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Loyalty & Rewards</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-2">850</div>
                                <p className="text-gray-600">Current Points</p>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-semibold text-gray-800 mb-2">Gold Tier</div>
                                <p className="text-gray-600">Membership Level</p>
                            </div>
                            <div className="text-center">
                                <div className="text-xl font-semibold text-gray-800 mb-2">150 pts</div>
                                <p className="text-gray-600">Until Free Dessert</p>
                            </div>
                        </div>
                        <div className="mt-4 bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 text-center">850 / 1000 points to Platinum Tier</p>
                        <div className="text-center mt-4">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                                View Rewards
                            </button>
                        </div>
                    </div>

                    {/* 8. Profile Overview & 9. Settings */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Profile Overview */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Overview</h2>
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold text-orange-600">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                                    <p className="text-gray-600">{user.email}</p>
                                    <p className="text-gray-600">(555) 123-4567</p>
                                </div>
                            </div>
                            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors">
                                Edit Profile
                            </button>
                        </div>

                        {/* Settings */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings & Preferences</h2>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-gray-800 mb-2">Notifications</h3>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                            <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                            <span className="ml-2 text-sm text-gray-700">SMS notifications</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                                            <span className="ml-2 text-sm text-gray-700">Marketing emails</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <h3 className="font-medium text-gray-800 mb-2">Account</h3>
                                    <div className="space-y-2">
                                        <button className="w-full text-left text-sm text-gray-600 hover:text-gray-800 py-1">
                                            Export my data
                                        </button>
                                        <button className="w-full text-left text-sm text-red-600 hover:text-red-800 py-1">
                                            Delete account
                                        </button>
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