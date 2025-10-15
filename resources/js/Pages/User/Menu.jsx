import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';

export default function Menu() {
    return (
        <UserLayout>
            <Head title="Menu - Bistro Bella" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-3xl font-bold mb-6">Our Menu</h1>
                            <p className="text-gray-600 mb-8">
                                Discover our delicious dishes. As a logged-in user, you can favorite items and place orders directly.
                            </p>

                            {/* Menu Categories */}
                            <div className="space-y-8">
                                {/* Starters */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Starters</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-medium">Pasta Primavera</h3>
                                                <button className="text-orange-500 hover:text-orange-600">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">Fresh pasta with seasonal vegetables and a light cream sauce.</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-semibold text-orange-600">$12.99</span>
                                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                                    Add to Order
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-medium">Grilled Salmon</h3>
                                                <button className="text-gray-400 hover:text-orange-500">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">Atlantic salmon grilled to perfection with herbs.</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-semibold text-orange-600">$18.99</span>
                                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                                    Add to Order
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-medium">Caesar Salad</h3>
                                                <button className="text-gray-400 hover:text-orange-500">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">Crisp romaine lettuce with parmesan and croutons.</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-semibold text-orange-600">$9.99</span>
                                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                                    Add to Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Main Courses */}
                                <section>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Main Courses</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-medium">Beef Tenderloin</h3>
                                                <button className="text-orange-500 hover:text-orange-600">
                                                    <svg className="w-5 h-5" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">Premium beef tenderloin with red wine reduction.</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-semibold text-orange-600">$28.99</span>
                                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                                    Add to Order
                                                </button>
                                            </div>
                                        </div>

                                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-lg font-medium">Chicken Parmesan</h3>
                                                <button className="text-gray-400 hover:text-orange-500">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">Breaded chicken breast with marinara and mozzarella.</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-semibold text-orange-600">$22.99</span>
                                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                                    Add to Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}