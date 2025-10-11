using backend.Auth.Applications.CommandHandlers;
using backend.Auth.Applications.Commands;
using backend.Auth.APIs.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Auth.APIs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly LoginCommandHandler _loginHandler;
        private readonly RefreshCommandHandler _refreshHandler;

        public AuthController(
            LoginCommandHandler loginHandler,
            RefreshCommandHandler refreshHandler)
        {
            _loginHandler = loginHandler;
            _refreshHandler = refreshHandler;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest dto)
        {
            var cmd = new LoginCommand { PassWord = dto.Password, UserName = dto.Username };
            var (access, refresh) = await _loginHandler.HandleAsync(cmd);
            return Ok(new LoginResponse { AccessToken = access, RefreshToken = refresh });
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<RefreshResponse>> Refresh([FromBody] RefreshRequest dto)
        {
            var cmd = new RefreshCommand { RefreshToken = dto.RefreshToken };
            var (access, refresh) = await _refreshHandler.HandleAsync(cmd);
            return Ok(new RefreshResponse { AccessToken = access, RefreshToken = refresh });
        }

        [Authorize]
        [HttpGet("secure")]
        public IActionResult Secure() =>
            Ok(new { message = $"Hello {User.Identity?.Name}" });
    }
}
