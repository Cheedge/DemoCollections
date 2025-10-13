import React from 'react';
import BlogLink from './BlogLink';
import { Shield } from 'lucide-react';
const OAuthTemplate = () => {
    const blogTitle = 'oauth';
    const blogUrl = '';
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
                <h4 className="text-xl font-bold text-indigo-900">OAuth 2.0</h4>
            </div>
            <p className="text-indigo-800 text-sm mb-5">
                Delegated authorization framework enabling third-party access
                without sharing credentials.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 flex-grow">
                <div className="flex flex-col gap-2 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                            1
                        </div>
                        <div className="flex-1 bg-blue-50 border border-blue-300 rounded p-2">
                            User → Auth Server
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                            2
                        </div>
                        <div className="flex-1 bg-purple-50 border border-purple-300 rounded p-2">
                            Auth Code → Client
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                            3
                        </div>
                        <div className="flex-1 bg-green-50 border border-green-300 rounded p-2">
                            Access Token → App
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                            4
                        </div>
                        <div className="flex-1 bg-orange-50 border border-orange-300 rounded p-2">
                            Access Protected Resources
                        </div>
                    </div>
                </div>
            </div>
            {blogTitle && <BlogLink title={blogTitle} url={blogUrl} />}
        </div>
    );
};

export default OAuthTemplate;
