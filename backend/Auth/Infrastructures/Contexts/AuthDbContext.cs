using System;
using backend.Auth.Infrastructures.Entities;
using backend.Features.Products.Infrastructures.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Auth.Infrastructures.Contexts
{
	public class AuthDbContext: DbContext
	{
		public AuthDbContext(DbContextOptions<AuthDbContext> opts):base(opts)
		{
		}

		public DbSet<UserEntity> Users => Set<UserEntity>();
		public DbSet<RefreshTokenEntity> Refreshes => Set<RefreshTokenEntity>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserEntity>().ToTable("DemosWebsiteUserTbl");
            modelBuilder.Entity<RefreshTokenEntity>().ToTable("DemosWebsiteRefreshTokenTbl");
        }
    }
}

