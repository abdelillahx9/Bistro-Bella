import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Menu() {
    return (
        <PublicLayout>
            <Head title="Menu - Bistro Bella" />

            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Menu</h1>
                        <p className="text-lg text-gray-600">Discover our delicious selection of dishes</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <p className="text-center text-gray-500 text-lg">Menu page</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
