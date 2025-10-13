using System;
using backend.Features.Products.Infrastructures.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Features.Products.Infrastructures.Context
{
	public class ProductDbContext: DbContext
	{
		public DbSet<ProductEntity> Products { get; set; }
		public ProductDbContext(DbContextOptions<ProductDbContext> opt): base(opt)
		{
		}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<ProductEntity>().ToTable("ProductsTbl");
        }
    }
}

