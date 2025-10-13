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

const DemoDetailPage = ({ demo, onBack, getDemoConfig }) => {
    const config = getDemoConfig(demo.id);
    const [activeTab, setActiveTab] = useState(config.tabs[0]);

    const tabDefinitions = getTabDefinitions();
    const tabs = config.tabs
        .map((tabId) => tabDefinitions[tabId])
        .filter(Boolean);

    return (
        <div className="container mx-auto px-6 py-10">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-10 transition-all font-semibold px-5 py-3 rounded-xl hover:bg-orange-50 group shadow-sm hover:shadow-md"
            >
                <Home
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                />
                Back to Home
            </button>

            <div className="bg-gradient-to-br from-white to-orange-50/30 backdrop-blur-md rounded-3xl p-12 border-2 border-orange-200 shadow-xl mb-10">
                <h1 className="text-4xl font-bold mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-gray-800 via-orange-700 to-amber-700 bg-clip-text text-transparent">
                        {demo.name}
                    </span>
                </h1>
                <div className="flex flex-wrap gap-3">
                    {demo.tech.map((t, i) => (
                        <span
                            key={i}
                            className="bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-5 py-2.5 rounded-full text-sm font-bold border-2 border-orange-300 shadow-md hover:shadow-lg transition-shadow"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <div className="flex gap-3 border-b-2 border-orange-200 overflow-x-auto bg-white/60 backdrop-blur-md rounded-t-2xl px-6 shadow-lg">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2.5 px-7 py-5 font-bold transition-all whitespace-nowrap rounded-t-xl relative ${
                                activeTab === tab.id
                                    ? 'text-orange-600 bg-gradient-to-b from-white to-orange-50/50 -mb-0.5 shadow-lg scale-105'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-orange-50/50 hover:scale-102'
                            }`}
                        >
                            <tab.icon
                                size={22}
                                className={
                                    activeTab === tab.id
                                        ? 'text-orange-500'
                                        : ''
                                }
                            />
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-t-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-gradient-to-br from-white to-orange-90/30 backdrop-blur-md rounded-2xl border-2 border-orange-200 shadow-xl p-8 min-h-[400px]">
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
                {activeTab === 'comparison' && <ComparisonTab demo={demo} />}
                {activeTab === 'flow' && <MessageFlowTab />}
                {activeTab === 'message' && <MessagingSystemsTab />}
                {activeTab === 'performance' && <PerformanceTab />}
                {activeTab === 'pattern' && <ExpressionTreeTab />}
            </div>
        </div>
    );
};

export default DemoDetailPage;
