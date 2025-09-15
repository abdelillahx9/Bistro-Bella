import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Reservations() {
    return (
        <PublicLayout>
            <Head title="Contact - Bistro Bella" />

            <section className="pt-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
                        Reserve a Table
                    </h2>
                    <p className="text-gray-500 leading-relaxed text-center">
                        We're saving you a seat.
                    </p>
                </div>
            </section>


            {/* Contact Form Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row justify-around gap-12">
                        {/* Contact Form */}
                        <div className="flex-1  p-8 md:p-12 h-fit">
                            <div className="mb-8">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                    Reservation Form
                                </h3>
                                <p className="text-gray-600">
                                    Please fill out the form below to book your table.
                                </p>
                            </div>

                            <form className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
                                        placeholder="Enter your email address"
                                    />
                                </div>


                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                {/* number of guests Field */}
                                <div>
                                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Guests
                                    </label>
                                    <input
                                        type="number"
                                        id="guests"
                                        name="guests"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
                                        placeholder="Enter number of guests"
                                    />
                                </div>


                                {/* time field */}
                                                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                                        Time
                                    </label>
                                        <input
                                            type="time"
                                            id="time"
                                            name="time"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
                                            placeholder="Enter number of guests"
                                        />
                                    </div>

                                {/* Note Field */}
                                <div>
                                    <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                                        Note
                                    </label>
                                    <textarea
                                        id="note"
                                        name="note"
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
                                        placeholder="Enter any special requests or notes"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                                    >
                                        Reserve Now
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="flex-1  p-8 md:p-12 h-fit">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                                    Contact Information
                                </h3>

                                {/* Phone */}
                                <div className="flex items-start space-x-4 mb-6">
                                    <div className="flex-shrink-0">
                                        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-1">Phone</h4>
                                        <p className="text-gray-600">(555) 123-4567</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start space-x-4 mb-6">
                                    <div className="flex-shrink-0">
                                        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-1">Email</h4>
                                        <p className="text-gray-600">info@bistrobella.com</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start space-x-4 mb-6">
                                    <div className="flex-shrink-0">
                                        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-1">Address</h4>
                                        <p className="text-gray-600">123 Culinary Street<br />Food District, NY 10001</p>
                                    </div>
                                </div>

                                {/* Business Hours */}
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 mb-1">Business Hours</h4>
                                        <p className="text-gray-600">
                                            Mon-Thu: 11AM - 10PM<br />
                                            Fri-Sat: 11AM - 11PM<br />
                                            Sunday: 12PM - 9PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
