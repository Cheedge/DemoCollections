using System;
using backend.Auth.Applications.Commands;
using backend.Auth.Applications.Services;
using backend.Auth.Infrastructures.Repos;
using backend.Common.Interfaces;

namespace backend.Auth.Applications.CommandHandlers
{
	public class LoginCommandHandler: IAuthCommandHandler<LoginCommand>
	{
        private readonly IAuthRepo _repo;
        private readonly IAuthService _authService;

        public LoginCommandHandler(IAuthRepo repo, IAuthService authService)
        {
            _repo = repo;
            _authService = authService;
        }

        public async Task<(string accessToken, string refreshToken)> HandleAsync(LoginCommand command)
        {
            var user = await _repo.GetUserAsync(command.UserName);
            if (user == null || user.PasswordHash != command.PassWord)
                throw new UnauthorizedAccessException();

            var accessToken = _authService.CreateJwtToken(user);
            var refreshToken = _authService.CreateRefreshToken(user);
            await _repo.AddRefreshTokenAsync(refreshToken);

            return (accessToken, refreshToken.Token);
        }
    }
}

