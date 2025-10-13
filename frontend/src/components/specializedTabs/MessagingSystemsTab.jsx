import React, { useState, useEffect } from 'react';
import {
    Play,
    Pause,
    RefreshCw,
    Zap,
    CheckCircle,
    Clock,
    AlertCircle,
} from 'lucide-react';

const MessagingSystemsTab = ({ demoId }) => {
    // const [activeSystem, setActiveSystem] = useState(demoId); // 'kafka', 'rabbitmq', 'esb'
    const [activeSystem, setActiveSystem] = useState(demoId || 'kafka');

    const [isRunning, setIsRunning] = useState(false);
    const [messages, setMessages] = useState([]);
    const [stats, setStats] = useState({ sent: 0, processed: 0, failed: 0 });

    // System configurations
    const systems = {
        kafka: {
            name: 'Apache Kafka',
            color: 'blue',
            features: [
                'High throughput',
                'Event streaming',
                'Distributed log',
                'Replay capability',
            ],
            topology: 'Topic → Partitions → Consumer Groups',
            useCase: 'Event sourcing, real-time analytics, log aggregation',
            latency: '5-10ms',
            throughput: '1M+ msg/sec',
        },
        rabbitmq: {
            name: 'RabbitMQ',
            color: 'orange',
            features: [
                'Message queuing',
                'Flexible routing',
                'Priority queues',
                'Dead letter exchanges',
            ],
            topology: 'Exchange → Queues → Consumers',
            useCase: 'Task queues, RPC, complex routing',
            latency: '1-5ms',
            throughput: '20k-50k msg/sec',
        },
        esb: {
            name: 'Enterprise Service Bus',
            color: 'purple',
            features: [
                'Service orchestration',
                'Protocol transformation',
                'Message enrichment',
                'Saga patterns',
            ],
            topology: 'Services → ESB Hub → Services',
            useCase: 'Legacy integration, B2B, microservices orchestration',
            latency: '10-50ms',
            throughput: '5k-10k msg/sec',
        },
        pubsub: {
            name: 'Pub/Sub Pattern (Basic)',
            color: 'green',
            features: [
                'Simple broadcasting',
                'In-memory',
                'Event-driven',
                'Decoupled components',
            ],
            topology: 'Publisher → EventBus → Subscribers',
            useCase: 'UI updates, notification system, simple events',
            latency: '<1ms',
            throughput: '100k+ msg/sec (in-memory)',
        },
    };

    // const currentSystem = systems[activeSystem];
    const currentSystem = systems[activeSystem] || systems.kafka;

    // Simulate message flow
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            const msgId = Date.now();
            const newMsg = {
                id: msgId,
                type: [
                    'OrderCreated',
                    'PaymentProcessed',
                    'InventoryUpdated',
                    'EmailSent',
                ][Math.floor(Math.random() * 4)],
                status: 'sending',
                timestamp: new Date().toISOString(),
                route: getMessageRoute(activeSystem),
            };

            setMessages((prev) => [newMsg, ...prev].slice(0, 10));
            setStats((prev) => ({ ...prev, sent: prev.sent + 1 }));

            // Simulate processing
            setTimeout(() => {
                setMessages((prev) =>
                    prev.map((m) =>
                        m.id === msgId ? { ...m, status: 'processing' } : m
                    )
                );
            }, 500);

            setTimeout(() => {
                const success = Math.random() > 0.1; // 90% success rate
                setMessages((prev) =>
                    prev.map((m) =>
                        m.id === msgId
                            ? { ...m, status: success ? 'completed' : 'failed' }
                            : m
                    )
                );
                setStats((prev) => ({
                    ...prev,
                    processed: success ? prev.processed + 1 : prev.processed,
                    failed: success ? prev.failed : prev.failed + 1,
                }));
            }, 1500);
        }, 2000);

        return () => clearInterval(interval);
    }, [isRunning, activeSystem]);

    const getMessageRoute = (system) => {
        const routes = {
            kafka: [
                'Producer',
                'Topic: orders',
                'Partition 0',
                'Consumer Group A',
            ],
            rabbitmq: [
                'Publisher',
                'Exchange: direct',
                'Queue: order-processing',
                'Consumer',
            ],
            esb: ['Service A', 'ESB Gateway', 'Transformer', 'Service B'],
            pubsub: ['Publisher', 'Event Bus', 'Subscriber 1', 'Subscriber 2'],
        };
        return routes[system] || [];
    };

    const reset = () => {
        setMessages([]);
        setStats({ sent: 0, processed: 0, failed: 0 });
    };

    return (
        <div className="space-y-6">
            {/* System Selector */}
            <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Compare Messaging Systems
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {Object.entries(systems).map(([key, system]) => (
                        <button
                            key={key}
                            onClick={() => {
                                setActiveSystem(key);
                                reset();
                            }}
                            className={`p-4 rounded-lg border-2 transition ${
                                activeSystem === key
                                    ? `border-${system.color}-500 bg-${system.color}-50`
                                    : 'border-gray-300 bg-white hover:border-gray-400'
                            }`}
                        >
                            <div
                                className={`font-semibold text-${system.color}-700 mb-1`}
                            >
                                {system.name}
                            </div>
                            <div className="text-xs text-gray-600">
                                {system.latency} latency
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* System Details */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Control Panel */}
                    <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-800">
                                Live Message Flow
                            </h4>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsRunning(!isRunning)}
                                    className={`px-4 py-2 rounded flex items-center gap-2 transition ${
                                        isRunning
                                            ? 'bg-red-600 hover:bg-red-700 text-white'
                                            : 'bg-green-600 hover:bg-green-700 text-white'
                                    }`}
                                >
                                    {isRunning ? (
                                        <>
                                            <Pause size={16} /> Stop
                                        </>
                                    ) : (
                                        <>
                                            <Play size={16} /> Start
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={reset}
                                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white flex items-center gap-2"
                                >
                                    <RefreshCw size={16} /> Reset
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <div className="text-2xl font-bold text-blue-700">
                                    {stats.sent}
                                </div>
                                <div className="text-sm text-blue-600">
                                    Messages Sent
                                </div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                <div className="text-2xl font-bold text-green-700">
                                    {stats.processed}
                                </div>
                                <div className="text-sm text-green-600">
                                    Processed
                                </div>
                            </div>
                            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                                <div className="text-2xl font-bold text-red-700">
                                    {stats.failed}
                                </div>
                                <div className="text-sm text-red-600">
                                    Failed
                                </div>
                            </div>
                        </div>

                        {/* Message Flow Visualization */}
                        <div className="space-y-3">
                            {messages.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <Zap
                                        size={48}
                                        className="mx-auto mb-4 opacity-30"
                                    />
                                    <p>
                                        Click Start to see messages flowing
                                        through {currentSystem.name}
                                    </p>
                                </div>
                            ) : (
                                messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className="bg-white rounded-lg p-4 border border-gray-300"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-gray-800">
                                                {msg.type}
                                            </span>
                                            <span
                                                className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                                                    msg.status === 'completed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : msg.status ===
                                                          'failed'
                                                        ? 'bg-red-100 text-red-700'
                                                        : msg.status ===
                                                          'processing'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                }`}
                                            >
                                                {msg.status === 'completed' && (
                                                    <CheckCircle size={12} />
                                                )}
                                                {msg.status ===
                                                    'processing' && (
                                                    <Clock size={12} />
                                                )}
                                                {msg.status === 'failed' && (
                                                    <AlertCircle size={12} />
                                                )}
                                                {msg.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            {msg.route.map((step, i) => (
                                                <React.Fragment key={i}>
                                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                                                        {step}
                                                    </span>
                                                    {i <
                                                        msg.route.length -
                                                            1 && <span>→</span>}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* System Info */}
                <div className="space-y-4">
                    <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">
                            {currentSystem.name}
                        </h4>

                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-gray-600 mb-2">
                                    Key Features
                                </div>
                                <div className="space-y-1">
                                    {currentSystem.features.map(
                                        (feature, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2 text-sm text-gray-700"
                                            >
                                                <CheckCircle
                                                    size={14}
                                                    className="text-green-600"
                                                />
                                                {feature}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm font-medium text-gray-600 mb-2">
                                    Topology
                                </div>
                                <div className="bg-gray-100 rounded p-3 text-sm text-gray-700 font-mono">
                                    {currentSystem.topology}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm font-medium text-gray-600 mb-2">
                                    Best Use Case
                                </div>
                                <div className="text-sm text-gray-700">
                                    {currentSystem.useCase}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-blue-50 rounded p-3 border border-blue-200">
                                    <div className="text-xs text-blue-600 mb-1">
                                        Latency
                                    </div>
                                    <div className="text-sm font-semibold text-blue-700">
                                        {currentSystem.latency}
                                    </div>
                                </div>
                                <div className="bg-purple-50 rounded p-3 border border-purple-200">
                                    <div className="text-xs text-purple-600 mb-1">
                                        Throughput
                                    </div>
                                    <div className="text-sm font-semibold text-purple-700">
                                        {currentSystem.throughput}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* .NET Implementation Note */}
                    <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                        <div className="text-sm font-semibold text-amber-800 mb-2">
                            .NET Implementation
                        </div>
                        <div className="text-xs text-amber-700 space-y-1">
                            {activeSystem === 'kafka' && (
                                <p>• Use Confluent.Kafka NuGet</p>
                            )}
                            {activeSystem === 'rabbitmq' && (
                                <p>• Use RabbitMQ.Client or MassTransit</p>
                            )}
                            {activeSystem === 'esb' && (
                                <p>• Use NServiceBus or Rebus</p>
                            )}
                            {activeSystem === 'pubsub' && (
                                <p>• Use MediatR for in-process</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Quick Comparison
                </h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-3 text-gray-700">
                                    Feature
                                </th>
                                <th className="text-left p-3 text-gray-700">
                                    Kafka
                                </th>
                                <th className="text-left p-3 text-gray-700">
                                    RabbitMQ
                                </th>
                                <th className="text-left p-3 text-gray-700">
                                    ESB
                                </th>
                                <th className="text-left p-3 text-gray-700">
                                    Pub/Sub
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            <tr className="border-t">
                                <td className="p-3 font-medium">Durability</td>
                                <td className="p-3">✅ Persistent log</td>
                                <td className="p-3">✅ Configurable</td>
                                <td className="p-3">✅ Persistent</td>
                                <td className="p-3">❌ In-memory</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-3 font-medium">
                                    Message Replay
                                </td>
                                <td className="p-3">✅ Yes</td>
                                <td className="p-3">❌ No</td>
                                <td className="p-3">⚠️ Limited</td>
                                <td className="p-3">❌ No</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-3 font-medium">
                                    Ordering Guarantee
                                </td>
                                <td className="p-3">✅ Per partition</td>
                                <td className="p-3">✅ Per queue</td>
                                <td className="p-3">⚠️ Configurable</td>
                                <td className="p-3">❌ Not guaranteed</td>
                            </tr>
                            <tr className="border-t">
                                <td className="p-3 font-medium">Complexity</td>
                                <td className="p-3">⚠️ High</td>
                                <td className="p-3">✅ Medium</td>
                                <td className="p-3">⚠️ High</td>
                                <td className="p-3">✅ Low</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MessagingSystemsTab;
