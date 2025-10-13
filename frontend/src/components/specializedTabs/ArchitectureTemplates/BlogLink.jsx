import React from 'react';
import { Album } from 'lucide-react';

const BlogLink = ({ title, url }) => (
    <div>
        <Album className="w-6 h-6 text-orange-600" />
        <h4 className="text-2xl font-bold text-emerald-900">Read More:</h4>
        <a
            href={url}
            className="block mt-4 pt-4 border-t border-gray-200 text-xl font-medium text-blue-500 hover:text-blue-800 hover:underline transition-colors"
        >
            {title}
        </a>
    </div>
);

export default BlogLink;
