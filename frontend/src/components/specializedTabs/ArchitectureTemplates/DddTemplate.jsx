import React from 'react';
import { Layers } from 'lucide-react';
import BlogLink from './BlogLink';

const DddTemplate = () => {
    const blogsData = [
        {
            title: 'A simple but practical demo of Web Api in C#',
            url: 'https://dev.to/cheedge_lee/a-simple-but-practical-demo-of-web-api-in-c-13ad',
        },
    ];
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <Layers className="w-6 h-6 text-blue-600" />
                <h4 className="text-xl font-bold text-blue-900">
                    Domain-Driven Design
                </h4>
            </div>
            <p className="text-blue-800 text-sm mb-5">
                Organize complex business logic into bounded contexts with clear
                domain models, entities, and aggregates.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 font-mono text-xs flex-grow">
                <div className="text-indigo-900 font-semibold mb-2">
                    📁 Project Structure
                </div>
                <div className="space-y-1 text-gray-700">
                    <div>
                        ├──{' '}
                        <span className="text-blue-600 font-semibold">
                            Domain/
                        </span>
                    </div>
                    <div>│ ├── Entities/</div>
                    <div>│ ├── ValueObjects/</div>
                    <div>│ ├── Aggregates/</div>
                    <div>│ └── Interfaces/</div>
                    <div>
                        ├──{' '}
                        <span className="text-purple-600 font-semibold">
                            Application/
                        </span>
                    </div>
                    <div>│ ├── Services/</div>
                    <div>│ └── DTOs/</div>
                    <div>
                        ├──{' '}
                        <span className="text-green-600 font-semibold">
                            Infrastructure/
                        </span>
                    </div>
                    <div>│ ├── Persistence/</div>
                    <div>│ └── Repositories/</div>
                    <div>
                        └──{' '}
                        <span className="text-orange-600 font-semibold">
                            Presentation/
                        </span>
                    </div>
                    <div> └── Controllers/</div>
                </div>
            </div>
            <BlogLink blogs={blogsData} />
        </div>
    );
};

export default DddTemplate;
