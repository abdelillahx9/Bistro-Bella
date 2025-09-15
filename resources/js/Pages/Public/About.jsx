import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';

export default function About() {
    return (
        <PublicLayout>
            <Head title="About - Bistro Bella" />

            <section className="pt-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
                        About us
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-center">
                        Our story, our passion.
                    </p>
                </div>
            </section>

            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="w-full relative rounded-xl shadow-xl">
                        <img
                            src="/assets/hero_About_us.png"  // From public/
                            alt="Hero Banner"
                            className="w-full h-[60vh] md:h-[70vh] lg:h-[80vh] object-cover rounded-lg shadow-lg"
                        />

                    </div>
                </div>
            </div>
            <section className="py-10 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-start text-gray-800 mb-8">
                        Our Story                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        The Hearth began with a simple dream: to create a place where people could gather, share stories, and enjoy delicious food made with love. Founded by Chef Amelia Stone, our restaurant is a tribute to the warmth of home cooking and the joy of community. We believe in using the freshest, locally-sourced ingredients to craft dishes that are both comforting and innovative. Our mission is to provide an unforgettable dining experience that nourishes both body and soul.                    </p>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-start text-gray-800 mb-12">
                        Meet the Team                   </h2>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                        {/* Chef */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center">
                            <img
                                src="/assets/Chef.png"
                                alt="Chef"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Chef Amelia Stone</h3>
                                <p className="text-gray-600">Executive Chef</p>
                            </div>
                        </div>

                        {/* Owner */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center">
                            <img
                                src="/assets/owner.png"
                                alt="Owner"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Marcus Bella</h3>
                                <p className="text-gray-600">Owner & Founder</p>
                            </div>
                        </div>

                        {/* Server */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center">
                            <img
                                src="/assets/server.png"
                                alt="Server"
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sarah Johnson</h3>
                                <p className="text-gray-600">Head Server</p>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-start text-gray-800 mb-12">
                        Testimonials
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        "The Hearth is more than just a restaurant;
                        it's an experience. The food is exquisite,
                        the atmosphere is inviting,
                        and the service is impeccable.
                        A true gem in our community!" - Sarah Thompson
                    </p>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-8">
                        Come visit us
                    </h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Experience the warmth of our restaurant and create unforgettable memories with your loved ones.
                    </p>
                    <Link
                        href="/reservations"
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                        Reserve a Table
                    </Link>
                </div>
            </section>

        </PublicLayout>
    );
}
