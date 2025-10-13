using System;
using System.Security.Claims;
using backend.Auth.Infrastructures.Entities;

namespace backend.Auth.Applications.Services
{
	public interface IAuthService
	{
        string CreateJwtToken(UserEntity user);
        RefreshTokenEntity CreateRefreshToken(UserEntity user);
        ClaimsPrincipal? ValidateExpiredToken(string token);
    }
}

