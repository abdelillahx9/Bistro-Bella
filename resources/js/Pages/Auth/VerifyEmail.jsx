import PrimaryButton from '@/Components/PrimaryButton';
import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <PublicLayout>
            <Head title="Email Verification" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Email Verification</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you?
                        </p>
                    </div>

                    <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
                        <div className="space-y-6">
                            {status === 'verification-link-sent' && (
                                <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-md">
                                    A new verification link has been sent to the email address you provided during registration.
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <div className="flex items-center justify-between">
                                    <PrimaryButton disabled={processing}>
                                        Resend Verification Email
                                    </PrimaryButton>

                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Log Out
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
