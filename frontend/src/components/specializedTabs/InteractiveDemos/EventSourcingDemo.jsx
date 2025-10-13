import React, { useState, useEffect } from 'react';
import { CalendarRange } from 'lucide-react';

const EventSourcingDemo = () => {
    const [events, setEvents] = useState([
        {
            id: 1,
            type: 'OrderCreated',
            data: { orderId: 'ORD-001', total: 99.99 },
        },
        {
            id: 2,
            type: 'PaymentReceived',
            data: { orderId: 'ORD-001', amount: 99.99 },
        },
    ]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl mb-4 shadow-lg">
                        <CalendarRange className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Event Stream
                    </h1>
                    <p className="text-gray-600">Event Stream Visualization</p>
                </div>
                <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
                    {/* <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                        Event Stream Visualization
                    </h3> */}
                    <div className="space-y-3">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-orange-50 rounded-lg p-4 border border-orange-300"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-orange-700 font-medium">
                                        {event.type}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        Event #{event.id}
                                    </span>
                                </div>
                                <pre className="text-xs text-gray-700">
                                    {JSON.stringify(event.data, null, 2)}
                                </pre>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventSourcingDemo;
