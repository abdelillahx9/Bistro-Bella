import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function MenusIndex({ menus, categories, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [category, setCategory] = useState(filters.category || '');

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Menus</h2>}>
            <Head title="Menus" />

            <div className="mb-4 flex items-center justify-between">
                <form method="get" action="" className="flex space-x-2">
                    <input type="text" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search menus..." className="rounded-md border px-3 py-2" />
                    <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md border px-3 py-2">
                        <option value="">All categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    <button className="rounded-md bg-blue-600 px-3 py-2 text-white">Search</button>
                </form>

                <Link href={route('admin.menu.create')} className="rounded-md bg-green-600 px-4 py-2 text-white">Create Menu</Link>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="w-full table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.data.map((m) => (
                            <tr key={m.id} className="border-t">
                                <td className="px-4 py-2">{m.name}</td>
                                <td className="px-4 py-2">{m.category?.name}</td>
                                <td className="px-4 py-2">${m.price}</td>
                                <td className="px-4 py-2 text-center">
                                    <Link href={route('admin.menu.edit', m.id)} className="text-blue-600">Edit</Link>
                                    <Link href={route('admin.menu.destroy', m.id)} method="delete" as="button" className="text-red-600 ml-3" onClick={(e) => { if (!confirm('Delete this menu?')) e.preventDefault(); }}>Delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4">
                {menus.links && <div dangerouslySetInnerHTML={{ __html: menus.links }} />}
            </div>
        </AuthenticatedLayout>
    );
}
