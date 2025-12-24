import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.blog-tags.store'));
    };

    return (
        <AdminLayout>
            <Head title="Create Blog Tag - Admin" />

            <div className="py-12">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Create New Tag</h1>
                                <Link
                                    href={route('admin.blog-tags.index')}
                                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg"
                                >
                                    Back to Tags
                                </Link>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tag Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        placeholder="Enter tag name"
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div className="flex justify-end space-x-3 pt-6 border-t">
                                    <Link
                                        href={route('admin.blog-tags.index')}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
                                    >
                                        {processing ? 'Creating...' : 'Create Tag'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}