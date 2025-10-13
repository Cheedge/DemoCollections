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
        <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Backend Engineering{' '}
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    Showcase
                </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Interactive demonstrations of architecture patterns, APIs,
                security, messaging, cloud services by .NET/C# or Python
            </p>
        </div>

        {demoCategories.map((category) => (
            <div
                key={category.id}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-orange-200 shadow-lg hover:shadow-xl transition-shadow mb-8"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-3 rounded-xl shadow-md">
                        <category.icon className="text-white" size={28} />
                    </div>
                    {category.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                className={`bg-white rounded-xl p-6 border-2 border-orange-100 transition-all shadow-md ${
                                    demo.status === 'live'
                                        ? 'hover:border-orange-400 cursor-pointer hover:shadow-xl hover:-translate-y-1'
                                        : 'opacity-60'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-2 flex-1">
                                        <h3 className="text-gray-800 font-bold text-lg">
                                            {demo.name}
                                        </h3>
                                        {isPremium && !isUnlocked && (
                                            <Lock
                                                className="text-orange-500 flex-shrink-0"
                                                size={18}
                                            />
                                        )}
                                        {isPremium && isUnlocked && (
                                            <LockOpen
                                                className="text-green-600 flex-shrink-0"
                                                size={18}
                                            />
                                        )}
                                    </div>
                                    {demo.status === 'live' ? (
                                        <span className="flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-3 py-1.5 rounded-full shadow-sm">
                                            <CheckCircle size={14} /> Live
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-200 px-3 py-1.5 rounded-full">
                                            <BookmarkMinus size={14} />
                                            Wait
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {demo.tech.map((t, i) => (
                                        <span
                                            key={i}
                                            className="text-xs font-medium bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 px-3 py-1.5 rounded-full border border-orange-200"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-orange-100">
                                    <div className="flex items-center text-orange-600 text-sm font-semibold gap-1 hover:gap-2 transition-all">
                                        View Demo <ChevronRight size={18} />
                                    </div>
                                    {isPremium && !isUnlocked && (
                                        <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
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
