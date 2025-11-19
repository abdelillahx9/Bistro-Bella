import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Index({ contacts }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Contact Messages
                </h2>
            }
        >
            <Head title="Contact Messages" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {contacts.data.length > 0 ? (
                                <div className="space-y-6">
                                    {contacts.data.map((contact) => (
                                        <div key={contact.id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                                                    <p className="text-sm text-gray-600">{contact.email}</p>
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {new Date(contact.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <h4 className="text-md font-medium text-gray-800 mb-2">{contact.subject}</h4>
                                                <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                                            </div>
                                            {contact.ip_address && (
                                                <div className="text-xs text-gray-500">
                                                    IP: {contact.ip_address}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No contact messages found.</p>
                            )}

                            {contacts.last_page > 1 && (
                                <div className="mt-6">
                                    {/* Pagination can be added here if needed */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}