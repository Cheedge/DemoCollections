using System;
using backend.Auth.Infrastructures.Entities;

namespace backend.Auth.Infrastructures.Repos
{
	public interface IAuthRepo
	{
        Task<UserEntity?> GetUserAsync(string username);
        Task AddRefreshTokenAsync(RefreshTokenEntity token);
        Task<RefreshTokenEntity?> GetRefreshTokenAsync(string token);
        Task SaveChangesAsync();
    }
}

