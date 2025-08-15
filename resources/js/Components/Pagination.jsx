import { Link } from '@inertiajs/react';
import React from 'react';

export default function Pagination({ links, current_page, last_page }) {
    const getPageNumbers = () => {
        const pages = [];
        const maxPages = 5;
        let start = Math.max(1, current_page - Math.floor(maxPages / 2));
        let end = Math.min(last_page, start + maxPages - 1);

        if (end - start + 1 < maxPages) {
            start = Math.max(1, end - maxPages + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-6">
            {/* Previous button */}
            <Link
                href={links?.find(link => link.label === '&laquo; Previous')?.url || '#'}
                className={`${current_page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:text-gray-700'}`}
                preserveState
                onClick={(e) => { if (current_page === 1) e.preventDefault(); }}
            >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </Link>

            {/* Page numbers */}
            {getPageNumbers().map(page => (
                <Link
                    key={page}
                    href={links?.find(link => link.label === page.toString())?.url || `?page=${page}`}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${page === current_page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border hover:bg-gray-50'
                        }`}
                    preserveState
                >
                    {page}
                </Link>
            ))}

            {/* Next button */}
            <Link
                href={links?.find(link => link.label === 'Next &raquo;')?.url || '#'}
                className={`${current_page === last_page ? 'text-gray-300 cursor-not-allowed' : 'text-black hover:text-gray-700'}`}
                preserveState
                onClick={(e) => { if (current_page === last_page) e.preventDefault(); }}
            >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    );
}
