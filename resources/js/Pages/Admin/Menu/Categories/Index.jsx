import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function CategoriesIndex({ categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Menu Categories</h2>}
        >
            <Head title="Menu Categories" />

            <div className="mb-4 flex items-center justify-between">
                <form method="get" action="" className="flex space-x-2">
                    <input
                        type="text"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search categories..."
                        className="rounded-md border px-3 py-2"
                    />
                    <button className="rounded-md bg-blue-600 px-3 py-2 text-white">Search</button>
                </form>

                <Link href={route('admin.menu.categories.create')} className="rounded-md bg-green-600 px-4 py-2 text-white">
                    Create Category
                </Link>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="w-full table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Slug</th>
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.data.map((cat) => (
                            <tr key={cat.id} className="border-t">
                                <td className="px-4 py-2">{cat.name}</td>
                                <td className="px-4 py-2">{cat.slug}</td>
                                <td className="px-4 py-2">{cat.description}</td>
                                <td className="px-4 py-2 text-center">
                                    <Link href={route('admin.menu.categories.edit', cat.id)} className="text-blue-600">Edit</Link>
                                    <Link
                                        href={route('admin.menu.categories.destroy', cat.id)}
                                        method="delete"
                                        as="button"
                                        className="text-red-600 ml-3"
                                        onClick={(e) => { if (!confirm('Delete this category?')) e.preventDefault(); }}
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4">
                {/* Simple pagination */}
                {categories.links && (
                    <div dangerouslySetInnerHTML={{ __html: categories.links }} />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
