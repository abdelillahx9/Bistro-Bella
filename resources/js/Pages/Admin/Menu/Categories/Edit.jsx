import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function CategoriesEdit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
    });

    function submit(e) {
        e.preventDefault();
        put(route('admin.menu.categories.update', category.id));
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Edit Category</h2>}>
            <Head title="Edit Category" />

            <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">
                    <label className="block text-sm font-medium">Name</label>
                    <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
                    {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Slug (optional)</label>
                    <input type="text" value={data.slug} onChange={(e) => setData('slug', e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
                    {errors.slug && <div className="text-sm text-red-600">{errors.slug}</div>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
                    {errors.description && <div className="text-sm text-red-600">{errors.description}</div>}
                </div>

                <div>
                    <button type="submit" disabled={processing} className="rounded-md bg-blue-600 px-4 py-2 text-white">Update</button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
