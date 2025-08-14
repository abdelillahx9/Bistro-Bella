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
                        href={route('admin.menu.reviews.index')}
                        active={route().current('admin.menu.reviews.index')}
                        className="flex w-full items-center px-4 py-2 text-left text-sm font-medium"
                    >
                        reviews
                    </NavLink>
                    {/* Add more NavLinks here as needed */}
                </nav>

                <div className="border-t p-4">
                    <div className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="inline-flex w-full rounded-md">
                                    <button
                                        type="button"
                                        className="inline-flex w-full items-center justify-between rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                    >
                                        {user.name}

                                        <svg
                                            className="-me-0.5 ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content align="top" className="w-full">
                                <Dropdown.Link href={route('profile.edit')}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="w-full text-left"
                                >
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {header && (
                    <header className="flex h-16 items-center bg-white shadow">
                        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-200">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
