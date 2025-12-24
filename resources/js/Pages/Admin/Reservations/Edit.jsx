import AuthenticatedLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import TextField from '@/Components/TextField';

export default function Edit({ reservation, statuses, sources }) {
    const { data, setData, put, processing, errors } = useForm({
        name: reservation.name,
        email: reservation.email || '',
        phone: reservation.phone || '',
        reservation_date: reservation.reservation_date ? new Date(reservation.reservation_date).toISOString().split('T')[0] : '',
        reservation_time: reservation.reservation_time.substring(0, 5), // Format time as HH:MM
        guest_count: reservation.guest_count,
        special_requests: reservation.special_requests || '',
        status: reservation.status,
        source: reservation.source,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.reservations.update', reservation.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-bold leading-tight text-gray-800">Edit Reservation</h2>}
        >
            <Head title="Edit Reservation" />

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="mx-auto max-w-2xl">
                    {/* Breadcrumb */}
                    <nav className="mb-6 text-sm text-gray-500">
                        <Link href={route('admin.reservations.index')} className="hover:text-gray-700">Reservations</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">Edit #{reservation.id}</span>
                    </nav>

                    {/* Form Card */}
                    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
                        <form onSubmit={submit} className="space-y-6">
                            <TextField
                                label="Guest Name"
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                required
                                placeholder="Enter guest name"
                            />

                            <TextField
                                label="Email"
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                placeholder="Enter email address"
                            />

                            <TextField
                                label="Phone"
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                error={errors.phone}
                                placeholder="Enter phone number"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextField
                                    label="Reservation Date"
                                    id="reservation_date"
                                    type="date"
                                    value={data.reservation_date}
                                    onChange={(e) => setData('reservation_date', e.target.value)}
                                    error={errors.reservation_date}
                                    required
                                />

                                <TextField
                                    label="Reservation Time"
                                    id="reservation_time"
                                    type="time"
                                    value={data.reservation_time}
                                    onChange={(e) => setData('reservation_time', e.target.value)}
                                    error={errors.reservation_time}
                                    required
                                />
                            </div>

                            <TextField
                                label="Guest Count"
                                id="guest_count"
                                type="number"
                                min="1"
                                max="20"
                                value={data.guest_count}
                                onChange={(e) => setData('guest_count', e.target.value)}
                                error={errors.guest_count}
                                required
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                </div>

                                <div>
                                    <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-2">
                                        Source
                                    </label>
                                    <select
                                        id="source"
                                        value={data.source}
                                        onChange={(e) => setData('source', e.target.value)}
                                        className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        {sources.map((source) => (
                                            <option key={source} value={source}>
                                                {source.charAt(0).toUpperCase() + source.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.source && <p className="mt-1 text-sm text-red-600">{errors.source}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="special_requests" className="block text-sm font-medium text-gray-700 mb-2">
                                    Special Requests
                                </label>
                                <textarea
                                    id="special_requests"
                                    rows={4}
                                    value={data.special_requests}
                                    onChange={(e) => setData('special_requests', e.target.value)}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Any special requests or notes..."
                                />
                                {errors.special_requests && <p className="mt-1 text-sm text-red-600">{errors.special_requests}</p>}
                            </div>

                            <div className="flex items-center justify-end space-x-4">
                                <Link
                                    href={route('admin.reservations.index')}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? 'Updating...' : 'Update Reservation'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
