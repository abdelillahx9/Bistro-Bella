import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function PublicLayout({ children }) {
    const { auth, url, component } = usePage().props;
    const isHome = (typeof window !== 'undefined' && typeof route === 'function' && route().current('public.home')) || url === '/' || component === 'Public/Home';

    return (
        <div className=" bg-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 relative">
                        {/* Logo */}
                        <div className="flex items-center z-10">
                            <Link href="/" className="flex items-center">
                                <ApplicationLogo className="block h-8 w-auto fill-current text-gray-800" />
                                <span className="ml-2 text-xl font-bold text-gray-800">Bistro Bella</span>
                            </Link>
                        </div>

                        {/* Navigation Links - Centered */}
                        <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 space-x-8">
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
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-3 ml-4 z-10">
                            <Link
                                href="/register"
                                className="text-gray-700 hover:text-orange-600 px-4 py-2 text-sm font-medium transition-colors duration-200 border border-gray-300 hover:border-orange-300 rounded-lg hover:bg-orange-50"
                            >
                                Sign Up
                            </Link>

                            {/* Reserve a Table Button */}
                            <Link
                                href="/reservations"
                                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                                Reserve a Table
                            </Link>
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
                                Events
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
                                    <path d="M12.017 0C8.396 0 7.609.035 6.298.129c-1.31.094-2.207.447-2.996.955C2.511 1.591 1.921 2.18 1.285 2.996.777 3.805.424 4.702.33 6.012.236 7.323.201 8.11.201 11.731s.035 4.408.129 5.719c.094 1.31.447 2.207.955 2.996.716.816 1.305 1.405 2.121 2.121.789.508 1.686.861 2.996.955 1.311.094 2.098.129 5.719.129s4.408-.035 5.719-.129c1.31-.094 2.207-.447 2.996-.955.816-.716 1.405-1.305 2.121-2.121.508-.789.861-1.686.955-2.996.094-1.311.129-2.098.129-5.719s-.035-4.408-.129-5.719c-.094-1.31-.447-2.207-.955-2.996-.716-.816-1.305-1.405-2.121-2.121C20.512.447 19.615.094 18.305 0c-1.311-.094-2.098-.129-5.719-.129zm4.276 2.403c1.089 0 1.945.896 1.945 2.003 0 1.107-.856 2.003-1.945 2.003s-1.945-.896-1.945-2.003c0-1.107.856-2.003 1.945-2.003zM12.017 5.99c-3.302 0-5.977 2.675-5.977 5.977s2.675 5.977 5.977 5.977 5.977-2.675 5.977-5.977-2.675-5.977-5.977-5.977zm0 9.868c-2.143 0-3.881-1.738-3.881-3.881s1.738-3.881 3.881-3.881 3.881 1.738 3.881 3.881-1.738 3.881-3.881 3.881z" />
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
