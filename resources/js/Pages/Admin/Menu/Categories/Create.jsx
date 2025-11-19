import AuthenticatedLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import TextField from '@/Components/TextField';

export default function CategoriesCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        description: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.menu.categories.store'));
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold leading-tight text-gray-800">Menu Management</h2>}>
            <Head title="Add Category" />

            <div className="min-h-screen bg-gray-50 p-6">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link
                                    href={route('admin.menu.categories.index')}
                                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                                >
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Add Category</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Form */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Name Field */}
                        <TextField
                            label="Name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter category name"
                            required
                            error={errors.name}
                        />

                        {/* Slug Field */}
                        <TextField
                            label="Slug (optional)"
                            name="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            placeholder="auto-generated from name if empty"
                            error={errors.slug}
                        />

                        {/* Description Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Enter category description"
                                rows={4}
                                className={`block w-full px-3 py-2 border ${
                                    errors.description ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-sans text-[14px] bg-white`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-6">
                            <Link
                                href={route('admin.menu.categories.index')}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
