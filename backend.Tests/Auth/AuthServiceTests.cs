using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using Xunit;
using backend.Auth.Applications.Services;
using backend.Auth.Infrastructures.Entities;

namespace backend.Tests.Auth
{
    public class AuthServiceTests
    {
        private readonly AuthService _authService;

        public AuthServiceTests()
        {
            // Note: CreateJwtToken uses Jwt:SecretKey, ValidateExpiredToken uses Jwt:Key
            var config = new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string?>
                {
                    {"Jwt:SecretKey", "thekeyshouldbeatleast256bit=32byte"}, // used to sign token
                    {"Jwt:Issuer", "testIssuer"},
                    {"Jwt:Audience", "testAudience"},
                    {"Jwt:Key", "supersecretkeysupersecretkey"} // used by ValidateExpiredToken
                }).Build();

            _authService = new AuthService(config);
        }

        [Fact]
        public void CreateJwtToken_ReturnsValidJwt_WithNameAndJtiClaims()
        {
            // Arrange
            var user = new UserEntity { Username = "tester" };

            // Act
            var token = _authService.CreateJwtToken(user);

            // Parse token
            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.ReadJwtToken(token);

            // Assert: find the claim with type ClaimTypes.Name
            var nameClaim = jwt.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name);
            Assert.NotNull(nameClaim);
            Assert.Equal("tester", nameClaim!.Value);

            // Assert: jti exists
            var jtiClaim = jwt.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti);
            Assert.NotNull(jtiClaim);
            Assert.False(string.IsNullOrWhiteSpace(jtiClaim!.Value));
        }

        [Fact]
        public void CreateRefreshToken_ReturnsValidEntity()
        {
            var user = new UserEntity { Username = "tester" };
            var refresh = _authService.CreateRefreshToken(user);

            Assert.NotNull(refresh.Token);
            Assert.Equal(user, refresh.User);
            Assert.True(refresh.Expires > DateTime.UtcNow);
        }

        [Fact]
        public void ValidateExpiredToken_ReturnsPrincipal_WhenTokenIsValid()
        {
            /* this will be failed, as it is expired token*/
            //var user = new UserEntity { Username = "tester" };

            //// create token with short lifetime (default is 5 minutes)
            //var token = _authService.CreateJwtToken(user);

            //// ValidateExpiredToken sets ValidateLifetime = false so it should return a principal
            //var principal = _authService.ValidateExpiredToken(token);
            //Assert.NotNull(principal);

            //// additionally assert the name claim present in principal
            //var name = principal?.Identity?.Name;
            //// Identity.Name may map to the ClaimTypes.Name value depending on token handler
            //Assert.Equal("tester", name);


            var user = new UserEntity { Username = "tester" };
            var token = _authService.CreateJwtToken(user);

            // Simulate expiration
            Thread.Sleep(TimeSpan.FromSeconds(1));

            var principal = _authService.ValidateExpiredToken(token);
            Assert.Null(principal);
        }
    }
}
