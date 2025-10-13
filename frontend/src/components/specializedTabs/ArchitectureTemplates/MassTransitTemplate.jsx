import React from 'react';
import { MessageSquare } from 'lucide-react';
import BlogLink from './BlogLink';

export const MassTransitRabbitMQAbstract = () => (
    <p className="text-gray-600 mb-6">
        This architecture demonstrates a real-world message-driven workflow
        using <span className="font-semibold text-orange-700">MassTransit</span>{' '}
        and <span className="font-semibold text-orange-700">RabbitMQ</span> in a{' '}
        <span className="font-semibold text-gray-800">.NET backend</span>. It
        shows how a web API publishes messages to a queue, which are then
        processed by background consumers asynchronously.
    </p>
);

export const MassTransitRabbitMQDescription = () => (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-orange-800 mb-4">
            Recommended Architecture: MassTransit + RabbitMQ
        </h4>
        <div className="space-y-3 text-sm text-orange-900">
            <div className="flex items-start gap-3">
                <span className="font-bold">Frontend:</span>
                <span>
                    React application — triggers API calls (e.g., send email or
                    notification) via HTTP.
                </span>
            </div>

            <div className="flex items-start gap-3">
                <span className="font-bold">Backend (Publisher):</span>
                <span>
                    .NET 8 Web API using{' '}
                    <span className="font-semibold">MassTransit</span> to
                    publish messages to RabbitMQ queues asynchronously.
                </span>
            </div>

            <div className="flex items-start gap-3">
                <span className="font-bold">Message Broker:</span>
                <span>
                    RabbitMQ — manages message routing, persistence, and
                    reliability. Can be hosted locally (Docker) or on a separate
                    VM.
                </span>
            </div>

            <div className="flex items-start gap-3">
                <span className="font-bold">Backend (Consumer):</span>
                <span>
                    MassTransit consumer hosted in the same service or as a
                    background worker. It receives queued messages and executes
                    business logic (e.g., sending emails, processing payments,
                    etc.).
                </span>
            </div>

            <div className="flex items-start gap-3">
                <span className="font-bold">Database (optional):</span>
                <span>
                    SQL Server or PostgreSQL — used by the consumer or API for
                    persistence and message logging.
                </span>
            </div>
        </div>
    </div>
);

// const MassTransitRabbitMQTemplate = () => (
//     <div className="bg-gray-100 rounded-lg p-6">
//         <pre className="text-xs text-gray-700 overflow-x-auto leading-5">
//             {`┌───────────────┐
// │   React App   │  ➜  Calls /send-email API
// └──────┬────────┘
//        │ HTTP (POST)
//        ▼
// ┌────────────────────┐
// │ .NET 8 Web API     │  Publishes message via MassTransit
// │ Publisher Service  │
// └──────┬─────────────┘
//        │
//        ▼
// ┌────────────────────┐
// │   RabbitMQ Broker  │  Stores queued messages
// │ (exchange + queue) │
// └──────┬─────────────┘
//        │
//        ▼
// ┌────────────────────┐
// │   MassTransit      │  Background Worker (Consumer)
// │   Consumer Logic   │  e.g., Send Email or Notification
// └──────┬─────────────┘
//        │
//        ▼
// ┌────────────────────┐
// │  Database / Logs   │  Optional persistence
// └────────────────────┘`}
//         </pre>
//     </div>
// );

const MassTransitRabbitMQTemplate = () => {
    const blogTitle = 'masstransit';
    const blogUrl = '';
    return (
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-6 h-6 text-orange-600" />
                <h4 className="text-xl font-bold text-orange-900">
                    MassTransit + RabbitMQ
                </h4>
            </div>
            <p className="text-orange-800 text-sm mb-5">
                Message-driven architecture with async messaging,
                publish/subscribe, and background processing.
            </p>
            <div className="bg-white rounded-lg p-4 mb-4 font-mono text-xs flex-grow">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-full bg-blue-100 border border-blue-300 rounded p-2 text-center text-blue-900 font-semibold">
                        React → API
                    </div>
                    <div className="text-blue-400">↓</div>
                    <div className="w-full bg-purple-100 border border-purple-300 rounded p-2 text-center text-purple-900 font-semibold">
                        MassTransit Publisher
                    </div>
                    <div className="text-purple-400">↓</div>
                    <div className="w-full bg-orange-100 border border-orange-300 rounded p-2 text-center text-orange-900 font-semibold">
                        RabbitMQ Queue
                    </div>
                    <div className="text-orange-400">↓</div>
                    <div className="w-full bg-green-100 border border-green-300 rounded p-2 text-center text-green-900 font-semibold">
                        Consumer Worker
                    </div>
                </div>
            </div>
            {blogTitle && <BlogLink title={blogTitle} url={blogUrl} />}
        </div>
    );
};

export default MassTransitRabbitMQTemplate;
