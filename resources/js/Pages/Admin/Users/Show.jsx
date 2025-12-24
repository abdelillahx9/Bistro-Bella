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

                    {/* User Details Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">User Information</h3>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.users.edit', user.id)}
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">ID</dt>
                                    <dd className="mt-1 text-sm text-gray-900">#{user.id}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.roles && user.roles.length > 0 && user.roles[0].name === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {user.roles && user.roles.length > 0 ? user.roles[0].name.charAt(0).toUpperCase() + user.roles[0].name.slice(1) : 'No Role'}
                                        </span>
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Email Verified</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.email_verified_at ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {user.email_verified_at ? 'Verified' : 'Not Verified'}
                                        </span>
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Profile Picture</dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {user.profile_picture ? (
                                            <span className="text-green-600">Yes</span>
                                        ) : (
                                            <span className="text-gray-500">No</span>
                                        )}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Joined Date</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formatDate(user.created_at)}</dd>
                                </div>

                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{formatDate(user.updated_at)}</dd>
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