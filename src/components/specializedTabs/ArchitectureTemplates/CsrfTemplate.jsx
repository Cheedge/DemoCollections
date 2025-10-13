import React from 'react';
import BlogLink from './BlogLink';
import { AlertTriangle } from 'lucide-react';

export const CsrfArchitectureAbstract = () => (
    <p className="text-gray-600 mb-6">
        This demo explains the CSRF protection workflow used by a React SPA and
        a .NET backend: how tokens are issued, how requests are validated, what
        an attacker can and cannot do, and practical defenses you should use in
        production.
    </p>
);

export const CsrfArchitectureDescription = () => (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-4">
            What is a CSRF attack?
        </h4>

        <div className="space-y-3 text-sm text-blue-900 mb-4">
            <div className="flex items-start gap-3">
                <span className="font-bold">Short:</span>
                <span>
                    CSRF (Cross-Site Request Forgery) tricks a user's browser
                    into sending an authenticated request (cookies included) to
                    your site without the user's intent.
                </span>
            </div>

            <div className="flex items-start gap-3">
                <span className="font-bold">Key point:</span>
                <span>
                    The attacker cannot read responses, but can cause
                    state-changing operations if the target site accepts
                    requests authenticated by automatically-sent credentials
                    (cookies).
                </span>
            </div>
        </div>

        <h4 className="text-lg font-semibold text-blue-800 mb-4">
            CSRF and JWT — the relation
        </h4>

        <div className="space-y-3 text-sm text-blue-900">
            <div className="flex items-start gap-3">
                <span className="font-bold">
                    JWT in header (Authorization):
                </span>
                <span>
                    If your SPA stores the JWT in memory or adds it to the
                    `Authorization` header manually, browsers will not
                    automatically send it — **CSRF risk is minimal**. (However,
                    XSS becomes the bigger risk if you store tokens insecurely.)
                </span>
            </div>

            <div className="flex items-start gap-3">
                <span className="font-bold">JWT in cookie (HttpOnly):</span>
                <span>
                    If you place JWTs or refresh tokens in cookies (HttpOnly),
                    the browser will send them automatically — **CSRF applies**
                    and you must protect those endpoints (refresh, logout, state
                    changes) using CSRF defenses.
                </span>
            </div>

            <div className="flex items-start gap-3">
                <span className="font-bold">TL;DR:</span>
                <span>
                    Storing a token in a cookie reintroduces CSRF risk; storing
                    in header avoids CSRF but can expose XSS risks if not stored
                    carefully.
                </span>
            </div>
        </div>
    </div>
);

