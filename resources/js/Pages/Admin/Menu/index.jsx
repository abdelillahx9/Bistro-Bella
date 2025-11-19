import AuthenticatedLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function MenuIndex() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Menu Management
                </h2>
            }
        >
            <Head title="Menu Management" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-4">Menu Management</h1>
                            <p className="text-lg mb-6">
                                Manage your restaurant menu items here.
                            </p>

                            <div className="mb-6">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">
                                    Add New Menu Item
                                </button>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600">No menu items found. Start by adding your first menu item.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
