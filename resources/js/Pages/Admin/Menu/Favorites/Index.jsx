import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function FavoritesIndex({ favorites, menus, filters }) {
    const [menu, setMenu] = useState(filters.menu || '');

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Menu Favorites</h2>}>
            <Head title="Menu Favorites" />

            <div className="mb-4 flex items-center justify-between">
                <form method="get" action="" className="flex space-x-2">
                    <select name="menu" value={menu} onChange={(e) => setMenu(e.target.value)} className="rounded-md border px-3 py-2">
                        <option value="">All menus</option>
                        {menus.map((m) => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                    <button className="rounded-md bg-blue-600 px-3 py-2 text-white">Filter</button>
                </form>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <table className="w-full table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left">Menu</th>
                            <th className="px-4 py-2 text-left">User</th>
                            <th className="px-4 py-2 text-left">Favorited At</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorites.data.map((f) => (
                            <tr key={f.id} className="border-t">
                                <td className="px-4 py-2">{f.menu?.name}</td>
                                <td className="px-4 py-2">{f.user?.name}</td>
                                <td className="px-4 py-2">{new Date(f.created_at).toLocaleString()}</td>
                                <td className="px-4 py-2 text-center">
                                    <Link href={route('admin.menu.favorites.destroy', f.id)} method="delete" as="button" className="text-red-600" onClick={(e) => { if (!confirm('Remove this favorite?')) e.preventDefault(); }}>Remove</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4">
                {favorites.links && <div dangerouslySetInnerHTML={{ __html: favorites.links }} />}
            </div>
        </AuthenticatedLayout>
    );
}
