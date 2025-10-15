import React from 'react';
import { Code } from 'lucide-react';
import DefaultSample from './CodeExamples/DefaultSample';
import ExpressionSample from './CodeExamples/ExpressionSample';
import CsrfCodeSample from './CodeExamples/CsrfCodeSample';
import MassTransitCodeSample from './CodeExamples/MassTransitCodeSample';
import GithubActionSample from './CodeExamples/GithubActionSample';
import MultiThreadingSample from './CodeExamples/MultiThreadingSample';
import GcSample from './CodeExamples/GcSample';
import MvcSample from './CodeExamples/MvcSample';
import UnitTestSample from './CodeExamples/UnitTestSample';
import EfSample from './CodeExamples/EfSample';
import EsSample from './CodeExamples/EsSample';
import EventDrivenSample from './CodeExamples/EventDrivenSample';
import AwsPipelineSample from './CodeExamples/AwsPipelineSample';

const codeSamples = {
    default: DefaultSample,
    // oauth: OAuthSample,
    // jwt: JwtSample,
    // 'event-sourcing': EventSourcingSample,
    'expression-tree': ExpressionSample,
    csrf: CsrfCodeSample,
    rabbitmq: MassTransitCodeSample,
    'github-actions': GithubActionSample,
    multithreading: MultiThreadingSample,
    gc: GcSample,
    mvc: MvcSample,
    'unit-test': UnitTestSample,
    'ef-core': EfSample,
    'event-sourcing': EsSample,
    'event-driven': EventDrivenSample,
    'aws-pipeline': AwsPipelineSample,
};

const CodeTab = ({ demoId }) => {
    const SelectedSample = codeSamples[demoId] || DefaultSample;

    // return (
    //     <div className="space-y-6">
    //         <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
    //             <h4 className="text-lg font-semibold text-gray-800 mb-4">
    //                 Example
    //             </h4>
    //             <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
    //                 <pre className="text-sm text-gray-300">
    //                     {/* <DefaultSample /> */}
    //                     <SelectedSample />
    //                 </pre>
    //             </div>
    //         </div>

    //         {/* <div className="bg-amber-50 border border-amber-300 rounded-lg p-6">
    //             <h4 className="text-lg font-semibold text-amber-800 mb-4">
    //                 Database Options Comparison
    //             </h4>
    //             <div className="overflow-x-auto">
    //                 <table className="w-full text-sm">
    //                     <thead className="bg-amber-100">
    //                         <tr>
    //                             <th className="text-left p-2 text-amber-900">
    //                                 Option
    //                             </th>
    //                             <th className="text-left p-2 text-amber-900">
    //                                 Free Tier
    //                             </th>
    //                             <th className="text-left p-2 text-amber-900">
    //                                 Best For
    //                             </th>
    //                         </tr>
    //                     </thead>
    //                     <tbody className="text-amber-900">
    //                         <tr className="border-t border-amber-200">
    //                             <td className="p-2 font-medium">DynamoDB</td>
    //                             <td className="p-2">25GB, 25 RCU/WCU</td>
    //                             <td className="p-2">
    //                                 NoSQL, serverless ⭐ Recommended
    //                             </td>
    //                         </tr>
    //                         <tr className="border-t border-amber-200">
    //                             <td className="p-2 font-medium">
    //                                 MongoDB Atlas
    //                             </td>
    //                             <td className="p-2">512MB forever free</td>
    //                             <td className="p-2">Document DB, easy setup</td>
    //                         </tr>
    //                         <tr className="border-t border-amber-200">
    //                             <td className="p-2 font-medium">
    //                                 SQLite on Lambda
    //                             </td>
    //                             <td className="p-2">Free (in /tmp)</td>
    //                             <td className="p-2">Simple demos only</td>
    //                         </tr>
    //                         <tr className="border-t border-amber-200">
    //                             <td className="p-2 font-medium">Supabase</td>
    //                             <td className="p-2">500MB PostgreSQL</td>
    //                             <td className="p-2">Relational + realtime</td>
    //                         </tr>
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div> */}

    //         <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
    //             <h4 className="text-lg font-semibold text-blue-800 mb-3">
    //                 View Full Source Code
    //             </h4>
    //             <p className="text-blue-700 mb-4">
    //                 Complete implementation with deployment scripts available on
    //                 GitHub
    //             </p>
    //             <a
    //                 href="https://github.com/Cheedge/DemoCollections"
    //                 className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition"
    //             >
    //                 <Code size={18} />
    //                 View on GitHub
    //             </a>
    //         </div>
    //     </div>
    // );
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
                        Code Examples
                    </h1>
                    <p className="text-gray-600">
                        Basic implementations for explaination
                    </p>
                </div>

                {/* Example Code */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg shadow-md">
                            <Code className="text-white" size={24} />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-800">
                            Example
                        </h4>
                    </div>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 overflow-x-auto shadow-xl border border-gray-700">
                        <pre className="text-sm text-gray-300 font-mono leading-relaxed">
                            <SelectedSample />
                        </pre>
                    </div>
                </div>

                {/* GitHub Link */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500 rounded-lg shadow-md">
                            <Code className="text-white" size={24} />
                        </div>
                        <h4 className="text-2xl font-bold text-blue-800">
                            View Full Source Code
                        </h4>
                    </div>
                    <p className="text-blue-700 mb-6 leading-relaxed text-lg">
                        Complete implementation with deployment scripts
                        available on GitHub
                    </p>
                    <a
                        href="https://github.com/Cheedge/DemoCollections"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <Code size={20} />
                        <span>View on GitHub</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CodeTab;
