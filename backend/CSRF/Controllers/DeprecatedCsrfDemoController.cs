using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;
/*
 * This is deprecated, because of the third-party cookie blocking in browser
 * these cookies will not be stored in the browser, so it cannot be Post.
 */
namespace backend.CSRF.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeprecatedCsrfDemoController : ControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public DeprecatedCsrfDemoController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        [HttpGet("token")]
        public IActionResult GetCsrfToken()
        {
            var tokens = _antiforgery.GetAndStoreTokens(HttpContext);
            // Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken!, new CookieOptions
            // {
            //     HttpOnly = false,
            //     Secure = false,
            //     SameSite = SameSiteMode.Strict
            // });

            return Ok(new { csrfToken = tokens.RequestToken });
        }

        [HttpPost("secure-action")]
        public async Task<IActionResult> SecureAction([FromBody] dynamic data)
        {
            // diff from MVC: Manual validation here, not using
            // [ValidateAntiForgeryToken]
            await _antiforgery.ValidateRequestAsync(HttpContext);

            return Ok(new { message = "CSRF token validated!", input = data });
        }
    }
}

