import React from 'react';
import { CalendarFold } from 'lucide-react';
import BlogLink from './BlogLink';

const EventDrivenTemplate = () => {
    const blogsData = [
        {
            title: 'A simple but practical demo of web api',
            url: 'https://dev.to/cheedge_lee/a-simple-but-practical-demo-of-web-api-in-c-13ad',
        },
    ];
    return (
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border border-violet-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <CalendarFold className="w-6 h-6 text-violet-600" />
                <h4 className="text-xl font-bold text-violet-900">
                    Event-Driven Design
                </h4>
            </div>
            <p className="text-violet-800 text-sm mb-5">
                Decouple components through events, enabling reactive, scalable,
                and loosely-coupled systems.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 flex-grow">
                <div className="flex items-center justify-around">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-blue-100 border-2 border-blue-400 rounded-full flex items-center justify-center mb-2">
                            <span className="text-blue-700 font-bold text-xs">
                                Service A
                            </span>
                        </div>
                        <div className="text-xs text-gray-600">Emits Event</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-2xl text-violet-400 mb-1">⚡</div>
                        <div className="text-xs text-violet-600 font-semibold">
                            Event Bus
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="w-16 h-16 bg-green-100 border-2 border-green-400 rounded-full flex items-center justify-center">
                            <span className="text-green-700 font-bold text-xs">
                                B
                            </span>
                        </div>
                        <div className="w-16 h-16 bg-yellow-100 border-2 border-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-yellow-700 font-bold text-xs">
                                C
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <BlogLink blogs={blogsData} />
        </div>
    );
};

export default EventDrivenTemplate;
