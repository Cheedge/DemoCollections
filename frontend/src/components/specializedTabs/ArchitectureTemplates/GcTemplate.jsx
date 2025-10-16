import React from 'react';
import { Trash2 } from 'lucide-react';
import BlogLink from './BlogLink';

const GcTemplate = () => {
    const blogsData = [
        {
            title: 'Garbage Collection',
            url: 'https://cheedge-csharp.hashnode.space/default-guide/clr/gc',
        },
    ];
    return (
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <Trash2 className="w-6 h-6 text-amber-600" />
                <h4 className="text-xl font-bold text-amber-900">
                    Garbage Collection
                </h4>
            </div>
            <p className="text-amber-800 text-sm mb-5">
                Automatic memory management with generational collection for
                efficient allocation and cleanup.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 flex-grow">
                <div className="flex items-center justify-center gap-4">
                    <div className="text-center flex-1">
                        <div className="w-full h-16 bg-green-200 border-2 border-green-400 rounded-lg flex items-center justify-center mb-2">
                            <div className="text-green-800 font-bold text-xs">
                                Gen 0
                            </div>
                        </div>
                        <div className="text-xs text-gray-600">Short-lived</div>
                    </div>
                    <div className="text-xl text-gray-400">→</div>
                    <div className="text-center flex-1">
                        <div className="w-full h-16 bg-yellow-200 border-2 border-yellow-400 rounded-lg flex items-center justify-center mb-2">
                            <div className="text-yellow-800 font-bold text-xs">
                                Gen 1
                            </div>
                        </div>
                        <div className="text-xs text-gray-600">
                            Medium-lived
                        </div>
                    </div>
                    <div className="text-xl text-gray-400">→</div>
                    <div className="text-center flex-1">
                        <div className="w-full h-16 bg-red-200 border-2 border-red-400 rounded-lg flex items-center justify-center mb-2">
                            <div className="text-red-800 font-bold text-xs">
                                Gen 2
                            </div>
                        </div>
                        <div className="text-xs text-gray-600">Long-lived</div>
                    </div>
                </div>
                <div className="mt-3 text-xs text-center text-gray-500">
                    Objects promoted based on survival across collections
                </div>
            </div>
            <BlogLink blogs={blogsData} />
        </div>
    );
};

export default GcTemplate;
