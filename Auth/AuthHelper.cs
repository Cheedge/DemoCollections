using System;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace backend.Auth
{
	public class AuthHelper
	{
        private static string secretKey = GenerateSecretKey();

        public static string SecretKey { get => secretKey; set => secretKey = value; }
        public static Dictionary<string, string> USERS =
            new()
            {
                        { "a", "123" },
                        { "b", "666" }
            };

        public static string GenerateSecretKey()//(int keyLengthInBytes)
        {
            return Guid.NewGuid().ToString();
            //byte[] keyBytes = new byte[keyLengthInBytes];
            //using (var rng = RandomNumberGenerator.Create())
            //{
            //    rng.GetBytes(keyBytes);
            //}
            //string base64Key = Convert.ToBase64String(keyBytes);

            //return base64Key;
        }

        public static string CreateJwt(string username, string secretKey)
        {
            /*
             * the claims playload will be like:
             * {
             *  "name": "alice", → ASP.NET Core claim
             *  "sub": "alice", → JWT subject claim
             *  "jti": "abc-123",→ JWT ID
             *  "iss": "http://ThisProduct", → issuer
             *  "aud": "http://MyClient", → audience
             *  "exp": 1736287200 → expiration timestamp
             * } 
             */
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username),
                new Claim(Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Sub, username),
                new Claim(Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "http://ThisProduct",
                audience: "http://MyClient",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(5), // short-lived access token
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

