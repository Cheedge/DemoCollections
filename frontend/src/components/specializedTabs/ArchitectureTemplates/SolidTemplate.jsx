import React from 'react';
import { Box } from 'lucide-react';
import BlogLink from './BlogLink';

const SolidTemplate = () => {
    const blogsData = [
        {
            title: 'SOLID Principles',
            url: 'https://cheedge-csharp.hashnode.space/default-guide/oop/solid',
        },
    ];
    return (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <Box className="w-6 h-6 text-emerald-600" />
                <h4 className="text-xl font-bold text-emerald-900">
                    SOLID Principles
                </h4>
            </div>
            <p className="text-emerald-800 text-sm mb-5">
                Five design principles for maintainable, scalable, and testable
                object-oriented code.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 space-y-3 flex-grow">
                {[
                    {
                        letter: 'S',
                        title: 'Single Responsibility',
                        color: 'bg-red-100 text-red-700 border-red-300',
                    },
                    {
                        letter: 'O',
                        title: 'Open/Closed',
                        color: 'bg-orange-100 text-orange-700 border-orange-300',
                    },
                    {
                        letter: 'L',
                        title: 'Liskov Substitution',
                        color: 'bg-yellow-100 text-yellow-700 border-yellow-300',
                    },
                    {
                        letter: 'I',
                        title: 'Interface Segregation',
                        color: 'bg-green-100 text-green-700 border-green-300',
                    },
                    {
                        letter: 'D',
                        title: 'Dependency Inversion',
                        color: 'bg-blue-100 text-blue-700 border-blue-300',
                    },
                ].map(({ letter, title, color }) => (
                    <div key={letter} className="flex items-center gap-3">
                        <div
                            className={`w-8 h-8 rounded-lg ${color} border flex items-center justify-center font-bold text-sm`}
                        >
                            {letter}
                        </div>
                        <span className="text-sm text-gray-700 font-medium">
                            {title}
                        </span>
                    </div>
                ))}
            </div>
            <BlogLink blogs={blogsData} />
        </div>
    );
};
export default SolidTemplate;
