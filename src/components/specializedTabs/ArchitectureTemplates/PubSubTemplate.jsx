import React from 'react';
import BlogLink from './BlogLink';
import { Workflow } from 'lucide-react';

const PubSubTemplate = () => {
    const blogTitle = 'Publisher & Subscriber';
    const blogUrl =
        'https://cheedge-csharp.hashnode.space/default-guide/delegate/event';
    return (
        <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <Workflow className="w-6 h-6 text-teal-600" />
                <h4 className="text-xl font-bold text-teal-900">
                    Pub/Sub Pattern
                </h4>
            </div>
            <p className="text-teal-800 text-sm mb-5">
                Decoupled messaging where publishers broadcast events to
                multiple subscribers asynchronously.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 flex-grow">
                <div className="flex items-center justify-center gap-6">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-blue-100 border-2 border-blue-400 rounded-lg flex items-center justify-center mb-2">
                            <span className="text-blue-700 font-bold text-xs">
                                Publisher
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="text-xl text-teal-400">→</div>
                        <div className="text-xs text-teal-600 font-semibold">
                            Topic
                        </div>
                        <div className="text-xl text-teal-400">→</div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="w-16 h-12 bg-green-100 border-2 border-green-400 rounded flex items-center justify-center">
                            <span className="text-green-700 font-bold text-xs">
                                Sub 1
                            </span>
                        </div>
                        <div className="w-16 h-12 bg-purple-100 border-2 border-purple-400 rounded flex items-center justify-center">
                            <span className="text-purple-700 font-bold text-xs">
                                Sub 2
                            </span>
                        </div>
                        <div className="w-16 h-12 bg-orange-100 border-2 border-orange-400 rounded flex items-center justify-center">
                            <span className="text-orange-700 font-bold text-xs">
                                Sub 3
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {blogTitle && <BlogLink title={blogTitle} url={blogUrl} />}
        </div>
    );
};

export default PubSubTemplate;
