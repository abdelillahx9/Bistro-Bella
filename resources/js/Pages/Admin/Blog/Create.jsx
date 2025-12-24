import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ categories, tags }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        excerpt: '',
        content: '',
        featured_image: null,
        author: '',
        blog_category_id: '',
        status: 'draft',
        published_at: '',
        seo_title: '',
        seo_description: '',
        tags: []
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('featured_image', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleTagChange = (tagId) => {
        const currentTags = data.tags || [];
        if (currentTags.includes(tagId)) {
            setData('tags', currentTags.filter(id => id !== tagId));
        } else {
            setData('tags', [...currentTags, tagId]);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.blog.store'));
    };

    return (
        <AdminLayout>
            <Head title="Create Blog Post - Admin" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Create New Blog Post</h1>
                                <Link
                                    href={route('admin.blog.index')}
                                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg"
                                >
                                    Back to Blog Posts
                                </Link>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                {/* Basic Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            required
                                        />
                                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Author *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.author}
                                            onChange={(e) => setData('author', e.target.value)}
                                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            required
                                        />
                                        {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Excerpt * (Max 500 characters)
                                    </label>
                                    <textarea
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                        rows={3}
                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        maxLength={500}
                                        required
                                    />
                                    <p className="mt-1 text-sm text-gray-500">{(data.excerpt || '').length}/500 characters</p>
                                    {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Content *
                                    </label>
                                    <textarea
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        rows={10}
                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        placeholder="Write your blog post content here..."
                                        required
                                    />
                                    {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                                </div>

                                {/* Featured Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Featured Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    />
                                    {imagePreview && (
                                        <div className="mt-2">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="max-w-xs h-auto rounded-lg shadow-sm"
                                            />
                                        </div>
                                    )}
                                    {errors.featured_image && <p className="mt-1 text-sm text-red-600">{errors.featured_image}</p>}
                                </div>

                                {/* Category and Status */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            value={data.blog_category_id}
                                            onChange={(e) => setData('blog_category_id', e.target.value)}
                                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            required
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.blog_category_id && <p className="mt-1 text-sm text-red-600">{errors.blog_category_id}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status *
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            required
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                                    </div>
                                </div>

                                {/* Publish Date */}
                                {data.status === 'published' && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Publish Date & Time
                                        </label>
                                        <input
                                            type="datetime-local"
                                            value={data.published_at}
                                            onChange={(e) => setData('published_at', e.target.value)}
                                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        />
                                        {errors.published_at && <p className="mt-1 text-sm text-red-600">{errors.published_at}</p>}
                                    </div>
                                )}

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tags
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {tags.map((tag) => (
                                            <label key={tag.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.tags?.includes(tag.id) || false}
                                                    onChange={() => handleTagChange(tag.id)}
                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">{tag.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
                                </div>

                                {/* SEO Fields */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                SEO Title (Max 60 characters)
                                            </label>
                                            <input
                                                type="text"
                                                value={data.seo_title}
                                                onChange={(e) => setData('seo_title', e.target.value)}
                                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                maxLength={60}
                                            />
                                            <p className="mt-1 text-sm text-gray-500">{(data.seo_title || '').length}/60 characters</p>
                                            {errors.seo_title && <p className="mt-1 text-sm text-red-600">{errors.seo_title}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                SEO Description (Max 160 characters)
                                            </label>
                                            <textarea
                                                value={data.seo_description}
                                                onChange={(e) => setData('seo_description', e.target.value)}
                                                rows={2}
                                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                maxLength={160}
                                            />
                                            <p className="mt-1 text-sm text-gray-500">{(data.seo_description || '').length}/160 characters</p>
                                            {errors.seo_description && <p className="mt-1 text-sm text-red-600">{errors.seo_description}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex justify-end space-x-3 pt-6 border-t">
                                    <Link
                                        href={route('admin.blog.index')}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
                                    >
                                        {processing ? 'Creating...' : 'Create Post'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}