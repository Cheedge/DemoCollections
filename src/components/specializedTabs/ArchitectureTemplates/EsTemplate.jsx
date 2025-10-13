import React from 'react';
import BlogLink from './BlogLink';
import { Archive } from 'lucide-react';

const EsTemplate = () => {
    const blogTitle = 'event sourcing';
    const blogUrl =
        'https://dev.to/cheedge_lee/a-simple-but-practical-demo-of-web-api-in-c-13ad';
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <Archive className="w-6 h-6 text-indigo-600" />
                <h4 className="text-xl font-bold text-indigo-900">
                    Event Sourcing
                </h4>
            </div>
            <p className="text-indigo-800 text-sm mb-5">
                Store all state changes as immutable events, enabling full audit
                trail and state reconstruction.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 flex-grow">
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            E1
                        </div>
                        <div className="flex-1 bg-blue-50 border border-blue-300 rounded p-2 text-xs text-blue-900">
                            OrderCreated
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            E2
                        </div>
                        <div className="flex-1 bg-purple-50 border border-purple-300 rounded p-2 text-xs text-purple-900">
                            ItemAdded
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            E3
                        </div>
                        <div className="flex-1 bg-green-50 border border-green-300 rounded p-2 text-xs text-green-900">
                            OrderCompleted
                        </div>
                    </div>
                    <div className="mt-3 pt-3 border-t text-center">
                        <div className="text-xs text-gray-600">
                            Replay events →{' '}
                            <span className="font-semibold text-indigo-700">
                                Current State
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {blogTitle && <BlogLink title={blogTitle} url={blogUrl} />}
        </div>
    );
};

export default EsTemplate;
