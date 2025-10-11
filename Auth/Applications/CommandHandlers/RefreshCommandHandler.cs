using System;
using backend.Auth.Applications.Commands;
using backend.Auth.Applications.Services;
using backend.Auth.Infrastructures.Repos;
using backend.Common.Interfaces;

namespace backend.Auth.Applications.CommandHandlers
{
	public class RefreshCommandHandler: IAuthCommandHandler<RefreshCommand>
    {
        private readonly IAuthRepo _repo;
        private readonly IAuthService _authService;

        public RefreshCommandHandler(IAuthRepo repo, IAuthService authService)
        {
            _repo = repo;
            _authService = authService;
        }

        public async Task<(string accessToken, string refreshToken)> HandleAsync(RefreshCommand cmd)
        {
            var tokenEntity = await _repo.GetRefreshTokenAsync(cmd.RefreshToken);
            if (tokenEntity == null || tokenEntity.IsRevoked || tokenEntity.Expires < DateTime.UtcNow)
                throw new UnauthorizedAccessException("Invalid or expired refresh token");

            var user = tokenEntity.User!;
            var newAccessToken = _authService.CreateJwtToken(user);
            var newRefresh = _authService.CreateRefreshToken(user);

            tokenEntity.IsRevoked = true;
            await _repo.AddRefreshTokenAsync(newRefresh);
            await _repo.SaveChangesAsync();

            return (newAccessToken, newRefresh.Token);
        }
    }
}

