import React from 'react';
import { Database } from 'lucide-react';
import BlogLink from './BlogLink';

const EfTemplate = () => {
    const blogTitle = 'Entity + AutoMapper + DTO';
    const blogUrl =
        'https://cheedge-csharp.hashnode.space/default-guide/ef/automapper-dto';
    return (
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-cyan-600" />
                <h4 className="text-xl font-bold text-cyan-900">
                    Entity Framework Core
                </h4>
            </div>
            <p className="text-cyan-800 text-sm mb-5">
                Modern ORM with migrations, LINQ queries, and support for SQL
                Server, PostgreSQL, MySQL.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 flex-grow">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-full bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-300 rounded-lg p-3 text-center">
                        <div className="text-sm font-semibold text-blue-900">
                            C# Entities
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                            Domain Models
                        </div>
                    </div>
                    <div className="text-2xl text-blue-400">↓</div>
                    <div className="w-full bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-300 rounded-lg p-3 text-center">
                        <div className="text-sm font-semibold text-purple-900">
                            DbContext + LINQ
                        </div>
                        <div className="text-xs text-purple-600 mt-1">
                            Code-First / Migrations
                        </div>
                    </div>
                    <div className="text-2xl text-purple-400">↓</div>
                    <div className="w-full bg-gradient-to-r from-green-100 to-green-50 border border-green-300 rounded-lg p-3 text-center">
                        <div className="text-sm font-semibold text-green-900">
                            Database
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                            SQL Server / PostgreSQL
                        </div>
                    </div>
                </div>
            </div>
            {blogTitle && <BlogLink title={blogTitle} url={blogUrl} />}
        </div>
    );
};

export default EfTemplate;
