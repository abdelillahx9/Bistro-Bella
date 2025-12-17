import AuthenticatedLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react';

export default function StaffEdit({ staff }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        first_name: staff.first_name,
        last_name: staff.last_name,
        role: staff.role,
        status: Boolean(staff.status),
        photo: null,
    });

    const submit = (e) => {
        e.preventDefault();
        // We use post with _method: 'put' because Inertia/Laravel handles file uploads better this way for updates
        post(route('admin.staff.update', staff.id));
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold leading-tight text-gray-800">Edit Staff Member</h2>}>
            <Head title="Edit Staff Member" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="space-y-6 max-w-xl">
                                {/* First Name */}
                                <div>
                                    <InputLabel htmlFor="first_name" value="First Name" />
                                    <TextInput
                                        id="first_name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.first_name} className="mt-2" />
                                </div>

                                {/* Last Name */}
                                <div>
                                    <InputLabel htmlFor="last_name" value="Last Name" />
                                    <TextInput
                                        id="last_name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.last_name} className="mt-2" />
                                </div>

                                {/* Role */}
                                <div>
                                    <InputLabel htmlFor="role" value="Role" />
                                    <TextInput
                                        id="role"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.role} className="mt-2" />
                                </div>

                                {/* Status */}
                                <div>
                                    <InputLabel htmlFor="status" value="Status" />
                                    <div className="mt-2 flex items-center">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={data.status}
                                                onChange={(e) => setData('status', e.target.checked)}
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            <span className="ms-3 text-sm font-medium text-gray-700">{data.status ? 'Active' : 'Inactive'}</span>
                                        </label>
                                    </div>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                {/* Photo */}
                                <div>
                                    <InputLabel htmlFor="photo" value="Photo" />
                                    {staff.photo && (
                                        <div className="mb-2">
                                            <img src={`/storage/${staff.photo}`} alt="Current photo" className="h-20 w-20 rounded-full object-cover" />
                                            <p className="text-xs text-gray-500 mt-1">Current photo</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id="photo"
                                        className="mt-1 block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-blue-50 file:text-blue-700
                                            hover:file:bg-blue-100"
                                        onChange={(e) => setData('photo', e.target.files[0])}
                                        accept="image/*"
                                    />
                                    <InputError message={errors.photo} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Save Changes
                                    </PrimaryButton>

                                    <Link
                                        href={route('admin.staff.index')}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
