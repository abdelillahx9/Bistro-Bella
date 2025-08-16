import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import TextField from '@/Components/TextField';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.menu.tags.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Create Tag</h2>}
        >
            <Head title="Create Tag" />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-2xl">
                    {/* Breadcrumb */}
                    <nav className="mb-6 text-sm text-gray-500">
                        <Link href={route('admin.menu.tags.index')} className="hover:text-gray-700">Tags</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">Create</span>
                    </nav>

                    {/* Form Card */}
                    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
                        <form onSubmit={submit} className="space-y-6">
                            <TextField
                                label="Tag Name"
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                required
                                autoFocus
                                placeholder="Enter tag name"
                            />

                            <div className="flex items-center justify-end space-x-4">
                                <Link
                                    href={route('admin.menu.tags.index')}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? 'Creating...' : 'Create Tag'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
