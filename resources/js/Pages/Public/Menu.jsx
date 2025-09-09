import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Menu() {
    return (
        <PublicLayout>
            <Head title="Menu - Bistro Bella" />
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-start text-gray-800 mb-12">
                        Our Menu
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Fresh pasta with seasonal vegetables and a light cream sauce.
                    </p>
                </div>
            </section>

            {/* Featured Dishes Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-start text-gray-800 mb-12">
                        Starters
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Dish 1 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="/assets/dish3.png"
                                alt="Truffle Risotto"
                                className="w-fill h-fill object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Pasta Primavera</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Fresh pasta with seasonal vegetables and a light cream sauce.
                                </p>
                            </div>
                        </div>

                        {/* Dish 2 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="/assets/dish2.png"
                                alt="Beef Tenderloin"
                                className="w-fill h-fill object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Grilled Salmon</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Perfectly grilled salmon with a side of roasted vegetables.
                                </p>
                            </div>
                        </div>
                        {/* Dish 3 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="/assets/dish1.png"
                                alt="Grilled Salmon"
                                className="w-fill h-fill object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Chocolate Lava Cake</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Warm chocolate cake with a gooey center and a tangy raspberry sauce.
                                </p>
                            </div>
                        </div>


                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-start text-gray-800 mb-12">
                        Main Courses
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Dish 1 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="/assets/dish3.png"
                                alt="Truffle Risotto"
                                className="w-fill h-fill object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Pasta Primavera</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Fresh pasta with seasonal vegetables and a light cream sauce.
                                </p>
                            </div>
                        </div>

                        {/* Dish 2 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="/assets/dish2.png"
                                alt="Beef Tenderloin"
                                className="w-fill h-fill object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Grilled Salmon</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Perfectly grilled salmon with a side of roasted vegetables.
                                </p>
                            </div>
                        </div>
                        {/* Dish 3 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="/assets/dish1.png"
                                alt="Grilled Salmon"
                                className="w-fill h-fill object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Chocolate Lava Cake</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Warm chocolate cake with a gooey center and a tangy raspberry sauce.
                                </p>
                            </div>
                        </div>


                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-start text-gray-800 mb-12">
                        Desserts
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Dish 1 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="/assets/dish3.png"
                                alt="Truffle Risotto"
                                className="w-fill h-fill object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Pasta Primavera</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Fresh pasta with seasonal vegetables and a light cream sauce.
                                </p>
                            </div>
                        </div>

                        {/* Dish 2 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="/assets/dish2.png"
                                alt="Beef Tenderloin"
                                className="w-fill h-fill object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Grilled Salmon</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Perfectly grilled salmon with a side of roasted vegetables.
                                </p>
                            </div>
                        </div>
                        {/* Dish 3 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="/assets/dish1.png"
                                alt="Grilled Salmon"
                                className="w-fill h-fill object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Chocolate Lava Cake</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Warm chocolate cake with a gooey center and a tangy raspberry sauce.
                                </p>
                            </div>
                        </div>


                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-start text-gray-800 mb-12">
                        Drinks
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Dish 1 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="/assets/dish3.png"
                                alt="Truffle Risotto"
                                className="w-fill h-fill object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Pasta Primavera</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Fresh pasta with seasonal vegetables and a light cream sauce.
                                </p>
                            </div>
                        </div>

                        {/* Dish 2 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="/assets/dish2.png"
                                alt="Beef Tenderloin"
                                className="w-fill h-fill object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Grilled Salmon</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Perfectly grilled salmon with a side of roasted vegetables.
                                </p>
                            </div>
                        </div>
                        {/* Dish 3 */}
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img
                                src="/assets/dish1.png"
                                alt="Grilled Salmon"
                                className="w-fill h-fill object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Chocolate Lava Cake</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Warm chocolate cake with a gooey center and a tangy raspberry sauce.
                                </p>
                            </div>
                        </div>


                    </div>
                </div>
            </section>

        </PublicLayout>
    );
}
