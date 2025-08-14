import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
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
                            <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard!</h1>
                            <p className="text-lg mb-6">
                                You're logged in as an administrator. Manage your restaurant operations from here.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-blue-100 p-6 rounded-lg border-l-4 border-blue-500">
                                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Users Management</h3>
                                    <p className="text-blue-600 text-sm">Manage user accounts and permissions</p>
                                    <div className="mt-4">
                                        <span className="text-2xl font-bold text-blue-800">0</span>
                                        <span className="text-blue-600 text-sm ml-2">Total Users</span>
                                    </div>
                                </div>

                                <div className="bg-green-100 p-6 rounded-lg border-l-4 border-green-500">
                                    <h3 className="text-lg font-semibold text-green-800 mb-2">Orders</h3>
                                    <p className="text-green-600 text-sm">View and manage customer orders</p>
                                    <div className="mt-4">
                                        <span className="text-2xl font-bold text-green-800">0</span>
                                        <span className="text-green-600 text-sm ml-2">Pending Orders</span>
                                    </div>
                                </div>

                                <div className="bg-orange-100 p-6 rounded-lg border-l-4 border-orange-500">
                                    <h3 className="text-lg font-semibold text-orange-800 mb-2">Menu Management</h3>
                                    <p className="text-orange-600 text-sm">Add, edit, and organize menu items</p>
                                    <div className="mt-4">
                                        <span className="text-2xl font-bold text-orange-800">0</span>
                                        <span className="text-orange-600 text-sm ml-2">Menu Items</span>
                                    </div>
                                </div>

                                <div className="bg-purple-100 p-6 rounded-lg border-l-4 border-purple-500">
                                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Analytics</h3>
                                    <p className="text-purple-600 text-sm">View reports and statistics</p>
                                    <div className="mt-4">
                                        <span className="text-2xl font-bold text-purple-800">$0</span>
                                        <span className="text-purple-600 text-sm ml-2">Total Revenue</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                                        Add New User
                                    </button>
                                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors">
                                        Add Menu Item
                                    </button>
                                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors">
                                        View Reports
                                    </button>
                                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors">
                                        System Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
