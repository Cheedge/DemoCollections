import React from 'react';
import { Album } from 'lucide-react';

const BlogLink = ({ blogs }) => {
    return (
        <div className="bg-gradient-to-br from-green-50 to-indigo-50 border-2 border-green-300 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500 rounded-lg shadow-md">
                    <Album className="text-white" size={24} />
                </div>
                <h4 className="text-xl font-bold text-blue-800">Read More:</h4>
            </div>
            {blogs.map((blog, index) => (
                <a
                    key={index}
                    href={blog.url}
                    className="block mt-4 pt-4 border-t border-gray-200 text-xl font-medium text-blue-500 hover:text-blue-800 hover:underline transition-colors"
                >
                    <span>{blog.title}</span>
                </a>
            ))}
        </div>
    );
};

export default BlogLink;
