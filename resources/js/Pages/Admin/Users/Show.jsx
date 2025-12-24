import AuthenticatedLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ user }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">User Details</h2>}
        >
            <Head title="User Details" />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-4xl">
                    {/* Breadcrumb */}
                    <nav className="mb-6 text-sm text-gray-500">
                        <Link href={route('admin.users.index')} className="hover:text-gray-700">Users</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">#{user.id}</span>
                    </nav>

                    {/* User Profile Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                        <div className="px-6 py-8">
                            <div className="flex items-center space-x-6">
                                {/* Profile Picture */}
                                <div className="flex-shrink-0">
                                    {user.profile_picture ? (
                                        <img
                                            src={`/storage/${user.profile_picture}`}
                                            alt={`${user.name}'s profile`}
                                            className="h-24 w-24 rounded-full object-cover border-4 border-gray-100 shadow-lg"
                                        />
                                    ) : (
                                        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                            <span className="text-2xl font-bold text-white">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* User Info */}
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
                                    <p className="text-gray-600 mb-2">{user.email}</p>
                                    <div className="flex items-center space-x-4">
                                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${user.roles && user.roles.length > 0 && user.roles[0].name === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {user.roles && user.roles.length > 0 ? user.roles[0].name.charAt(0).toUpperCase() + user.roles[0].name.slice(1) : 'No Role'}
                                        </span>
                                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${user.email_verified_at ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.email_verified_at ? 'Verified' : 'Not Verified'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* User Details Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Account Details</h3>
                        </div>

                        <div className="px-6 py-6">
                            <dl className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">User ID</dt>
                                    <dd className="text-sm text-gray-900 font-mono">#{user.id}</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Full Name</dt>
                                    <dd className="text-sm text-gray-900">{user.name}</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Email Address</dt>
                                    <dd className="text-sm text-gray-900">{user.email}</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Role</dt>
                                    <dd className="text-sm text-gray-900">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.roles && user.roles.length > 0 && user.roles[0].name === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {user.roles && user.roles.length > 0 ? user.roles[0].name.charAt(0).toUpperCase() + user.roles[0].name.slice(1) : 'No Role'}
                                        </span>
                                    </dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Email Verification</dt>
                                    <dd className="text-sm text-gray-900">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.email_verified_at ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.email_verified_at ? 'Verified' : 'Not Verified'}
                                        </span>
                                    </dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Member Since</dt>
                                    <dd className="text-sm text-gray-900">{formatDate(user.created_at)}</dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 rounded-lg sm:col-span-2">
                                    <dt className="text-sm font-medium text-gray-500 mb-1">Last Updated</dt>
                                    <dd className="text-sm text-gray-900">{formatDate(user.updated_at)}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-6">
                        <Link
                            href={route('admin.users.index')}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Users
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}