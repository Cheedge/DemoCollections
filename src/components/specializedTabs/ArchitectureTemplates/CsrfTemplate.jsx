import React from 'react';

export const CsrfArchitectureAbstract = () => (
    <p className="text-gray-600 mb-6">
        This implementation shows the CSRF workflow
    </p>
);

export const CsrfArchitectureDescription = () => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-4">
            CSRF Attack
        </h4>
        <div className="space-y-3 text-sm text-blue-900">
            <div className="flex items-start gap-3">
                <span className="font-bold">Key Point:</span>
                <span>
                    Attacker can utilize browser sent session to fake submission
                </span>
            </div>
        </div>
        <h4 className="text-lg font-semibold text-blue-800 mb-4">
            CSRF and JWT
        </h4>
        <div className="space-y-3 text-sm text-blue-900">
            <div className="flex items-start gap-3">
                <span className="font-bold">Key Point:</span>
                <span>JWT token will </span>
            </div>
            <div className="flex items-start gap-3">
                <span className="font-bold">API:</span>
                <span>AWS Lambda + API Gateway (.NET 8 minimal API)</span>
            </div>
        </div>
    </div>
);

const CsrfTemplate = () => {
    return (
        <div className="bg-gray-100 rounded-lg p-6">
            <pre className="text-xs text-gray-700 overflow-x-auto">
                {`┌───────────────────────────┐
│ React Frontend (localhost)│
└────────────┬──────────────┘
             │ GET /api/CsrfDemo/token
             │  → Server issues token
             │  ← Set-Cookie: XSRF-TOKEN=abc123
             ▼
┌───────────────────────────┐
│ Browser Cookies Store     │
│ XSRF-TOKEN (HttpOnly=false) │
└────────────┬──────────────┘
             │
             │ POST /api/CsrfDemo/secure-action
             │ Headers:
             │   X-XSRF-TOKEN: abc123
             │ Cookie:
             │   XSRF-TOKEN=abc123
             ▼
┌───────────────────────────┐
│ .NET 8 Web API Backend    │
│ ValidateRequestAsync()    │
│ - Compare header & cookie │
│ - Verify signature        │
│ - Reject if mismatch      │
└────────────┬──────────────┘
             │
             ▼
┌───────────────────────────┐
│ Response: Validated       │
│ { "message": "OK" }       │
└───────────────────────────┘`}
            </pre>
        </div>
    );
};

export default CsrfTemplate;
