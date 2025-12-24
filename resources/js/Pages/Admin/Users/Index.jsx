import AuthenticatedLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Pagination from '@/Components/Pagination';

export default function UsersIndex({ users, filters, roles }) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');
    const [showSearch, setShowSearch] = useState(false);
    const [showRoleFilter, setShowRoleFilter] = useState(false);

    // Real-time search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search !== filters.search || role !== filters.role) {
                router.get(route('admin.users.index'), { search, role }, {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['users']
                });
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, role]);

    const clearFilters = () => {
        setSearch('');
        setRole('');
        setShowSearch(false);
        setShowRoleFilter(false);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold leading-tight text-gray-800">User Management</h2>}>
            <Head title="User Management" />

            <div className="min-h-screen bg-gray-50 p-6">

            {/* Search and Filter Section */}
            <div className="mb-6 rounded-lg p-4">
                <div className="flex items-center justify-between">
                    {/* Left side - Search and Filters */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowSearch(!showSearch)}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                title="Search"
                            >
                                <svg
                                    className="h-5 w-5 text-black"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>

                            {showSearch && (
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search users..."
                                        className="pl-4 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        autoFocus
                                    />
                                </div>
                            )}
                        </div>

                        {/* Role Filter */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setShowRoleFilter(!showRoleFilter)}
                                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                title="Filter by Role"
                            >
                                <svg className="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>

                            {showRoleFilter && (
                                <div className="relative">
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="block w-full pl-4 pr-12 py-2 border border-gray-300 rounded-md bg-white focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">All roles</option>
                                        {roles.map((r) => (
                                            <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Clear Filters Button */}
                        {(search || role) && (
                            <button
                                onClick={clearFilters}
                                className="text-sm text-gray-500 hover:text-gray-700 underline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* Right side - Create Button */}
                    <Link
                        href={route('admin.users.create')}
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >
                        <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8M8 12h8" />
                        </svg>
                        Create User
                    </Link>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-lg">
                {/* Horizontal scroll only for wide tables */}
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-white">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-left font-medium font-sans text-[14px] text-black uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-center font-medium font-sans text-[14px] text-black uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-[14px] font-normal font-sans text-gray-900">
                            {users.data.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                        No users found. <Link href={route('admin.users.create')} className="text-blue-600 hover:underline">Create your first user</Link>
                                    </td>
                                </tr>
                            ) : (
                                users.data.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-900">{user.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-normal font-sans text-gray-900">{user.name}</div>
                                            {user.profile_picture && (
                                                <div className="text-xs text-gray-500">Has profile picture</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.roles && user.roles.length > 0 && user.roles[0].name === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {user.roles && user.roles.length > 0 ? user.roles[0].name.charAt(0).toUpperCase() + user.roles[0].name.slice(1) : 'No Role'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal font-sans text-gray-500">
                                            {formatDate(user.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.email_verified_at ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {user.email_verified_at ? 'Verified' : 'Unverified'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-[14px] font-normal font-sans">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Link
                                                    href={route('admin.users.show', user.id)}
                                                    className="text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-50 transition-colors duration-200"
                                                    title="View"
                                                >
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Pagination */}
            {users.data.length > 0 && (
                <Pagination
                    links={users.links}
                    current_page={users.current_page}
                    last_page={users.last_page}
                />
            )}
            </div>
        </AuthenticatedLayout>
    );
}