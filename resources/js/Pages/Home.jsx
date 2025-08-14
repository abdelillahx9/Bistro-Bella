import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Home
                </h2>
            }
        >
            <Head title="Home" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold mb-4">Welcome to Bistro Bella!</h1>
                            <p className="text-lg">
                                You're logged in as a user. Enjoy browsing our menu and making reservations.
                            </p>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-blue-800">Browse Menu</h3>
                                    <p className="text-blue-600">Discover our delicious dishes and special offers.</p>
                                </div>

                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-green-800">Make a Reservation</h3>
                                    <p className="text-green-600">Book a table for your next dining experience.</p>
                                </div>

                                <div className="bg-orange-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-orange-800">Order Online</h3>
                                    <p className="text-orange-600">Get your favorite meals delivered to your door.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
