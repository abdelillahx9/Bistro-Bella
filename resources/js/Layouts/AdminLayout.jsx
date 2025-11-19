import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const { user } = usePage().props.auth;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="flex w-64 flex-col bg-white shadow-md">
                <div className="flex h-16 shrink-0 items-center justify-center border-b">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                    </Link>
                </div>

                <nav className="flex flex-grow flex-col space-y-2 p-4">
                    <NavLink
                        href={route('admin.dashboard')}
                        active={route().current('admin.dashboard')}
                        className="flex w-full items-center px-4 py-2 text-left text-sm font-medium"
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        href={route('admin.menu.index')}
                        active={route().current('admin.menu.index')}
                        className="flex w-full items-center px-4 py-2 text-left text-sm font-medium"
                    >
                        Menu
                    </NavLink>
                    <NavLink
                        href={route('admin.menu.categories.index')}
                        active={route().current('admin.menu.categories.index')}
                        className="flex w-full items-center px-4 py-2 text-left text-sm font-medium"
                    >
                        Categories
                    </NavLink>
                    <NavLink
                        href={route('admin.menu.tags.index')}
                        active={route().current('admin.menu.tags.index')}
                        className="flex w-full items-center px-4 py-2 text-left text-sm font-medium"
                    >
                        Tags
                    </NavLink>
                    <NavLink
                        href={route('admin.menu.reviews.index')}
                        active={route().current('admin.menu.reviews.index')}
                        className="flex w-full items-center px-4 py-2 text-left text-sm font-medium"
                    >
                        reviews
                    </NavLink>
                    <NavLink
                        href={route('admin.reservations.index')}
                        active={route().current('admin.reservations.index')}
                        className="flex w-full items-center px-4 py-2 text-left text-sm font-medium"
                    >
                        Reservations
                    </NavLink>
                    <NavLink
                        href={route('admin.tables.index')}
                        active={route().current('admin.tables.index')}
                        className="flex w-full items-center px-4 py-2 text-left text-sm font-medium"
                    >
                        Tables
                    </NavLink>
                    <NavLink
                        href={route('admin.contacts.index')}
                        active={route().current('admin.contacts.index')}
                        className="flex w-full items-center px-4 py-2 text-left text-sm font-medium"
                    >
                        Contact Messages
                    </NavLink>

                    {/* Add more NavLinks here as needed */}
                </nav>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {header && (
                    <header className="flex h-16 items-center bg-white shadow">
                        <div className="flex justify-between items-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div>{header}</div>
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
                                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                                        {user.profile_picture ? (
                                            <img
                                                src={`/storage/${user.profile_picture}`}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-orange-500 flex items-center justify-center text-white font-medium text-sm">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                                </div>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center text-gray-500 hover:text-gray-700">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content align="right">
                                        <Dropdown.Link href={route('admin.profile.edit')}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full text-left"
                                        >
                                            Logout
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </header>
                )}

                <main className="flex-1 overflow-y-auto overflow-x-hidden bg-white">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
