import AuthenticatedLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import TextField from '@/Components/TextField';

export default function Edit({ user, roles }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        role: user.roles && user.roles.length > 0 ? user.roles[0].name : 'user',
        profile_picture: null,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.users.update', user.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Edit User</h2>}
        >
            <Head title="Edit User" />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-2xl">
                    {/* Breadcrumb */}
                    <nav className="mb-6 text-sm text-gray-500">
                        <Link href={route('admin.users.index')} className="hover:text-gray-700">Users</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">Edit #{user.id}</span>
                    </nav>

                    {/* Form Card */}
                    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
                        <form onSubmit={submit} className="space-y-6">
                            <TextField
                                label="Full Name"
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                required
                                placeholder="Enter user's full name"
                            />

                            <TextField
                                label="Email Address"
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                required
                                placeholder="Enter email address"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextField
                                    label="New Password (Leave blank to keep current)"
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    error={errors.password}
                                    placeholder="Enter new password"
                                />

                                <TextField
                                    label="Confirm New Password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    error={errors.password_confirmation}
                                    placeholder="Confirm new password"
                                />
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    {roles.map((role) => (
                                        <option key={role} value={role}>
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                            </div>

                            <div>
                                <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile Picture (Optional)
                                </label>
                                <input
                                    type="file"
                                    id="profile_picture"
                                    name="profile_picture"
                                    accept="image/*"
                                    onChange={(e) => setData('profile_picture', e.target.files[0])}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
                                />
                                {errors.profile_picture && <p className="mt-1 text-sm text-red-600">{errors.profile_picture}</p>}
                                <p className="mt-1 text-sm text-gray-500">
                                    Accepted formats: JPG, PNG, GIF. Max size: 2MB. Leave empty to keep current picture.
                                </p>
                                {user.profile_picture && (
                                    <p className="mt-1 text-sm text-green-600">Current profile picture exists</p>
                                )}
                            </div>

                            <div className="flex items-center justify-end space-x-4">
                                <Link
                                    href={route('admin.users.index')}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Update User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}