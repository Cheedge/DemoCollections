import React from 'react';
import BlogLink from './BlogLink';
import { Github } from 'lucide-react';

const GithubActionTemplate = () => {
    const blogsData = [
        {
            title: 'Creating an AWS CI Pipeline: Demo and Instructions',
            url: 'https://notes-renovation.hashnode.dev/creating-an-aws-ci-pipeline-demo-and-instructions',
        },
        {
            title: 'How to Build a Basic CI/CD Pipeline Using AWS Tools',
            url: 'https://notes-renovation.hashnode.dev/how-to-build-a-basic-cicd-pipeline-using-aws-tools',
        },
    ];
    return (
        <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-6 border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <Github className="w-6 h-6 text-slate-700" />
                <h4 className="text-xl font-bold text-slate-900">
                    GitHub Actions
                </h4>
            </div>
            <p className="text-slate-800 text-sm mb-5">
                Automate CI/CD workflows with triggers, jobs, and steps for
                build, test, and deployment pipelines.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 flex-grow">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 border-2 border-purple-400 rounded flex items-center justify-center">
                            <span className="text-purple-700 font-bold text-xs">
                                1
                            </span>
                        </div>
                        <div className="flex-1 bg-purple-50 border border-purple-300 rounded p-2 text-xs">
                            <span className="font-semibold text-purple-900">
                                Trigger:
                            </span>
                            <span className="text-purple-700 ml-1">
                                Push / PR
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 border-2 border-blue-400 rounded flex items-center justify-center">
                            <span className="text-blue-700 font-bold text-xs">
                                2
                            </span>
                        </div>
                        <div className="flex-1 bg-blue-50 border border-blue-300 rounded p-2 text-xs">
                            <span className="font-semibold text-blue-900">
                                Build:
                            </span>
                            <span className="text-blue-700 ml-1">
                                Compile & Test
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 border-2 border-orange-400 rounded flex items-center justify-center">
                            <span className="text-orange-700 font-bold text-xs">
                                3
                            </span>
                        </div>
                        <div className="flex-1 bg-orange-50 border border-orange-300 rounded p-2 text-xs">
                            <span className="font-semibold text-orange-900">
                                Deploy:
                            </span>
                            <span className="text-orange-700 ml-1">
                                Docker / Cloud
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 border-2 border-green-400 rounded flex items-center justify-center">
                            <span className="text-green-700 font-bold text-xs">
                                ✓
                            </span>
                        </div>
                        <div className="flex-1 bg-green-50 border border-green-300 rounded p-2 text-xs">
                            <span className="font-semibold text-green-900">
                                Success
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <BlogLink blogs={blogsData} />
        </div>
    );
};

export default GithubActionTemplate;
