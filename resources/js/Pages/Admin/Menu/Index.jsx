import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Pagination from '@/Components/Pagination';

export default function MenusIndex({ menus, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');
    const [showSearch, setShowSearch] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    // Real-time search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search !== filters.search || category !== filters.category) {
                router.get(route('admin.menu.index'), { search, category }, {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['menus']
                });
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, category]);

    const clearFilters = () => {
        setSearch('');
        setCategory('');
        setShowSearch(false);
        setShowFilter(false);
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold leading-tight text-gray-800">Menu Management</h2>}>
            <Head title="Menu Management" />

            <div className="min-h-screen bg-gray-50 p-6">

            {/* Search and Filter Section */}
            <div className="mb-6 rounded-lg  p-4">
                <div className="flex items-center justify-between">
                    {/* Left side - Search and Filter */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowSearch(!showSearch)}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                title="Search"
                            >
                                <svg
                                    className="h-5 w-5 text-black"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2} // thicker stroke
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>

                            </button>

                            {showSearch && (
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search menus..."
                                        className="pl-4 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        autoFocus
                                    />
                                </div>
                            )}
                        </div>

                        {/* Filter */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                title="Filter"
                            >
                                <svg
                                    className="h-5 w-5 text-black"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2} // thicker lines
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                                    />
                                </svg>

                            </button>

                            {showFilter && (
                                <div className="relative">
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                                        className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none"
                                    >
                                        <option value="">All categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    {/* Custom arrow to ensure spacing and consistent look */}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Clear Filters Button */}
                        {(search || category) && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-gray-500 hover:text-gray-700 underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* Right side - Create Button */}
                    <Link
                        href={route('admin.menu.create')}
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8M8 12h8" />
                        </svg>
                        Create Menu
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white">
                        <tr>
                            <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Availability</th>
                            <th className="px-6 py-3 text-center font-medium font-sans text-[14px] text-black uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-[14px] font-normal font-sans text-gray-900">
                        {menus.data.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                    No menus found. <Link href={route('admin.menu.create')} className="text-blue-600 hover:underline">Create your first menu</Link>
                                </td>
                            </tr>
                        ) : (
                            menus.data.map((m) => (
                                <tr key={m.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-900">{m.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                            {m.image_path ? (
                                                <img src={m.image_path} alt={m.name} className="h-full w-full object-cover rounded-full" />
                                            ) : (
                                                <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-[14px] font-normal font-sans text-gray-900">{m.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">{m.category?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">${m.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${m.is_available
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {m.is_available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-[14px] font-normal font-sans">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Link
                                                href={route('admin.menu.edit', m.id)}
                                                className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
                                                title="Edit"
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </Link>
                                            <Link
                                                href={route('admin.menu.destroy', m.id)}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
                                                onClick={(e) => { if (!confirm('Delete this menu?')) e.preventDefault(); }}
                                                title="Delete"
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Custom Pagination */}
            {menus.data.length > 0 && (
                <Pagination
                    links={menus.links}
                    current_page={menus.current_page}
                    last_page={menus.last_page}
                />
            )}
            </div>
        </AuthenticatedLayout>
    );
}
