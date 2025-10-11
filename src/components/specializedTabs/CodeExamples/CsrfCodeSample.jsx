import React from 'react';

const CsrfCodeSample = () =>
    `        [HttpGet("token")]
        public IActionResult GetCsrfToken()
        {
            var tokens = _antiforgery.GetAndStoreTokens(HttpContext);
            Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken!, new CookieOptions
            {
                HttpOnly = false,
                Secure = false,
                SameSite = SameSiteMode.Strict
            });

            return Ok(new { csrfToken = tokens.RequestToken });
        }
        
        // Usage
        // MVC:[ValidateAntiForgeryToken]
        // api: await _antiforgery.ValidateRequestAsync(HttpContext);
        `;

export default CsrfCodeSample;
