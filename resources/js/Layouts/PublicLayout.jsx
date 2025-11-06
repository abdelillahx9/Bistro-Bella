import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';

export default function PublicLayout({ children }) {
    const { auth, url, component } = usePage().props;
    const user = auth?.user;
    const isAuthenticated = !!user;
    const isHome = (typeof window !== 'undefined' && typeof route === 'function' && route().current('public.home')) || url === '/' || component === 'Public/Home';

    return (
        <div className=" bg-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 relative">
                        {/* Logo */}
                        <div className="flex items-center z-10">
                            <Link href={isAuthenticated ? "/home" : "/"} className="flex items-center">
                                <ApplicationLogo className="block h-8 w-auto fill-current text-gray-800" />
                                <span className="ml-2 text-xl font-bold text-gray-800">Bistro Bella</span>
                            </Link>
                        </div>

                        {/* Navigation Links - Centered */}
                        <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 space-x-8">
                            {isAuthenticated ? (
                                // Authenticated user navigation
                                <>
                                    <Link
                                        href="/home"
                                        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                            url === '/home' || component === 'Home'
                                                ? 'text-orange-600 bg-orange-50 rounded-lg'
                                                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg'
                                        }`}
                                    >
                                        Dashboard
                                        {(url === '/home' || component === 'Home') && (
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></span>
                                        )}
                                    </Link>
                                    <Link
                                        href="/menu"
                                        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                            url === '/menu' || component === 'Public/Menu'
                                                ? 'text-orange-600 bg-orange-50 rounded-lg'
                                                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg'
                                        }`}
                                    >
                                        Menu
                                        {(url === '/menu' || component === 'Public/Menu') && (
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></span>
                                        )}
                                    </Link>
                                    <Link
                                        href="/blog"
                                        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                            url === '/blog' || component === 'Public/Blog'
                                                ? 'text-orange-600 bg-orange-50 rounded-lg'
                                                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg'
                                        }`}
                                    >
                                        Blog
                                        {(url === '/blog' || component === 'Public/Blog') && (
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></span>
                                        )}
                                    </Link>
                                    <Link
                                        href="/reservations"
                                        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                            url === '/reservations' || component === 'Public/Reservations'
                                                ? 'text-orange-600 bg-orange-50 rounded-lg'
                                                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg'
                                        }`}
                                    >
                                        Reservations
                                        {(url === '/reservations' || component === 'Public/Reservations') && (
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></span>
                                        )}
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                            url === '/contact' || component === 'Public/Contact'
                                                ? 'text-orange-600 bg-orange-50 rounded-lg'
                                                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg'
                                        }`}
                                    >
                                        Contact
                                        {(url === '/contact' || component === 'Public/Contact') && (
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></span>
                                        )}
                                    </Link>
                                    <Link
                                        href="/user/reviews"
                                        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                            url === '/user/reviews' || component === 'User/Reviews'
                                                ? 'text-orange-600 bg-orange-50 rounded-lg'
                                                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg'
                                        }`}
                                    >
                                        Reviews
                                        {(url === '/user/reviews' || component === 'User/Reviews') && (
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></span>
                                        )}
                                    </Link>
                                </>
                            ) : (
                                // Guest navigation
                                <>
                                    <Link
                                        href="/"
                                        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                            url === '/' || component === 'Public/Home'
                                                ? 'text-orange-600 bg-orange-50 rounded-lg'
                                                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg'
                                        }`}
                                    >
                                        Home
                                        {(url === '/' || component === 'Public/Home') && (
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></span>
                                        )}
                                    </Link>
                                    <Link
                                        href="/menu"
                                        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                            url === '/menu' || component === 'Public/Menu'
                                                ? 'text-orange-600 bg-orange-50 rounded-lg'
                                                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg'
                                        }`}
                                    >
                                        Menu
                                        {(url === '/menu' || component === 'Public/Menu') && (
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></span>
                                        )}
                                    </Link>
                                    <Link
                                        href="/blog"
                                        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                            url === '/blog' || component === 'Public/Blog'
                                                ? 'text-orange-600 bg-orange-50 rounded-lg'
                                                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg'
                                        }`}
                                    >
                                        Blog
                                        {(url === '/blog' || component === 'Public/Blog') && (
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></span>
                                        )}
                                    </Link>
                                    <Link
                                        href="/reservations"
                                        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                            url === '/reservations' || component === 'Public/Reservations'
                                                ? 'text-orange-600 bg-orange-50 rounded-lg'
                                                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg'
                                        }`}
                                    >
                                        Reservations
                                        {(url === '/reservations' || component === 'Public/Reservations') && (
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></span>
                                        )}
                                    </Link>
                                    <Link
                                        href="/about"
                                        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                            url === '/about' || component === 'Public/About'
                                                ? 'text-orange-600 bg-orange-50 rounded-lg'
                                                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg'
                                        }`}
                                    >
                                        About
                                        {(url === '/about' || component === 'Public/About') && (
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></span>
                                        )}
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                                            url === '/contact' || component === 'Public/Contact'
                                                ? 'text-orange-600 bg-orange-50 rounded-lg'
                                                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg'
                                        }`}
                                    >
                                        Contact
                                        {(url === '/contact' || component === 'Public/Contact') && (
                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-600 rounded-full"></span>
                                        )}
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Auth Buttons / User Menu */}
                        <div className="flex items-center space-x-3 ml-4 z-10">
                            {isAuthenticated ? (
                                // User dropdown for authenticated users
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
                                            <Dropdown.Link href={route('profile.edit')}>
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
                            ) : (
                                // Guest buttons
                                <>
                                    <Link
                                        href="/login"
                                        className="text-gray-700 hover:text-orange-600 px-4 py-2 text-sm font-medium transition-colors duration-200 border border-gray-300 hover:border-orange-300 rounded-lg hover:bg-orange-50"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/reservations"
                                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                    >
                                        Reserve a Table
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        {/* Navigation Links */}
                        <div className="flex justify-center space-x-8 mb-8">
                            <Link
                                href="/menu"
                                className="text-[#8C6E59] hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                Menu
                            </Link>
                            <Link
                                href="/about"
                                className="text-[#8C6E59] hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                About
                            </Link>
                            <Link
                                href="/reservations"
                                className="text-[#8C6E59] hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                Reservation
                            </Link>
                            <Link
                                href="/blog"
                                className="text-[#8C6E59] hover:text-orange-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                Blog
                            </Link>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex justify-center space-x-6 mb-6">
                            <a
                                href="#"
                                className="text-[#8C6E59] hover:text-orange-600 transition-colors duration-200"
                                aria-label="Facebook"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-[#8C6E59] hover:text-orange-600 transition-colors duration-200"
                                aria-label="Instagram"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-[#8C6E59] hover:text-orange-600 transition-colors duration-200"
                                aria-label="Twitter"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                        </div>

                        {/* Copyright */}
                        <p className="text-[#8C6E59] text-sm">© 2024 The Bistro. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
