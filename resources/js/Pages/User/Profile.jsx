import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Profile({ user }) {
    return (
        <PublicLayout>
            <Head title="My Profile - Bistro Bella" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-amber-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Hero Section with Profile Info */}
                    <div className="relative mb-12">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 rounded-3xl opacity-10"></div>
                        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-amber-200/20 rounded-full -translate-y-32 translate-x-32"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-300/15 to-amber-300/15 rounded-full translate-y-24 -translate-x-24"></div>

                            <div className="relative px-8 py-12 lg:px-12 lg:py-16">
                                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                                    {/* Profile Picture */}
                                    <div className="flex-shrink-0">
                                        <div className="relative">
                                            <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-white to-orange-50 rounded-full border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                                                {user.profile_picture ? (
                                                    <img
                                                        src={`/storage/${user.profile_picture}`}
                                                        alt={user.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                                        <span className="text-4xl lg:text-5xl font-bold text-white">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Info */}
                                    <div className="flex-1 text-center lg:text-left">
                                        <div className="mb-4">
                                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{user.name}</h1>
                                            <p className="text-xl text-gray-600 mb-4">{user.email}</p>
                                            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                                                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    Verified Member
                                                </span>
                                                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M9 11h6" />
                                                    </svg>
                                                    Member since {new Date(user.created_at).getFullYear()}
                                                </span>
                                            </div>
                                        </div>

                                        <Link
                                            href={route('profile.edit')}
                                            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Cards - Moved to top for better visibility */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">12</p>
                                    <p className="text-sm text-gray-500">Orders</p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Orders</h3>
                            <p className="text-gray-600 text-sm">Keep dining with us!</p>
                        </div>

                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gray-900">8</p>
                                <p className="text-sm text-gray-500">Favorites</p>
                            </div>
                        </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Favorite Items</h3>
                            <p className="text-gray-600 text-sm">Your preferred dishes</p>
                        </div>

                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-orange-200 transform hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-bold text-gray-900">$247.50</p>
                                    <p className="text-sm text-gray-500">Spent</p>
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Total Spent</h3>
                            <p className="text-gray-600 text-sm">Your dining investment</p>
                        </div>
                    </div>

                    {/* Account Information - Moved to bottom */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-50 to-orange-50/50 px-8 py-6 border-b border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                                <svg className="w-6 h-6 mr-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Account Information
                            </h2>
                            <p className="text-gray-600 mt-1">Your account details and preferences</p>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Full Name
                                        </label>
                                        <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200 group-hover:border-orange-300 transition-colors duration-200">
                                            <span className="text-gray-900 font-medium">{user.name}</span>
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Email Address
                                        </label>
                                        <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200 group-hover:border-orange-300 transition-colors duration-200">
                                            <span className="text-gray-900 font-medium">{user.email}</span>
                                            {user.email_verified_at && (
                                                <svg className="w-5 h-5 text-green-500 ml-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Account Status
                                        </label>
                                        <div className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200">
                                            <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                                            <span className="text-emerald-800 font-semibold">Active & Verified</span>
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M9 11h6" />
                                            </svg>
                                            Member Since
                                        </label>
                                        <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                                            <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M9 11h6" />
                                            </svg>
                                            <span className="text-blue-800 font-medium">
                                                {new Date(user.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}