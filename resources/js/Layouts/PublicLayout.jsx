import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function PublicLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <ApplicationLogo className="block h-8 w-auto fill-current text-gray-800" />
                                <span className="ml-2 text-xl font-bold text-gray-800">Bistro Bella</span>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/menu"
                                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Menu
                            </Link>
                            <Link
                                href="/blog"
                                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Blog
                            </Link>
                            <Link
                                href="/reservations"
                                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Reservations
                            </Link>
                            <Link
                                href="/about"
                                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Contact
                            </Link>

                            {/* Reserve a Table Button */}
                            <Link
                                href="/reserve"
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Reserve a Table
                            </Link>

                            {/* Auth Links */}
                            {auth.user ? (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/home"
                                        className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        href="/login"
                                        className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button className="text-gray-700 hover:text-gray-900 p-2">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <ApplicationLogo className="block h-8 w-auto fill-current text-white" />
                            <span className="ml-2 text-xl font-bold">Bistro Bella</span>
                        </div>
                        <p className="text-gray-400">© 2025 Bistro Bella. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
