import React from 'react';
import { Database, Code } from 'lucide-react';
import BlogLink from './BlogLink';

const XSS = () => (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200 shadow-sm h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
            <Code className="w-6 h-6 text-red-600" />
            <h4 className="text-xl font-bold text-red-900">XSS (Frontend)</h4>
        </div>
        <p className="text-red-800 text-sm mb-5">
            Prevent Cross-Site Scripting by sanitizing input, encoding output,
            and using Content Security Policy.
        </p>
        <div className="bg-white rounded-lg p-4 mb-4 font-mono text-xs flex-grow">
            <div className="space-y-3">
                <div>
                    <div className="text-red-600 font-semibold mb-1">
                        ❌ Vulnerable
                    </div>
                    <div className="bg-red-50 border border-red-300 rounded p-2 text-red-700">
                        innerHTML = userInput
                    </div>
                </div>
                <div>
                    <div className="text-green-600 font-semibold mb-1">
                        ✅ Safe
                    </div>
                    <div className="bg-green-50 border border-green-300 rounded p-2 text-green-700">
                        textContent = sanitize(input)
                    </div>
                </div>
                <div className="text-center text-gray-500 pt-2 border-t">
                    + CSP Headers
                </div>
            </div>
        </div>
    </div>
);

const SQLInjection = () => (
    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200 shadow-sm h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-yellow-600" />
            <h4 className="text-xl font-bold text-yellow-900">
                SQL Injection (Backend)
            </h4>
        </div>
        <p className="text-yellow-800 text-sm mb-5">
            Protect databases using parameterized queries, ORM frameworks(EF),
            and input validation.
        </p>
        <div className="bg-white rounded-lg p-4 mb-4 font-mono text-xs flex-grow">
            <div className="space-y-3">
                <div>
                    <div className="text-red-600 font-semibold mb-1">
                        ❌ Vulnerable
                    </div>
                    <div className="bg-red-50 border border-red-300 rounded p-2 text-red-700 break-all">
                        $"SELECT * FROM users WHERE id={'{'}id{'}'}"
                    </div>
                </div>
                <div>
                    <div className="text-green-600 font-semibold mb-1">
                        ✅ Safe
                    </div>
                    <div className="bg-green-50 border border-green-300 rounded p-2 text-green-700 break-all">
                        @"SELECT * FROM users WHERE id=@id"
                    </div>
                </div>
                <div className="text-center text-gray-500 pt-2 border-t">
                    Use EF Core / Dapper
                </div>
            </div>
        </div>
        {/* {blogTitle && <BlogLink title={blogTitle} url={blogUrl} />} */}
    </div>
);

const XssSqlInjectionTemplate = () => {
    const blogsData = [{ title: '', url: '' }];
    return (
        <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-xl p-6 border border-blue-200 shadow-sm h-full flex flex-col">
            <div className="space-y-3 mb-6">
                <XSS />
            </div>
            <div className="space-y-3 mb-6">
                <SQLInjection />
            </div>
            <BlogLink blogs={blogsData} />
        </div>
    );
};

export default XssSqlInjectionTemplate;
