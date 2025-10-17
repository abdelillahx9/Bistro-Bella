import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Menu() {
    const { categories } = usePage().props;
    const [expandedCategories, setExpandedCategories] = useState({});
    const [loadingCategories, setLoadingCategories] = useState({});

    const handleSeeMore = async (categoryId, categorySlug) => {
        if (expandedCategories[categoryId]) {
            // If already expanded, collapse it
            setExpandedCategories(prev => ({
                ...prev,
                [categoryId]: false
            }));
            return;
        }

        setLoadingCategories(prev => ({ ...prev, [categoryId]: true }));

        try {
            const response = await axios.get(`/menu/category/${categorySlug}`);
            const fullCategory = response.data.category;

            // Update the categories data with full menu items
            setExpandedCategories(prev => ({
                ...prev,
                [categoryId]: fullCategory.menus
            }));
        } catch (error) {
            console.error('Error loading category menu:', error);
        } finally {
            setLoadingCategories(prev => ({ ...prev, [categoryId]: false }));
        }
    };

    const getMenuItemsForCategory = (category) => {
        if (expandedCategories[category.id]) {
            return expandedCategories[category.id];
        }
        return category.menus || [];
    };

    const getSeeMoreText = (category) => {
        if (expandedCategories[category.id]) {
            return 'See Less';
        }
        return 'See More →';
    };

    return (
        <PublicLayout>
            <Head title="Menu - Bistro Bella" />

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                        Our Menu
                    </h1>
                    <p className="text-gray-600 leading-relaxed text-center mb-8">
                        Discover our carefully crafted dishes made with the finest ingredients
                    </p>
                </div>
            </section>

            {categories.map((category) => (
                <section key={category.id} className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                                {category.name}
                            </h2>
                            {(category.menus_count > 3 || expandedCategories[category.id]) && (
                                <button
                                    onClick={() => handleSeeMore(category.id, category.slug)}
                                    disabled={loadingCategories[category.id]}
                                    className="text-orange-600 hover:text-orange-700 font-medium text-lg transition-colors duration-200 disabled:opacity-50"
                                >
                                    {loadingCategories[category.id] ? 'Loading...' : getSeeMoreText(category)}
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {getMenuItemsForCategory(category).map((menu) => (
                                <div key={menu.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                                        {menu.image_path ? (
                                            <img
                                                src={menu.image_path}
                                                alt={menu.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-gray-400 text-4xl">🍽️</div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                {menu.name}
                                            </h3>
                                            <span className="text-lg font-bold text-orange-600">
                                                ${menu.price}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            {menu.description}
                                        </p>

                                        {/* Tags */}
                                        {menu.tags && menu.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {menu.tags.map((tag) => (
                                                    <span
                                                        key={tag.id}
                                                        className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full"
                                                    >
                                                        {tag.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Dietary indicators */}
                                        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                                            {menu.is_vegetarian && (
                                                <span className="flex items-center gap-1">
                                                    <span className="text-green-600">🌱</span>
                                                    Vegetarian
                                                </span>
                                            )}
                                            {menu.is_gluten_free && (
                                                <span className="flex items-center gap-1">
                                                    <span className="text-blue-600">🌾</span>
                                                    Gluten Free
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {getMenuItemsForCategory(category).length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No menu items available in this category.</p>
                            </div>
                        )}
                    </div>
                </section>
            ))}

            {categories.length === 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-gray-500 text-lg">Menu is currently being updated. Please check back soon!</p>
                    </div>
                </section>
            )}

        </PublicLayout>
    );
}
