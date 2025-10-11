using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Auth.Infrastructures.Entities;
using backend.Auth.Infrastructures.Repos;
using Microsoft.IdentityModel.Tokens;

namespace backend.Auth.Applications.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _config;
        //private readonly IAuthRepo _repo;

        public AuthService(IConfiguration config)
        {
            _config = config;
            //_repo = repo;
        }

        public string CreateJwtToken(UserEntity user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(5),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public RefreshTokenEntity CreateRefreshToken(UserEntity user)
        {
            return new RefreshTokenEntity
            {
                Token = Guid.NewGuid().ToString(),
                Expires = DateTime.UtcNow.AddDays(7),
                User = user
            };
        }

        public ClaimsPrincipal? ValidateExpiredToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]!);

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateLifetime = false // we want to read claims even if expired
                }, out _);

                return principal;
            }
            catch { return null; }
        }
    }
}