const CsrfTemplate = () => {
    return (
        <div className="bg-gray-100 rounded-lg p-6">
            <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">
                {`┌───────────────────────────┐
│ React Frontend (localhost)│
└────────────┬──────────────┘
             │ 1) GET /api/CsrfDemo/token
             │    - Server generates token (IAntiforgery)
             │    - Server sets cookie: XSRF-TOKEN=abc123
             │    - Server returns payload { token: "abc123" }
             ▼
┌───────────────────────────┐
│ Browser (cookie storage)  │
│ - XSRF-TOKEN (HttpOnly=false) │
│ - .AspNetCore.Antiforgery.* cookie (encrypted) │
└────────────┬──────────────┘
             │
             │ 2) POST /api/CsrfDemo/secure-action
             │    - Browser automatically sends cookies (credentials: 'include')
             │    - Frontend attaches header: X-XSRF-TOKEN: abc123
             ▼
┌───────────────────────────┐
│ .NET Backend (.NET 8 API) │
│ - IAntiforgery.ValidateRequestAsync(HttpContext) │
│   checks: header token vs. cookie token (decrypted with DataProtection) │
│ - If match & decrypt OK -> process request │
│ - If missing / mismatch / decrypt fail -> reject (400/500) │
└────────────┬──────────────┘
             │
             ▼
┌───────────────────────────┐
│ Response: success / error │
└───────────────────────────┘`}
            </pre>

            <div className="mt-6 space-y-4">
                <h4 className="text-sm font-semibold text-gray-800">
                    Prevention checklist (practical)
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                    <li>
                        <strong>Double-submit / Antiforgery tokens:</strong>{' '}
                        issue token server-side, return it to SPA, send it as
                        header while storing verification token in a cookie.
                    </li>
                    <li>
                        <strong>Cookies:</strong> use{' '}
                        <code>SameSite=Lax|Strict</code>, <code>Secure</code>,
                        and <code>HttpOnly</code>
                        where appropriate. Note: <code>HttpOnly</code> means JS
                        can't read the cookie.
                    </li>
                    <li>
                        <strong>JWT strategy:</strong> put access tokens in
                        memory and send as header; keep refresh tokens in
                        HttpOnly cookies + protect refresh endpoints with CSRF.
                    </li>
                    <li>
                        <strong>CORS + credentials:</strong> only allow trusted
                        origins and enable <code>AllowCredentials()</code>;
                        never use wildcard origin when allowing credentials.
                    </li>
                    <li>
                        <strong>Data protection keys:</strong> persist key ring
                        across restarts (DataProtection) so antiforgery cookies
                        remain decryptable.
                    </li>
                    <li>
                        <strong>Least privilege & rate limits:</strong> minimize
                        stateful endpoints, apply rate limits and monitoring.
                    </li>
                </ul>

                <h4 className="text-sm font-semibold text-gray-800">
                    Extra notes & trade-offs
                </h4>
                <div className="text-sm text-gray-700 space-y-2">
                    <p>
                        + Storing tokens in <code>localStorage</code> avoids
                        CSRF but is vulnerable to XSS. Choose storage based on
                        which threat you can mitigate better.
                    </p>
                    <p>
                        + For maximum safety, combine secure cookies for refresh
                        tokens (HttpOnly + Secure), short-lived access tokens in
                        memory (sent in Authorization header), and CSRF
                        protection on cookie-backed endpoints.
                    </p>
                    <p>
                        + Always rotate and persist your Data Protection keys in
                        production to avoid invalidating tokens after restarts.
                    </p>
                </div>
            </div>
        </div>
    );
};

// const CsrfTemplate = () => {
//     const blogTitle = 'csrf';
//     const blogUrl = '';
//     return (
//         <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl p-6 border border-rose-200 shadow-sm h-full flex flex-col">
//             <div className="flex items-center gap-3 mb-4">
//                 <AlertTriangle className="w-6 h-6 text-rose-600" />
//                 <h4 className="text-xl font-bold text-rose-900">
//                     CSRF Protection
//                 </h4>
//             </div>
//             <p className="text-rose-800 text-sm mb-5">
//                 Prevent Cross-Site Request Forgery attacks using anti-forgery
//                 tokens and SameSite cookies.
//             </p>
//             <div className="bg-white rounded-lg p-4 mb-4 flex-grow">
//                 <div className="space-y-3">
//                     <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 bg-red-100 border-2 border-red-400 rounded-lg flex items-center justify-center">
//                             <span className="text-red-700 text-xl">⚠️</span>
//                         </div>
//                         <div className="flex-1">
//                             <div className="text-xs font-semibold text-gray-700">
//                                 Attack Vector
//                             </div>
//                             <div className="text-xs text-gray-600">
//                                 Malicious site triggers action
//                             </div>
//                         </div>
//                     </div>
//                     <div className="border-t pt-3 flex items-center gap-3">
//                         <div className="w-10 h-10 bg-green-100 border-2 border-green-400 rounded-lg flex items-center justify-center">
//                             <span className="text-green-700 text-xl">✓</span>
//                         </div>
//                         <div className="flex-1">
//                             <div className="text-xs font-semibold text-gray-700">
//                                 Defense
//                             </div>
//                             <div className="text-xs text-gray-600">
//                                 Token validation + SameSite
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {blogTitle && <BlogLink title={blogTitle} url={blogUrl} />}
//         </div>
//     );
// };

export default CsrfTemplate;
