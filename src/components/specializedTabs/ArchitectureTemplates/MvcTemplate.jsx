import React from 'react';
import BlogLink from './BlogLink';
import { Layers } from 'lucide-react';

const MvcTemplate = () => {
    const blogTitle = 'MVC to WebAPI';
    const blogUrl =
        'https://cheedge-csharp.hashnode.space/default-guide/mvc/mvc-to-webapi';
    return (
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <Layers className="w-6 h-6 text-pink-600" />
                <h4 className="text-xl font-bold text-pink-900">MVC Pattern</h4>
            </div>
            <p className="text-pink-800 text-sm mb-5">
                Separate concerns into Model (data), View (UI), and Controller
                (logic) for maintainable web apps.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 flex-grow">
                <div className="flex flex-col gap-3">
                    <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-3 text-center">
                        <div className="text-blue-900 font-bold text-sm">
                            Model
                        </div>
                        <div className="text-xs text-blue-700 mt-1">
                            Data & Business Logic
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-2xl text-gray-400">↕</div>
                    </div>
                    <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-3 text-center">
                        <div className="text-purple-900 font-bold text-sm">
                            Controller
                        </div>
                        <div className="text-xs text-purple-700 mt-1">
                            Request Handler
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-2xl text-gray-400">↕</div>
                    </div>
                    <div className="bg-green-100 border-2 border-green-400 rounded-lg p-3 text-center">
                        <div className="text-green-900 font-bold text-sm">
                            View
                        </div>
                        <div className="text-xs text-green-700 mt-1">
                            User Interface
                        </div>
                    </div>
                </div>
            </div>
            {blogTitle && <BlogLink title={blogTitle} url={blogUrl} />}
        </div>
    );
};

export default MvcTemplate;
