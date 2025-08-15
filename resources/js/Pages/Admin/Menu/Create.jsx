import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import TextField from '@/Components/TextField';
import { useState, useRef } from 'react';

export default function MenuCreate({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        name: '',
        slug: '',
        description: '',
        price: '',
        image: null,
        is_vegetarian: false,
        is_gluten_free: false,
        is_available: true,
    });

    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setData('image', file);
            const reader = new FileReader();
            reader.onload = (e) => setPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function openFileDialog() {
        fileInputRef.current?.click();
    }

    function submit(e) {
        e.preventDefault();
        post(route('admin.menu.store'), {
            forceFormData: true,
        });
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-bold leading-tight text-gray-800">Menu Management</h2>}>
            <Head title="Add Menu Item" />

            <div className="min-h-screen bg-gray-50 p-6">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol className="inline-flex items-center space-x-1 md:space-x-3">
                            <li className="inline-flex items-center">
                                <Link
                                    href={route('admin.menu.index')}
                                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                                >
                                    Menus
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">Add Menu Item</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Form */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Name Field */}
                        <TextField
                            label="Name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter menu item name"
                            required
                            error={errors.name}
                        />

                        {/* Slug Field */}
                        <TextField
                            label="Slug (optional)"
                            name="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            placeholder="auto-generated from name if empty"
                            error={errors.slug}
                        />

                        {/* Category Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className={`block w-full px-3 py-2 border ${
                                    errors.category_id ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-sans text-[14px] bg-white`}
                            >
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                            )}
                        </div>

                        {/* Price Field */}
                        <TextField
                            label="Price"
                            name="price"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                            required
                            suffix="$"
                            error={errors.price}
                        />

                        {/* Description Field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Enter menu item description"
                                rows={4}
                                className={`block w-full px-3 py-2 border ${
                                    errors.description ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-sans text-[14px] bg-white`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium font-sans text-gray-700 mb-2">
                                Image
                            </label>
                            <div
                                className={`border-2 border-dashed rounded-lg p-12 text-center bg-gray-50 transition-colors ${
                                    preview ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                                }`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                {preview ? (
                                    <div className="space-y-4">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="mx-auto h-32 w-32 object-cover rounded-lg border border-gray-300"
                                        />
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600">Image selected</p>
                                            <button
                                                type="button"
                                                onClick={openFileDialog}
                                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                Change Image
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Image</h3>
                                        <p className="text-sm text-gray-500 mb-4">Click or drag an image to upload</p>
                                        <button
                                            type="button"
                                            onClick={openFileDialog}
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Upload
                                        </button>
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                            )}
                        </div>

                        {/* Checkboxes */}
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <input
                                    id="is_vegetarian"
                                    type="checkbox"
                                    checked={data.is_vegetarian}
                                    onChange={(e) => setData('is_vegetarian', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_vegetarian" className="ml-2 block text-sm font-medium text-gray-700">
                                    Vegetarian
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="is_gluten_free"
                                    type="checkbox"
                                    checked={data.is_gluten_free}
                                    onChange={(e) => setData('is_gluten_free', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_gluten_free" className="ml-2 block text-sm font-medium text-gray-700">
                                    Gluten-free
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="is_available"
                                    type="checkbox"
                                    checked={data.is_available}
                                    onChange={(e) => setData('is_available', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_available" className="ml-2 block text-sm font-medium text-gray-700">
                                    Available
                                </label>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-6">
                            <Link
                                href={route('admin.menu.index')}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
