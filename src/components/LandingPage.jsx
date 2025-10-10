import React, { useState, useEffect } from 'react';
import {
    CheckCircle,
    ChevronRight,
    Lock,
    LockOpen,
    BookmarkMinus,
} from 'lucide-react';
import demoCategories from './DemoCategories';

const LandingPage = ({ onSelectDemo, getDemoConfig, unlockedDemos }) => (
    <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
                Backend Engineering{' '}
                <span className="text-orange-600">Showcase</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Interactive demonstrations of architecture patterns, APIs,
                security, messaging, cloud services by .NET/C# or Python
            </p>
        </div>

        {demoCategories.map((category) => (
            <div
                key={category.id}
                className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm mb-6"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <category.icon className="text-orange-600" size={28} />
                    {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.cases.map((demo) => {
                        const config = getDemoConfig(demo.id);
                        const isPremium = config.access === 'premium';
                        const isUnlocked = unlockedDemos.has(demo.id);

                        return (
                            <div
                                key={demo.id}
                                onClick={() =>
                                    demo.status === 'live' && onSelectDemo(demo)
                                }
                                // className={`bg-white rounded-lg p-4 border border-orange-200 transition shadow-sm cursor-pointer hover:border-orange-400 hover:shadow-md`}
                                className={`bg-white rounded-lg p-4 border border-orange-200 transition shadow-sm ${
                                    demo.status === 'live'
                                        ? 'hover:border-orange-400 cursor-pointer hover:shadow-md'
                                        : 'opacity-60'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-gray-800 font-semibold">
                                            {demo.name}
                                        </h3>
                                        {isPremium && !isUnlocked && (
                                            <Lock
                                                className="text-orange-500"
                                                size={16}
                                            />
                                        )}
                                        {isPremium && isUnlocked && (
                                            <LockOpen
                                                className="text-green-600"
                                                size={16}
                                            />
                                        )}
                                    </div>
                                    {/* <span className="flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                                        <CheckCircle size={12} /> Live
                                    </span> */}
                                    {demo.status === 'live' ? (
                                        <span className="flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                                            <CheckCircle size={12} /> Live
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-xs text-gray-700 bg-gray-200 px-2 py-1 rounded">
                                            <BookmarkMinus size={12} />
                                            Wait
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-3">
                                    {demo.tech.map((t, i) => (
                                        <span
                                            key={i}
                                            className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-orange-600 text-sm font-medium">
                                        View Demo <ChevronRight size={16} />
                                    </div>
                                    {isPremium && !isUnlocked && (
                                        <span className="text-xs text-orange-600">
                                            Premium
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        ))}
    </div>
);

export default LandingPage;
