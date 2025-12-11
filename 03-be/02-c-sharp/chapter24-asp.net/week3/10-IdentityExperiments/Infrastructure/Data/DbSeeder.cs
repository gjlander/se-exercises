using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using TravelApi.Models;

namespace TravelApi.Infrastructure.Data;

public class DbSeeder
{
  private readonly ApplicationDbContext _db;
  private readonly UserManager<User> _userManager;
  private readonly RoleManager<IdentityRole<Guid>> _roleManager;

  public DbSeeder(ApplicationDbContext db, UserManager<User> userManager, RoleManager<IdentityRole<Guid>> roleManager)
  {
    _db = db;
    _userManager = userManager;
    _roleManager = roleManager;
  }

  public async Task SeedAsync(CancellationToken ct = default)
  {
    // Ensure database exists and is up to date
    await _db.Database.MigrateAsync(ct);

    // Ensure required roles exist
    if (!await _roleManager.RoleExistsAsync("user"))
    {
      await _roleManager.CreateAsync(new IdentityRole<Guid> { Name = "user", NormalizedName = "USER" });
    }

    if (!await _roleManager.RoleExistsAsync("admin"))
    {
      await _roleManager.CreateAsync(new IdentityRole<Guid> { Name = "admin", NormalizedName = "ADMIN" });
    }

    if (!await _userManager.Users.AnyAsync(ct))
    {
      var user1 = new User
      {
        UserName = "aang@air.com",
        Email = "aang@air.com",
        FirstName = "Aang",
        LastName = "Air"
      };
      var user2 = new User
      {
        UserName = "katara@water.com",
        Email = "katara@water.com",
        FirstName = "Katara",
        LastName = "Water"
      };

      var res1 = await _userManager.CreateAsync(user1, "Aangpass123!");
      if (res1.Succeeded)
      {
        await _userManager.AddToRoleAsync(user1, "user");
        await _userManager.AddToRoleAsync(user1, "admin");
      }

      var res2 = await _userManager.CreateAsync(user2, "Katarapass123!");
      if (res2.Succeeded)
      {
        await _userManager.AddToRoleAsync(user2, "user");
      }

    }


  }
}