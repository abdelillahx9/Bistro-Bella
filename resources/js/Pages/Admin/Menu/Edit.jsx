import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function MenuEdit({ menu, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        category_id: menu.category_id,
        name: menu.name,
        slug: menu.slug,
        description: menu.description,
        price: menu.price,
        image_path: menu.image_path,
        is_vegetarian: menu.is_vegetarian,
        is_gluten_free: menu.is_gluten_free,
        is_available: menu.is_available,
    });

    function submit(e) {
        e.preventDefault();
        put(route('admin.menu.update', menu.id));
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Menu</h2>}>
            <Head title="Edit Menu" />

            <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">
                    <label className="block text-sm font-medium">Category</label>
                    <select value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2">
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    {errors.category_id && <div className="text-sm text-red-600">{errors.category_id}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Name</label>
                    <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
                    {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Price</label>
                    <input type="text" value={data.price} onChange={(e) => setData('price', e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
                    {errors.price && <div className="text-sm text-red-600">{errors.price}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
                    {errors.description && <div className="text-sm text-red-600">{errors.description}</div>}
                </div>

                <div className="mb-4 flex items-center gap-4">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={data.is_vegetarian} onChange={(e) => setData('is_vegetarian', e.target.checked)} /> Vegetarian</label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={data.is_gluten_free} onChange={(e) => setData('is_gluten_free', e.target.checked)} /> Gluten Free</label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={data.is_available} onChange={(e) => setData('is_available', e.target.checked)} /> Available</label>
                </div>

                <div>
                    <button type="submit" disabled={processing} className="rounded-md bg-blue-600 px-4 py-2 text-white">Update</button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
