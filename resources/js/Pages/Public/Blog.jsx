import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Blog() {
    return (
        <PublicLayout>
            <Head title="Blog - Bistro Bella" />

            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Blog</h1>
                        <p className="text-lg text-gray-600">Stories, recipes, and news from Bistro Bella</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <p className="text-center text-gray-500 text-lg">Blog page</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
