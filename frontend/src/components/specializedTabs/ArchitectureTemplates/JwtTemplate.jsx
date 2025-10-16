import React from 'react';
import BlogLink from './BlogLink';
import { Key } from 'lucide-react';

export const JwtArchitectureAbstract = () => (
    <p className="text-gray-600 mb-6">
        This demo explains how JWT (JSON Web Tokens) work in a React SPA with a
        .NET backend: token structure, authentication flow, storage strategies,
        and security best practices for access and refresh tokens.
    </p>
);

export const JwtArchitectureDescription = () => (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-green-800 mb-4">
            What is a JWT?
        </h4>

        <div className="space-y-3 text-sm text-green-900 mb-4">
            <div className="flex items-start gap-3">
                <span className="font-bold">Definition:</span>
                <span>
                    JWT (JSON Web Token) is a compact, URL-safe token format
                    used to securely transmit information between parties as a
                    JSON object. It's digitally signed, so it can be verified
                    and trusted.
                </span>
            </div>

            <div className="flex items-start gap-3">
                <span className="font-bold">Structure:</span>
                <span>
                    A JWT consists of three parts separated by dots (.):
                    <strong> Header.Payload.Signature</strong>
                </span>
            </div>

            <div className="flex items-start gap-3">
                <span className="font-bold">Purpose:</span>
                <span>
                    JWTs are commonly used for authentication and authorization.
                    Once a user logs in, each subsequent request includes the
                    JWT, allowing the user to access protected resources.
                </span>
            </div>
        </div>

        <h4 className="text-lg font-semibold text-green-800 mb-4">
            Access Token vs Refresh Token
        </h4>

        <div className="space-y-3 text-sm text-green-900">
            <div className="flex items-start gap-3">
                <span className="font-bold">Access Token:</span>
                <span>
                    Short-lived (5-15 minutes), sent with every API request in
                    the Authorization header. Contains user claims and
                    permissions. **Store in memory** to avoid XSS attacks.
                </span>
            </div>

            <div className="flex items-start gap-3">
                <span className="font-bold">Refresh Token:</span>
                <span>
                    Long-lived (days/weeks), used only to obtain new access
                    tokens when they expire. **Store in HttpOnly cookie** to
                    protect from XSS, but remember to implement CSRF protection.
                </span>
            </div>

            <div className="flex items-start gap-3">
                <span className="font-bold">Why both?</span>
                <span>
                    This dual-token approach balances security and usability: if
                    an access token is compromised, it expires quickly; refresh
                    tokens are better protected and rarely transmitted.
                </span>
            </div>
        </div>
    </div>
);

