import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <UserLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
                            <p className="text-lg">
                                Welcome to your dashboard! This page is under development.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}