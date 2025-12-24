import PublicLayout from '@/Layouts/PublicLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import axios from 'axios';

export default function Reservations({ userData }) {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('success');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [availableTables, setAvailableTables] = useState([]);
    const [selectedTables, setSelectedTables] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: userData?.name || '',
        email: userData?.email || '',
        phone: '',
        reservation_date: '',
        reservation_time: '',
        guest_count: '',
        tables: [],
        special_requests: '',
    });

    const fetchAvailableTables = async () => {
        if (data.reservation_date && data.reservation_time && data.guest_count) {
            try {
                const response = await axios.get(route('public.reservations.available-tables'), {
                    params: {
                        date: data.reservation_date,
                        time: data.reservation_time,
                        guests: data.guest_count
                    }
                });
                setAvailableTables(response.data);
                // Reset selected tables if they are no longer available
                setSelectedTables(prev => prev.filter(table => 
                    response.data.some(available => available.id === table.id)
                ));
            } catch (error) {
                console.error('Error fetching available tables:', error);
            }
        } else {
            setAvailableTables([]);
            setSelectedTables([]);
        }
    };

    useEffect(() => {
        fetchAvailableTables();
    }, [data.reservation_date, data.reservation_time, data.guest_count]);

    useEffect(() => {
        // Listen for real-time table availability updates
        const channel = window.Echo.channel('table-availability');
        channel.listen('.table.updated', (event) => {
            // Refresh available tables if the update matches current selection
            if (event.date === data.reservation_date && 
                event.time === data.reservation_time && 
                event.guests === data.guest_count) {
                fetchAvailableTables();
            }
        });

        return () => {
            channel.stopListening('.table.updated');
        };
    }, [data.reservation_date, data.reservation_time, data.guest_count]);

    const submit = (e) => {
        e.preventDefault();

        post(route('public.reservations.store'), {
            onSuccess: () => {
                setNotificationMessage('Your reservation has been submitted successfully! We will contact you shortly to confirm.');
                setNotificationType('success');
                setShowNotification(true);
                reset();
                setSelectedDate(null);
                setSelectedTime(null);
                setSelectedTables([]);

                // Hide notification after 5 seconds
                setTimeout(() => {
                    setShowNotification(false);
                }, 5000);
            },
            onError: () => {
                setNotificationMessage('There was an error submitting your reservation. Please try again.');
                setNotificationType('error');
                setShowNotification(true);

                setTimeout(() => {
                    setShowNotification(false);
                }, 5000);
            }
        });
    };

    return (
        <PublicLayout>
            <Head title="Reservations - Bistro Bella" />

            {/* Notification */}
            {showNotification && (
                <div className={`fixed top-4 right-4 z-50 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 ${notificationType === 'success' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
                    <div className="p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                {notificationType === 'success' ? (
                                    <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                )}
                            </div>
                            <div className="ml-3 w-0 flex-1 pt-0.5">
                                <p className="text-sm font-medium text-gray-900">
                                    {notificationType === 'success' ? 'Reservation Submitted!' : 'Error'}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {notificationMessage}
                                </p>
                            </div>
                            <div className="ml-4 flex-shrink-0 flex">
                                <button
                                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => setShowNotification(false)}
                                >
                                    <span className="sr-only">Close</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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

            {/* Reservation Form Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row justify-around gap-12">
                        {/* Reservation Form */}
                        <div className="flex-1 p-8 md:p-12 h-fit">
                            <div className="mb-8">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                                    Reservation Form
                                </h3>
                                <p className="text-gray-600">
                                    Please fill out the form below to book your table.
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                {/* Phone Field */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
                                        placeholder="Enter your phone number"
                                    />
                                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
                                        placeholder="Enter your email address"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    {(!data.email && !data.phone) && <p className="mt-1 text-sm text-gray-500">Either email or phone number is required</p>}
                                </div>

                                {/* Date Field */}
                                <div>
                                    <label htmlFor="reservation_date" className="block text-sm font-medium text-gray-700 mb-2">
                                        Reservation Date *
                                    </label>
                                    <Calendar
                                        id="reservation_date"
                                        value={selectedDate}
                                        onChange={(e) => {
                                            setSelectedDate(e.value);
                                            if (e.value) {
                                                const year = e.value.getFullYear();
                                                const month = String(e.value.getMonth() + 1).padStart(2, '0');
                                                const day = String(e.value.getDate()).padStart(2, '0');
                                                setData('reservation_date', `${year}-${month}-${day}`);
                                            } else {
                                                setData('reservation_date', '');
                                            }
                                        }}
                                        minDate={(() => {
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);
                                            return today;
                                        })()}
                                        dateFormat="yy-mm-dd"
                                        className="w-full"
                                        inputClassName="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
                                        placeholder="Select reservation date"
                                        inline
                                        required
                                    />
                                    {errors.reservation_date && <p className="mt-1 text-sm text-red-600">{errors.reservation_date}</p>}
                                </div>

                                {/* Time Field */}
                                <div>
                                    <label htmlFor="reservation_time" className="block text-sm font-medium text-gray-700 mb-2">
                                        Reservation Time *
                                    </label>
                                    <Calendar
                                        id="reservation_time"
                                        value={selectedTime}
                                        onChange={(e) => {
                                            setSelectedTime(e.value);
                                            if (e.value) {
                                                const hours = String(e.value.getHours()).padStart(2, '0');
                                                const minutes = String(e.value.getMinutes()).padStart(2, '0');
                                                setData('reservation_time', `${hours}:${minutes}`);
                                            } else {
                                                setData('reservation_time', '');
                                            }
                                        }}
                                        timeOnly
                                        hourFormat="24"
                                        className="w-full"
                                        inputClassName="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
                                        placeholder="Select reservation time"
                                        inline
                                        required
                                    />
                                    {errors.reservation_time && <p className="mt-1 text-sm text-red-600">{errors.reservation_time}</p>}
                                </div>

                                {/* Number of Guests Field */}
                                <div>
                                    <label htmlFor="guest_count" className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Guests *
                                    </label>
                                    <select
                                        id="guest_count"
                                        value={data.guest_count}
                                        onChange={e => setData('guest_count', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
                                        required
                                    >
                                        <option value="">Select number of guests</option>
                                        <option value="1">1 Guest</option>
                                        <option value="2">2 Guests</option>
                                        <option value="3">3 Guests</option>
                                        <option value="4">4 Guests</option>
                                        <option value="5">5 Guests</option>
                                        <option value="6">6 Guests</option>
                                        <option value="7">7 Guests</option>
                                        <option value="8">8+ Guests</option>
                                    </select>
                                    {errors.guest_count && <p className="mt-1 text-sm text-red-600">{errors.guest_count}</p>}
                                </div>

                                {/* Table Selection Field */}
                                <div>
                                    <label htmlFor="tables" className="block text-sm font-medium text-gray-700 mb-2">
                                        Select Tables *
                                    </label>
                                    <MultiSelect
                                        id="tables"
                                        value={selectedTables}
                                        options={availableTables}
                                        onChange={(e) => {
                                            setSelectedTables(e.value);
                                            setData('tables', e.value.map(table => table.id));
                                        }}
                                        optionLabel="label"
                                        placeholder="Select available tables"
                                        className="w-full"
                                        panelClassName="w-full"
                                        maxSelectedLabels={3}
                                        selectedItemsLabel="{0} tables selected"
                                        disabled={!data.reservation_date || !data.reservation_time || !data.guest_count}
                                        required
                                    />
                                    {availableTables.length === 0 && data.reservation_date && data.reservation_time && data.guest_count && (
                                        <p className="mt-1 text-sm text-orange-600">No tables available for the selected date and time.</p>
                                    )}
                                    {errors.tables && <p className="mt-1 text-sm text-red-600">{errors.tables}</p>}
                                </div>

                                {/* Special Requests Field */}
                                <div>
                                    <label htmlFor="special_requests" className="block text-sm font-medium text-gray-700 mb-2">
                                        Special Requests
                                    </label>
                                    <textarea
                                        id="special_requests"
                                        value={data.special_requests}
                                        onChange={e => setData('special_requests', e.target.value)}
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-white"
                                        placeholder="Enter any special requests or notes (optional)"
                                    ></textarea>
                                    {errors.special_requests && <p className="mt-1 text-sm text-red-600">{errors.special_requests}</p>}
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Submitting...' : 'Reserve Now'}
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
