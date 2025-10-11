import React, { useState } from 'react';

export const DefaultArchitectureAbstract = () => (
    <p className="text-gray-600 mb-6">
        This implementation uses AWS serverless architecture for scalability and
        cost-efficiency.
    </p>
);

export const DefaultArchitectureDescription = () => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-4">
            Recommended AWS Architecture
        </h4>
        <div className="space-y-3 text-sm text-blue-900">
            <div className="flex items-start gap-3">
                <span className="font-bold">Frontend:</span>
                <span>React app deployed on Vercel/Netlify</span>
            </div>
            <div className="flex items-start gap-3">
                <span className="font-bold">API:</span>
                <span>AWS Lambda + API Gateway (.NET 8 minimal API)</span>
            </div>
            <div className="flex items-start gap-3">
                <span className="font-bold">Database:</span>
                <span>DynamoDB (25GB free) or MongoDB Atlas (512MB free)</span>
            </div>
            <div className="flex items-start gap-3">
                <span className="font-bold">Auth:</span>
                <span>AWS Cognito (50,000 MAUs free)</span>
            </div>
        </div>
    </div>
);

const DefaultTemplate = () => (
    <div className="bg-gray-100 rounded-lg p-6">
        <pre className="text-xs text-gray-700 overflow-x-auto">
            {`┌─────────────┐
│   Vercel    │ Frontend (React)
│   Netlify   │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────┐
│ API Gateway │ AWS (us-east-1)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Lambda    │ .NET 8 Function
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  DynamoDB   │ NoSQL Database (Free Tier)
└─────────────┘`}
        </pre>
    </div>
);

export default DefaultTemplate;
