using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Auth
{
    [ApiController]
    //[Route("login")]
    public class LoginController : Controller
    {
        public static Dictionary<string, string> refreshTokens = new();


        [HttpPost("/login/jwt")]
        public IActionResult Login(string username, string password)
        {
            if (!AuthHelper.USERS.TryGetValue(username, out var storedPassword) || storedPassword != password)
                return Unauthorized();

            var accessToken = AuthHelper.CreateJwt(username, AuthHelper.SecretKey);
            var refreshToken = Guid.NewGuid().ToString();

            refreshTokens[username] = refreshToken;

            return Ok(new
            {
                accessToken,
                refreshToken
            });
        }

        [HttpPost("/refresh")]
        public IActionResult Refresh(string username, string refreshToken)
        {
            {
                if (!refreshTokens.TryGetValue(username, out var storedToken) || storedToken != refreshToken)
                    return Unauthorized();

                var newAccessToken = AuthHelper.CreateJwt(username, AuthHelper.SecretKey);
                var newRefreshToken = Guid.NewGuid().ToString();

                // rotate refresh token
                refreshTokens[username] = newRefreshToken;

                return Ok(new
                {
                    accessToken = newAccessToken,
                    refreshToken = newRefreshToken
                });
            };
        }

        [HttpGet("/secure")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult Secure()
        {
            var username = User.Identity?.Name; // works automatically

            //var username = User.FindFirstValue(ClaimTypes.Name)
            //             ?? User.FindFirstValue("sub")
            //             ?? "anonymous";

            return Ok(new { message = $"Hello {username}" });
        }


    }
}

