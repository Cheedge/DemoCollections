using Microsoft.AspNetCore.Mvc;

namespace backend.CSRF.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CsrfDemoController : ControllerBase
    {
        // In-memory token storage, if focus on concurrency can use Redis to store
        private static readonly Dictionary<string, DateTime> _tokens = new();
        private static readonly object _lock = new();

        [HttpGet("token")]
        public IActionResult GetCsrfToken()
        {
            // Generate random token
            var token = Guid.NewGuid().ToString() + Guid.NewGuid().ToString();
            
            lock (_lock)
            {
                _tokens[token] = DateTime.UtcNow.AddMinutes(10);
            }
            
            return Ok(new { csrfToken = token });
        }

        [HttpPost("secure-action")]
        public IActionResult SecureAction([FromBody] dynamic data)
        {
            // Get token from header
            var token = Request.Headers["X-XSRF-TOKEN"].FirstOrDefault();
            
            if (string.IsNullOrEmpty(token))
                return BadRequest(new { error = "Missing CSRF token" });
            
            lock (_lock)
            {
                // Check if token exists and is not expired
                if (!_tokens.TryGetValue(token, out var expiresAt))
                    return BadRequest(new { error = "Invalid or already-used CSRF token" });
                
                if (DateTime.UtcNow > expiresAt)
                {
                    _tokens.Remove(token);
                    return BadRequest(new { error = "CSRF token expired" });
                }
                
                // Remove token (single-use)
                _tokens.Remove(token);
            }
            
            return Ok(new { message = "CSRF token validated!", input = data });
        }
    }
}