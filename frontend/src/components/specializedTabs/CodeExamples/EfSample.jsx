import React from 'react';

const EfSample = () =>
    `public class AppDbContext : DbContext
{
  public DbSet<User> Users { get; set; }
  
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<User>(entity =>
    {
      entity.HasKey(e => e.Id);
      entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
      entity.HasIndex(e => e.Email).IsUnique();
    });
  }
}

// Usage
public async Task<User> GetUserAsync(int id)
{
  return await _context.Users
    .Include(u => u.Orders)
    .FirstOrDefaultAsync(u => u.Id == id);
}`;
export default EfSample;