const JwtTemplate = () => {
    const blogsData = [];
    return (
        <div className="bg-gray-100 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">
                JWT Structure Breakdown
            </h4>
            <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap mb-6">
                {`┌─────────────────────────────────────────────────────────────┐
│ JWT Token: xxxxx.yyyyy.zzzzz                                │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  HEADER (Base64Url encoded)                                  │
│  {                                                            │
│    "alg": "HS256",        // Signing algorithm               │
│    "typ": "JWT"           // Token type                      │
│  }                                                            │
│                                                               │
│  ─────────────────────────────────────────────────           │
│                                                               │
│  PAYLOAD (Base64Url encoded)                                 │
│  {                                                            │
│    "sub": "user123",      // Subject (user ID)               │
│    "name": "John Doe",    // Custom claims                   │
│    "role": "admin",       // User role                       │
│    "iat": 1516239022,     // Issued at (timestamp)           │
│    "exp": 1516242622      // Expiration (timestamp)          │
│  }                                                            │
│                                                               │
│  ─────────────────────────────────────────────────           │
│                                                               │
│  SIGNATURE (crypto hash)                                     │
│  HMACSHA256(                                                 │
│    base64UrlEncode(header) + "." +                           │
│    base64UrlEncode(payload),                                 │
│    secret_key                                                │
│  )                                                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘`}
            </pre>

            <h4 className="text-sm font-semibold text-gray-800 mb-3">
                Authentication Flow with JWT
            </h4>
            <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap mb-6">
                {`┌──────────────────────┐
│  User Login Request  │
│  (username/password) │
└──────────┬───────────┘
           │ 1) POST /api/auth/login
           ▼
┌──────────────────────────────────────────────────────────┐
│ .NET Backend                                             │
│ - Validate credentials                                   │
│ - Generate Access Token (JWT, expires in 15 min)        │
│ - Generate Refresh Token (random string, expires 7 days)│
│ - Store refresh token in database (with user ID)        │
│ - Return: { accessToken: "...", user: {...} }           │
│ - Set HttpOnly cookie: refreshToken=xyz789               │
└──────────┬───────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│ React Frontend                                           │
│ - Store accessToken in memory (React state/context)     │
│ - Browser automatically stores refreshToken cookie      │
└──────────┬───────────────────────────────────────────────┘
           │
           │ 2) API Request with JWT
           ▼
┌──────────────────────────────────────────────────────────┐
│ Frontend sends:                                          │
│   GET /api/protected-resource                            │
│   Headers: {                                             │
│     Authorization: "Bearer <accessToken>"                │
│   }                                                      │
│   Credentials: include (to send cookies)                │
└──────────┬───────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│ .NET Backend                                             │
│ - Extract JWT from Authorization header                 │
│ - Validate signature using secret key                   │
│ - Check expiration time                                 │
│ - Extract user claims (sub, role, etc.)                 │
│ - Process request if valid                              │
│ - Return 401 if invalid/expired                         │
└──────────┬───────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│ If Access Token Expired (401 response):                 │
│                                                          │
│ 3) Frontend automatically calls:                        │
│    POST /api/auth/refresh                               │
│    - Sends refreshToken cookie automatically            │
│                                                          │
│ 4) Backend:                                             │
│    - Validates refresh token from cookie               │
│    - Checks if token exists in database                │
│    - Generates new access token                        │
│    - Returns: { accessToken: "new..." }                │
│    - (Optionally rotates refresh token)                │
│                                                          │
│ 5) Frontend:                                            │
│    - Updates access token in memory                    │
│    - Retries original request with new token           │
└─────────────────────────────────────────────────────────┘`}
            </pre>

            <div className="mt-6 space-y-4">
                <h4 className="text-sm font-semibold text-gray-800">
                    JWT Security Best Practices
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li>
                        <strong>Short expiration for access tokens:</strong>{' '}
                        Keep them under 15 minutes to limit damage if
                        compromised.
                    </li>
                    <li>
                        <strong>Store access tokens in memory:</strong> Use
                        React state/context, never localStorage (vulnerable to
                        XSS).
                    </li>
                    <li>
                        <strong>
                            Use HttpOnly cookies for refresh tokens:
                        </strong>{' '}
                        JavaScript cannot access them, protecting against XSS.
                    </li>
                    <li>
                        <strong>Implement token rotation:</strong> Issue a new
                        refresh token each time one is used, invalidate the old
                        one.
                    </li>
                    <li>
                        <strong>Use strong signing algorithms:</strong> RS256
                        (asymmetric) is preferred over HS256 for production.
                    </li>
                    <li>
                        <strong>Add CSRF protection:</strong> Protect refresh
                        token endpoints since they use cookies.
                    </li>
                    <li>
                        <strong>Whitelist token claims:</strong> Only include
                        necessary information in the payload (avoid sensitive
                        data).
                    </li>
                    <li>
                        <strong>Implement token revocation:</strong> Maintain a
                        blacklist or store token versions for critical
                        operations.
                    </li>
                </ul>

                <h4 className="text-sm font-semibold text-gray-800">
                    Storage Strategy Comparison
                </h4>
                <div className="text-sm text-gray-700 space-y-2">
                    <div className="bg-white rounded p-3 border border-gray-200">
                        <strong>✅ Recommended: Dual Token Strategy</strong>
                        <p className="mt-1">
                            • Access token in memory (expires fast, sent in
                            header)
                            <br />
                            • Refresh token in HttpOnly cookie (long-lived, CSRF
                            protected)
                            <br />• Best balance of security and usability
                        </p>
                    </div>
                    <div className="bg-white rounded p-3 border border-gray-200">
                        <strong>⚠️ Acceptable: Token in localStorage</strong>
                        <p className="mt-1">
                            • Vulnerable to XSS attacks
                            <br />
                            • Persistent across page reloads
                            <br />• Use only if you have strong XSS protections
                        </p>
                    </div>
                    <div className="bg-white rounded p-3 border border-gray-200">
                        <strong>
                            ❌ Not Recommended: Token in regular cookie
                        </strong>
                        <p className="mt-1">
                            • Vulnerable to CSRF if not properly protected
                            <br />
                            • Can be read by JavaScript (not HttpOnly)
                            <br />• Combines worst of both approaches
                        </p>
                    </div>
                </div>

                <h4 className="text-sm font-semibold text-gray-800">
                    Common JWT Pitfalls
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li>
                        <strong>Storing sensitive data in payload:</strong> JWTs
                        are Base64 encoded, not encrypted. Anyone can decode
                        them.
                    </li>
                    <li>
                        <strong>Not validating signature:</strong> Always verify
                        the token hasn't been tampered with.
                    </li>
                    <li>
                        <strong>Long-lived access tokens:</strong> Increases
                        risk window if token is compromised.
                    </li>
                    <li>
                        <strong>No token refresh mechanism:</strong> Forces
                        users to re-login frequently, poor UX.
                    </li>
                    <li>
                        <strong>Ignoring the "none" algorithm:</strong> Some JWT
                        libraries accept unsigned tokens if alg is set to
                        "none".
                    </li>
                </ul>
            </div>
        </div>
    );
};

// const JwtTemplate = () => {
//     const blogTitle = 'jwt';
//     const blogUrl = '';
//     return (
//         <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-6 border border-sky-200 shadow-sm h-full flex flex-col">
//             <div className="flex items-center gap-3 mb-4">
//                 <Key className="w-6 h-6 text-sky-600" />
//                 <h4 className="text-xl font-bold text-sky-900">
//                     JWT (JSON Web Token)
//                 </h4>
//             </div>
//             <p className="text-sky-800 text-sm mb-5">
//                 Stateless authentication using signed tokens containing user
//                 claims for secure API authorization.
//             </p>
//             <div className="bg-white rounded-lg p-4 mb-4 font-mono text-xs flex-grow">
//                 <div className="space-y-3">
//                     <div className="bg-red-100 border border-red-300 rounded p-2 text-red-800">
//                         <span className="font-semibold">Header:</span> {'{'}{' '}
//                         alg, typ {'}'}
//                     </div>
//                     <div className="bg-purple-100 border border-purple-300 rounded p-2 text-purple-800">
//                         <span className="font-semibold">Payload:</span> {'{'}{' '}
//                         userId, roles, exp {'}'}
//                     </div>
//                     <div className="bg-blue-100 border border-blue-300 rounded p-2 text-blue-800">
//                         <span className="font-semibold">Signature:</span>{' '}
//                         HMACSHA256(...)
//                     </div>
//                 </div>
//                 <div className="mt-3 text-center text-gray-500 text-xs">
//                     Header.Payload.Signature
//                 </div>
//             </div>
//             {blogTitle && <BlogLink title={blogTitle} url={blogUrl} />}
//         </div>
//     );
// };

export default JwtTemplate;
