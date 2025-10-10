import React, { useState, useEffect } from 'react';

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

export default VisualizationTab;
