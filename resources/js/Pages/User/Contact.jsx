import UserLayout from '@/Layouts/UserLayout';
import { Head } from '@inertiajs/react';

export default function Contact() {
    return (
        <UserLayout>
            <Head title="Contact Us - Bistro Bella" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
                            <p className="text-gray-600 mb-8">
                                We'd love to hear from you! As a valued member, your feedback helps us improve our service.
                            </p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Contact Information */}
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h2>

                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0">
                                                <svg className="w-6 h-6 text-orange-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-800">Address</h3>
                                                <p className="text-gray-600">123 Culinary Street<br />Foodie City, FC 12345</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0">
                                                <svg className="w-6 h-6 text-orange-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-800">Phone</h3>
                                                <p className="text-gray-600">(555) 123-4567</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0">
                                                <svg className="w-6 h-6 text-orange-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-800">Email</h3>
                                                <p className="text-gray-600">hello@bistrobella.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0">
                                                <svg className="w-6 h-6 text-orange-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-800">Hours</h3>
                                                <p className="text-gray-600">
                                                    Mon-Thu: 11AM - 10PM<br />
                                                    Fri-Sat: 11AM - 11PM<br />
                                                    Sunday: 12PM - 9PM
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h2>

                                    <form className="space-y-4">
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                                Subject
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="reservation">Reservation Inquiry</option>
                                                <option value="feedback">Feedback</option>
                                                <option value="complaint">Complaint</option>
                                                <option value="general">General Inquiry</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={6}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                                placeholder="Tell us how we can help you..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}