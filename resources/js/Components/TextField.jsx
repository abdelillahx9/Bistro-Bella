import React from 'react';

export default function TextField({
    label,
    name,
    value,
    onChange,
    placeholder = "",
    type = "text",
    required = false,
    error = null,
    disabled = false,
    suffix = null
}) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium font-sans text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`block w-full px-3 py-2 border ${
                        error ? 'border-red-300' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-sans text-[14px] ${
                        disabled ? 'bg-gray-50 text-gray-500' : 'bg-white'
                    } ${suffix ? 'pr-8' : ''}`}
                />
                {suffix && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500 text-sm">{suffix}</span>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
