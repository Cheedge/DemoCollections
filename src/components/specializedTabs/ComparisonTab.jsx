import React from 'react';
import { CheckCircle } from 'lucide-react';

const ComparisonTab = ({ demo }) => {
    return (
        <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Security Comparison
            </h3>
            <div className="space-y-4">
                {/* {['SQL Injection', 'XSS Attacks', 'CSRF'].map((item) => ( */}
                {demo.tech.map((item) => (
                    <div
                        key={item}
                        className="bg-white rounded-lg border border-gray-200 p-4"
                    >
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-800">
                                {item}
                            </h4>
                            <span className="flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded text-sm">
                                <CheckCircle size={14} /> Protected
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ComparisonTab;
