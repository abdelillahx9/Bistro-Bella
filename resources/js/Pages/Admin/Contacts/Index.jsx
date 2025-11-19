import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ contacts, currentFilter = 'new' }) {
    const handleFilter = (filter) => {
        router.get(route('admin.contacts.index'), { filter });
    };
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
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Contact Messages</h1>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleFilter('all')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                                            currentFilter === 'all'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => handleFilter('new')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                                            currentFilter === 'new'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        New
                                    </button>
                                    <button
                                        onClick={() => handleFilter('archived')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                                            currentFilter === 'archived'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        Archived
                                    </button>
                                </div>
                            </div>
                            {contacts.data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {contacts.data.map((contact) => (
                                                <tr key={contact.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.subject}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(contact.created_at).toLocaleDateString()}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <a href={route('admin.contacts.show', contact.id)} className="text-blue-600 hover:text-blue-900 mr-4">View</a>
                                                        {currentFilter !== 'archived' && (
                                                            <Link
                                                                href={route('admin.contacts.archive', contact.id)}
                                                                method="patch"
                                                                as="button"
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Archive
                                                            </Link>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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