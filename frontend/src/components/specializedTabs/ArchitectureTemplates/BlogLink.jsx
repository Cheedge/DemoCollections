import React from 'react';
import { Album } from 'lucide-react';

const BlogLink = ({ title, url }) => (
    // <div>
    //     <Album className="w-6 h-6 text-orange-600" />
    //     <h4 className="text-2xl font-bold text-emerald-900">Read More:</h4>
    //     <a
    //         href={url}
    //         className="block mt-4 pt-4 border-t border-gray-200 text-xl font-medium text-blue-500 hover:text-blue-800 hover:underline transition-colors"
    //     >
    //         {title}
    //     </a>
    // </div>
    <div className="bg-gradient-to-br from-green-50 to-indigo-50 border-2 border-green-300 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500 rounded-lg shadow-md">
                <Album className="text-white" size={24} />
            </div>
            <h4 className="text-xl font-bold text-blue-800">Read More:</h4>
        </div>
        {/* <p className="text-blue-700 mb-6 leading-relaxed text-lg">
            Complete implementation with deployment scripts available on GitHub
        </p> */}
        <a
            href={url}
            // className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            className="block mt-4 pt-4 border-t border-gray-200 text-xl font-medium text-blue-500 hover:text-blue-800 hover:underline transition-colors"
        >
            {/* <Album size={20} /> */}
            <span>{title}</span>
            {/* {title} */}
        </a>
    </div>
);

export default BlogLink;
