import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const ApiPlaygroundTab = () => (
    <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
            API Playground
        </h3>
        <p className="text-gray-600">Test API endpoints here</p>
    </div>
);

const ArchitectureTab = () => (
    <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Architecture Overview
        </h3>
        <pre className="text-xs text-gray-700 bg-gray-100 rounded p-4">
            {`┌─────────────┐
│   Frontend  │
└──────┬──────┘
       │
┌──────▼──────┐
│     API     │
└──────┬──────┘
       │
┌──────▼──────┐
│  Database   │
└─────────────┘`}
        </pre>
    </div>
);

const CodeTab = () => (
    <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Implementation Code
        </h3>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300">
                {`public async Task<IActionResult> GetProducts()
{
    var products = await _repository.GetAllAsync();
    return Ok(products);
}`}
            </pre>
        </div>
    </div>
);

const InteractiveTab = () => (
    <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Interactive Demo
        </h3>
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded">
            Try Interactive Feature
        </button>
    </div>
);

const VisualizationTab = () => {
    const [metrics, setMetrics] = useState({
        requests: 0,
        cache: 0,
        response: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setMetrics({
                requests: Math.floor(Math.random() * 1000) + 500,
                cache: Math.floor(Math.random() * 30) + 70,
                response: Math.floor(Math.random() * 50) + 10,
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Real-Time Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-300">
                    <p className="text-blue-600 text-sm mb-2">
                        Requests/Second
                    </p>
                    <p className="text-3xl font-bold text-blue-800">
                        {metrics.requests}
                    </p>
                </div>
                <div className="bg-green-50 rounded-lg p-6 border border-green-300">
                    <p className="text-green-600 text-sm mb-2">
                        Cache Hit Rate
                    </p>
                    <p className="text-3xl font-bold text-green-800">
                        {metrics.cache}%
                    </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-300">
                    <p className="text-purple-600 text-sm mb-2">
                        Response Time
                    </p>
                    <p className="text-3xl font-bold text-purple-800">
                        {metrics.response}ms
                    </p>
                </div>
            </div>
        </div>
    );
};

const ComparisonTab = () => (
    <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Security Comparison
        </h3>
        <div className="space-y-4">
            {['SQL Injection', 'XSS Attacks', 'CSRF'].map((item) => (
                <div
                    key={item}
                    className="bg-white rounded-lg border border-gray-200 p-4"
                >
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-800">{item}</h4>
                        <span className="flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded text-sm">
                            <CheckCircle size={14} /> Protected
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const MessageFlowTab = () => {
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        setMessages([
            ...messages,
            { id: Date.now(), text: `Message ${messages.length + 1}` },
        ]);
    };

    return (
        <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Message Flow Simulation
            </h3>
            <button
                onClick={sendMessage}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded mb-4"
            >
                Send Message
            </button>
            <div className="space-y-2">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className="bg-orange-50 rounded p-3 border border-orange-300 animate-pulse"
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

const PerformanceTab = () => (
    <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Performance Metrics
        </h3>
        <p className="text-gray-600">Detailed performance analysis</p>
    </div>
);

export {
    ApiPlaygroundTab,
    ArchitectureTab,
    CodeTab,
    InteractiveTab,
    VisualizationTab,
    ComparisonTab,
    MessageFlowTab,
    PerformanceTab,
};
