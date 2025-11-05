// Infrastructure/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using BlogApi.Models;

namespace BlogApi.Infrastructure;

public class ApplicationDbContext : DbContext
{
  public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

  public DbSet<User> Users => Set<User>();
  public DbSet<Post> Posts => Set<Post>();

  // protected override void OnModelCreating(ModelBuilder modelBuilder)
  // {
  //   // Optional: apply configurations from this assembly if you add IEntityTypeConfiguration<T> types
  //   modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationContext).Assembly); // should be ApplicationDbContext?

  //   // Example explicit configuration (only needed if conventions are not enough):
  //   modelBuilder.Entity<Post>()
  //       .HasOne(p => p.User)
  //       .WithMany(u => u.Posts)
  //       .HasForeignKey(p => p.UserId)
  //       .OnDelete(DeleteBehavior.Cascade);
  // }
}