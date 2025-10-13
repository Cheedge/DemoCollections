using System;
using backend.Auth.Infrastructures.Contexts;
using backend.Auth.Infrastructures.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Auth.Infrastructures.Repos
{
	public class AuthRepo: IAuthRepo
	{
        private readonly AuthDbContext _context;
		public AuthRepo(AuthDbContext context)
		{
            _context = context;
		}

        public async Task AddRefreshTokenAsync(RefreshTokenEntity token)
        {
            await _context.Refreshes.AddAsync(token);
            await _context.SaveChangesAsync();
        }

        public async Task<RefreshTokenEntity?> GetRefreshTokenAsync(string token)
        {
            var tk = await _context.Refreshes.FirstOrDefaultAsync(u => u.Token == token);
            return tk;
        }

        public async Task<UserEntity?> GetUserAsync(string username)
        {
            var entity = await _context.Users.Include(u => u.RefreshTokens)
                .FirstOrDefaultAsync(u => u.Username == username);
            return entity;
        }

        // obsolate
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}

