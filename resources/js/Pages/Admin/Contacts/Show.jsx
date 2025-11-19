import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ contact }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Contact Message Details
                </h2>
            }
        >
            <Head title="Contact Message Details" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{contact.name}</h3>
                                        <p className="text-lg text-gray-600 mb-1">{contact.email}</p>
                                        <p className="text-sm text-gray-500">
                                            Received on {new Date(contact.created_at).toLocaleDateString()} at {new Date(contact.created_at).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    {contact.ip_address && (
                                        <div className="text-sm text-gray-500">
                                            IP: {contact.ip_address}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-xl font-medium text-gray-800 mb-3">Subject</h4>
                                    <p className="text-lg text-gray-700">{contact.subject}</p>
                                </div>

                                <div>
                                    <h4 className="text-xl font-medium text-gray-800 mb-3">Message</h4>
                                    <div className="bg-white p-4 rounded-md border border-gray-200">
                                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{contact.message}</p>
                                    </div>
                                </div>

                                <div className="mt-8 flex space-x-4">
                                    <Link
                                        href={route('admin.contacts.archive', contact.id)}
                                        method="patch"
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                                    >
                                        Archive
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}