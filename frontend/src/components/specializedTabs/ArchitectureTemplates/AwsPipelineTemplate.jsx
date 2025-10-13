import React from 'react';
import BlogLink from './BlogLink';
import { Cloud } from 'lucide-react';

const AwsPipelineTemplate = () => {
    const blogTitle = 'Simple Demo for AWS CICD Pipeline';
    const blogUrl =
        'https://dev.to/cheedge_lee/simple-demo-for-aws-cicd-pipeline-2m0c';
    return (
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <Cloud className="w-6 h-6 text-orange-600" />
                <h4 className="text-xl font-bold text-orange-900">
                    AWS Pipeline
                </h4>
            </div>
            <p className="text-orange-800 text-sm mb-5">
                End-to-end deployment using CodePipeline, CodeBuild, and
                CodeDeploy for automated AWS deployments.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 flex-grow font-mono text-xs">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-full bg-gray-100 border border-gray-300 rounded p-2 text-center text-gray-900 font-semibold">
                        CodeCommit / GitHub
                    </div>
                    <div className="text-orange-400 text-lg">↓</div>
                    <div className="w-full bg-blue-100 border border-blue-300 rounded p-2 text-center text-blue-900 font-semibold">
                        CodePipeline
                    </div>
                    <div className="text-blue-400 text-lg">↓</div>
                    <div className="w-full bg-purple-100 border border-purple-300 rounded p-2 text-center text-purple-900 font-semibold">
                        CodeBuild
                    </div>
                    <div className="text-purple-400 text-lg">↓</div>
                    <div className="w-full bg-green-100 border border-green-300 rounded p-2 text-center text-green-900 font-semibold">
                        CodeDeploy → EC2/ECS
                    </div>
                </div>
            </div>
            {blogTitle && <BlogLink title={blogTitle} url={blogUrl} />}
        </div>
    );
};

export default AwsPipelineTemplate;
