import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import TextField from '@/Components/TextField';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        table_number: '',
        capacity: 1,
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.tables.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Create Table</h2>}
        >
            <Head title="Create Table" />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-2xl">
                    {/* Breadcrumb */}
                    <nav className="mb-6 text-sm text-gray-500">
                        <Link href={route('admin.tables.index')} className="hover:text-gray-700">Tables</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">Create</span>
                    </nav>

                    {/* Form Card */}
                    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
                        <form onSubmit={submit} className="space-y-6">
                            <TextField
                                label="Table Number"
                                id="table_number"
                                type="text"
                                value={data.table_number}
                                onChange={(e) => setData('table_number', e.target.value)}
                                error={errors.table_number}
                                required
                                placeholder="Enter table number (e.g., T01, A5, Table 1)"
                            />

                            <TextField
                                label="Capacity"
                                id="capacity"
                                type="number"
                                min="1"
                                max="20"
                                value={data.capacity}
                                onChange={(e) => setData('capacity', e.target.value)}
                                error={errors.capacity}
                                required
                                placeholder="Maximum number of guests"
                            />

                            <div>
                                <label htmlFor="is_active" className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    id="is_active"
                                    value={data.is_active ? 'true' : 'false'}
                                    onChange={(e) => setData('is_active', e.target.value === 'true')}
                                    className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                                {errors.is_active && <p className="mt-1 text-sm text-red-600">{errors.is_active}</p>}
                            </div>

                            <div className="flex items-center justify-end space-x-4">
                                <Link
                                    href={route('admin.tables.index')}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? 'Creating...' : 'Create Table'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
