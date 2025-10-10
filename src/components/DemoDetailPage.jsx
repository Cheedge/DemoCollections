import React, { useState } from 'react';
import getTabDefinitions from './TabDefinitions';
import { Home } from 'lucide-react';
import ApiPlaygroundTab from './specializedTabs/ApiPlaygroundTab';
import ArchitectureTab from './specializedTabs/ArchitectureTab';
import CodeTab from './specializedTabs/CodeTab';
import InteractiveTab from './specializedTabs/InteractiveTab';
import VisualizationTab from './specializedTabs/VisualizationTab';
import ComparisonTab from './specializedTabs/ComparisonTab';
import MessageFlowTab from './specializedTabs/MessageFlowTab';
import PerformanceTab from './specializedTabs/PerformanceTab';
import MessagingSystemsTab from './specializedTabs/MessagingSystemsTab';
import ExpressionTreeTab from './specializedTabs/ExpressionTreeTab';
// import {
//     ApiPlaygroundTab,
//     ArchitectureTab,
//     CodeTab,
//     InteractiveTab,
//     VisualizationTab,
//     ComparisonTab,
//     MessageFlowTab,
//     PerformanceTab,
// } from './SpeciallizedTab';

const DemoDetailPage = ({ demo, onBack, getDemoConfig }) => {
    const config = getDemoConfig(demo.id);
    const [activeTab, setActiveTab] = useState(config.tabs[0]);

    const tabDefinitions = getTabDefinitions();
    const tabs = config.tabs
        .map((tabId) => tabDefinitions[tabId])
        .filter(Boolean);

    return (
        <div className="container mx-auto px-6 py-8">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
            >
                <Home size={18} /> Back to Home
            </button>

            <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm mb-6">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    {demo.name}
                </h1>
                <div className="flex flex-wrap gap-2">
                    {demo.tech.map((t, i) => (
                        <span
                            key={i}
                            className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <div className="flex gap-4 border-b border-orange-200 overflow-x-auto bg-white/40 rounded-t-lg">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 font-medium transition whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'text-orange-600 border-b-2 border-orange-600'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dynamic tab content rendering */}
            {activeTab === 'playground' && (
                <ApiPlaygroundTab demoId={demo.id} demoPath={demo.path} />
            )}
            {activeTab === 'architecture' && (
                <ArchitectureTab demoId={demo.id} />
            )}
            {activeTab === 'code' && <CodeTab demoId={demo.id} />}
            {activeTab === 'interactive' && (
                <InteractiveTab demoId={demo.id} demoPath={demo.path} />
            )}
            {activeTab === 'visualization' && <VisualizationTab />}
            {activeTab === 'comparison' && <ExpressionTreeTab />}
            {activeTab === 'flow' && <MessageFlowTab />}
            {activeTab === 'performance' && <PerformanceTab />}
        </div>
    );
};

export default DemoDetailPage;
