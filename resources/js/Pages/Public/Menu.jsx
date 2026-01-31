import PublicLayout from '@/Layouts/PublicLayout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

export default function Menu() {
    const { categories: initialCategories } = usePage().props;
    const [categories, setCategories] = useState(initialCategories);
    const [activeCategoryId, setActiveCategoryId] = useState(initialCategories[0]?.id);
    const [loading, setLoading] = useState(false);

    const activeCategory = categories.find(cat => cat.id === activeCategoryId);

    const handleCategoryClick = async (category) => {
        setActiveCategoryId(category.id);
        
        // If we only have a preview (usually 3 items from controller) and there are more, load them all
        if (category.menus.length < category.menus_count) {
            setLoading(true);
            try {
                const response = await axios.get(`/menu/category/${category.slug}`);
                // The controller returns {category, menus}
                const fullMenus = response.data.menus;
                
                setCategories(prevCategories => 
                    prevCategories.map(cat => 
                        cat.id === category.id ? { ...cat, menus: fullMenus } : cat
                    )
                );
            } catch (error) {
                console.error('Error loading category menu:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <PublicLayout>
            <Head title="Menu - Bistro Bella" />

            <div className="bg-white min-h-screen py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Centered Category Navigation */}
                    <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mb-20 border-b border-gray-100 pb-8">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category)}
                                className={`text-xs md:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300 relative pb-1 ${
                                    activeCategoryId === category.id
                                        ? 'text-orange-600'
                                        : 'text-gray-400 hover:text-gray-600'
                                }`}
                            >
                                {category.name}
                                {activeCategoryId === category.id && (
                                    <span className="absolute -bottom-8 left-0 w-full h-0.5 bg-orange-600" />
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Menu Content */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-pulse flex flex-col items-center">
                                <div className="h-8 w-8 bg-orange-100 rounded-full mb-3"></div>
                                <div className="text-gray-400 text-xs tracking-widest uppercase">Loading</div>
                            </div>
                        </div>
                    ) : activeCategory ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
                            {activeCategory.menus.length > 0 ? (
                                activeCategory.menus.map((item) => (
                                    <div key={item.id} className="flex flex-col group">
                                        <div className="aspect-square w-full bg-gray-50 rounded-sm overflow-hidden mb-8 shadow-sm">
                                            {item.image_path ? (
                                                <img
                                                    src={item.image_path.startsWith('http') ? item.image_path : (item.image_path.startsWith('menus/') ? `/storage/${item.image_path}` : item.image_path)}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-200 text-6xl font-light italic bg-gray-50 border border-gray-100">
                                                    {item.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm leading-relaxed font-normal">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 text-gray-400 italic">
                                    No items available in this category yet.
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-400 italic">
                            Select a category to view our menu.
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
