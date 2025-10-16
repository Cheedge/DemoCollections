import React from 'react';
import { GitBranch } from 'lucide-react';
import BlogLink from './BlogLink';

const CqrsTemplate = () => {
    const blogsData = [
        {
            title: 'Blog about Handler and Reader/Writer',
            url: 'https://cheedge-csharp.hashnode.space/default-guide/architecture/handlerreaderwriter',
        },
    ];
    return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <GitBranch className="w-6 h-6 text-purple-600" />
                <h4 className="text-xl font-bold text-purple-900">
                    CQRS Pattern
                </h4>
            </div>
            <p className="text-purple-800 text-sm mb-5">
                Separate read and write operations for improved performance,
                scalability, and security.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 flex-grow">
                <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-blue-100 border-2 border-blue-400 rounded-lg flex items-center justify-center mb-2">
                            <div className="text-blue-700 font-bold text-sm">
                                COMMAND
                            </div>
                        </div>
                        <div className="text-xs text-gray-600">Write Model</div>
                        <div className="text-xs text-gray-500">
                            Create, Update, Delete
                        </div>
                    </div>
                    <div className="text-3xl text-gray-400">⇄</div>
                    <div className="text-center">
                        <div className="w-24 h-24 bg-green-100 border-2 border-green-400 rounded-lg flex items-center justify-center mb-2">
                            <div className="text-green-700 font-bold text-sm">
                                QUERY
                            </div>
                        </div>
                        <div className="text-xs text-gray-600">Read Model</div>
                        <div className="text-xs text-gray-500">
                            Optimized for Reads
                        </div>
                    </div>
                </div>
            </div>
            <BlogLink blogs={blogsData} />
        </div>
    );
};

export default CqrsTemplate;
