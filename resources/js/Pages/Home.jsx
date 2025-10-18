import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function Home() {
    return (
        <PublicLayout>
            <Head title="Home - Bistro Bella" />

            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                    {/* Hero Section */}
                    <div className="text-center mb-16">
                            <h1 className="text-3xl font-bold mb-4">Welcome to Bistro Bella!</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Discover our seasonal menu, reserve a table, or order online. We look forward to serving you.
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                <Link href={route('public.menu')} className="inline-flex items-center justify-center bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50">
                                    Browse Menu
                                </Link>
                                <Link href={route('public.reservations')} className="inline-flex items-center justify-center bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600">
                                    Make a Reservation
                                </Link>
                                <a href="#order" className="inline-flex items-center justify-center bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">
                                    Order Online
                                </a>
                            </div>
                    </div>

                    {/* Features Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentic Recipes</h3>
                            <p className="text-gray-600">
                                Traditional Italian recipes passed down through generations, prepared with the finest ingredients.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Family Atmosphere</h3>
                            <p className="text-gray-600">
                                Warm and welcoming environment perfect for family gatherings and special celebrations.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Reservations</h3>
                            <p className="text-gray-600">
                                Book your table online with our simple reservation system. No phone calls required.
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience Bistro Bella?</h2>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                            Join us for an unforgettable dining experience. Whether you're celebrating a special occasion
                            or just enjoying a night out, we're here to make it memorable.
                        </p>
                        <Link
                            href="/menu"
                            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
                        >
                            Explore Our Menu
                        </Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
