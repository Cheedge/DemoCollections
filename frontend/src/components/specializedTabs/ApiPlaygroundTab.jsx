import React, { useState, useEffect } from 'react';
import demoConfig from '../DemoConfig';
import {
    Play,
    Terminal,
    CheckCircle,
    XCircle,
    Loader,
    AlertCircle,
} from 'lucide-react';
import config from '../../config';

const ApiPlaygroundTab = ({ demoId, demoPath }) => {
    const [response, setResponse] = useState(null);
    const [isLoading01, setIsLoading01] = useState(false);
    const [isLoading02, setIsLoading02] = useState(false);
    const [error, setError] = useState(null);
    const [apiUrl, setApiUrl] = useState(
        // 'https://localhost:7235'
        // 'http://localhost:5156'
        config.apiUrl
    );

    const callGetApi = async () => {
        setIsLoading01(true);
        setError(null);
        setResponse(null);

        try {
            const res = await fetch(apiUrl + demoPath, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add JWT token if needed:
                    // 'Authorization': 'Bearer your-jwt-token'
                },
            });

            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            const data = await res.json();

            setResponse({
                status: res.status,
                statusText: res.statusText,
                headers: Object.fromEntries(res.headers.entries()),
                data: data,
            });
        } catch (err) {
            console.warn(
                'Backend unavailable — returning fallback data:',
                err.message
            );
            await new Promise((r) => setTimeout(r, 800));
            // Generate a fallback token and default headers
            const randomToken = Math.random().toString(36).substring(2, 15);
            const fallbackHeaders = {
                'Content-Type': 'application/json',
                'X-Fallback': 'true',
                'X-Timestamp': new Date().toISOString(),
            };

            // Create mock fallback data
            const fallbackData = {
                message: 'Backend unreachable — this is fallback data.',
                token: randomToken,
                data: {
                    user: 'Guest',
                    info: 'Demo response generated locally',
                },
            };

            // Set a "fake" response object
            setResponse({
                status: 200,
                statusText: 'OK (fallback)',
                headers: fallbackHeaders,
                data: fallbackData,
            });

            setError(null); // ensure no error UI shows
        } finally {
            setIsLoading01(false);
        }
    };

    const callPostApi = async (bodyText) => {
        // e.preventDefault();
        setIsLoading01(true);
        setError(null);
        setResponse(null);

        try {
            const parsedBody = bodyText ? JSON.parse(bodyText) : {};

            const res = await fetch(apiUrl + demoPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add JWT token if needed:
                    // 'Authorization': 'Bearer your-jwt-token'
                },
                body: JSON.stringify(parsedBody),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.title || 'Login failed');
            }

            const jwtToken = data.token;
            // console.log('Login successful! Token stored:', jwtToken);
            alert('Login Successful!');
            setResponse({
                status: res.status,
                statusText: res.statusText,
                headers: Object.fromEntries(res.headers.entries()),
                data: data,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading01(false);
        }
    };

    const callCsrfDemoApi = async () => {
        setIsLoading02(true);
        setError(null);
        setResponse(null);

        try {
            // 1. Get CSRF token (this will also set the antiforgery cookie)
            const csrfRes = await fetch(`${apiUrl}/api/CsrfDemo/token`, {
                method: 'GET',
                credentials: 'include', // very important for cookie
            });
            const csrfData = await csrfRes.json();
            console.log(csrfData);
            const csrfToken = csrfData.csrfToken;
            console.log(csrfToken);

            // 2. Call secure endpoint with both cookie + header
            const res = await fetch(`${apiUrl}/api/CsrfDemo/secure-action`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken, // required antiforgery header
                },
                credentials: 'include', // sends the cookie
                body: JSON.stringify({ message: 'CSRF test from React' }),
            });

            const data = await res.json();
            if (!res.ok)
                throw new Error(data?.title || 'CSRF validation failed');

            setResponse({
                status: res.status,
                statusText: res.statusText,
                headers: Object.fromEntries(res.headers.entries()),
                data: data,
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading02(false);
        }
    };

    const simulateMockApi = async () => {
        setIsLoading02(true);
        setError(null);
        await new Promise((r) => setTimeout(r, 800));
        setResponse({
            status: 200,
            statusText: 'OK',
            data: {
                products: [
                    { id: 1, name: 'Laptop', price: 999.99 },
                    { id: 2, name: 'Mouse', price: 29.99 },
                ],
                pagination: { page: 1, pageSize: 10, totalCount: 2 },
            },
        });
        setIsLoading02(false);
    };

    return (
        <div className="space-y-6">
            {/* Configuration Panel */}
            <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    AWS Backend Configuration
                </h4>
                <p className="text-sm text-amber-700 mb-3">
                    Update the API URL to point to your AWS Lambda + API Gateway
                    endpoint
                </p>
                <input
                    type="text"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded px-3 py-2 text-sm text-gray-700 mb-2"
                    placeholder="https://your-api-id.execute-api.region.amazonaws.com/stage/endpoint"
                />
                <p className="text-xs text-amber-600">
                    Example:
                    https://abc123.execute-api.us-east-1.amazonaws.com/prod/products
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Endpoints Panel */}
                <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Test Endpoints
                    </h3>

                    <div className="space-y-4">
                        <EndpointCard
                            method={
                                demoConfig[demoId].method === 'Post'
                                    ? 'POST'
                                    : 'GET'
                            }
                            path={demoPath}
                            description="AWS Lambda + Postgres"
                            onTest={
                                demoConfig[demoId].method === 'Post'
                                    ? callPostApi
                                    : callGetApi
                            }
                            isLoading={isLoading01}
                            label="Call Real AWS API"
                            demoId={demoId}
                        />

                        {demoId === 'csrf' && (
                            <EndpointCard
                                method="POST"
                                path="/api/CsrfDemo/secure-action"
                                description="Demonstrate CSRF protection (fetches token + validates)"
                                onTest={callCsrfDemoApi}
                                isLoading={isLoading02}
                                label="Run CSRF Demo"
                                demoId={demoId}
                            />
                        )}

                        <EndpointCard
                            method="GET"
                            path="/api/products (Mock)"
                            description="Test with simulated response"
                            onTest={simulateMockApi}
                            isLoading={isLoading02}
                            label="Test with Mock Data"
                            demoId={demoId}
                        />
                    </div>

                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-blue-800 mb-2">
                            How to connect your AWS backend:
                        </h4>
                        <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                            <li>Deploy .NET API to AWS Lambda</li>
                            <li>Configure API Gateway</li>
                            <li>Enable CORS for your Vercel domain</li>
                            <li>Update the API URL above</li>
                        </ol>
                    </div>
                </div>

                {/* Response Panel */}
                <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Response
                    </h3>

                    {!response && !error && (
                        <div className="text-gray-500 text-center py-12">
                            <Terminal
                                size={48}
                                className="mx-auto mb-4 opacity-50"
                            />
                            <p>Execute an API call to see the response</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <XCircle className="text-red-600" size={20} />
                                <span className="text-red-800 font-medium">
                                    Error
                                </span>
                            </div>
                            <p className="text-sm text-red-700">{error}</p>
                            {/* <p className="text-xs text-red-600 mt-2">
                                Make sure your AWS API is deployed and CORS is
                                enabled
                            </p> */}
                        </div>
                    )}

                    {response && (
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                {response.status === 200 ? (
                                    <>
                                        <CheckCircle
                                            className="text-green-600"
                                            size={20}
                                        />
                                        <span className="text-green-700 font-medium">
                                            {response.status}{' '}
                                            {response.statusText}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle
                                            className="text-red-600"
                                            size={20}
                                        />
                                        <span className="text-red-700 font-medium">
                                            {response.status}{' '}
                                            {response.statusText}
                                        </span>
                                    </>
                                )}
                            </div>

                            <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
                                <pre className="text-sm text-green-400">
                                    {JSON.stringify(response.data, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const EndpointCard = ({
    method,
    path,
    description,
    onTest,
    isLoading,
    label,
    demoId,
}) => {
    const [body, setBody] = useState('');

    return (
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-300">
            <div className="flex items-center gap-3 mb-2">
                <span
                    className={`text-xs font-bold px-2 py-1 rounded ${
                        method === 'GET'
                            ? 'bg-blue-600 text-white'
                            : 'bg-green-600 text-white'
                    }`}
                >
                    {method}
                </span>
                <code className="text-gray-700 text-sm">{path}</code>
            </div>
            <p className="text-gray-600 text-sm mb-3">{description}</p>

            {method === 'POST' && demoId === 'jwt' && (
                <textarea
                    className="w-full border border-gray-300 rounded p-2 text-sm font-mono text-gray-800 mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    rows={4}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder='{"username": "demo", "password": "1234"}'
                />
            )}

            <button
                onClick={() => (method === 'POST' ? onTest(body) : onTest())}
                disabled={isLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {isLoading ? (
                    <Loader className="animate-spin" size={16} />
                ) : (
                    <Play size={16} />
                )}
                {label || 'Try It'}
            </button>
        </div>
    );
};

export default ApiPlaygroundTab;
