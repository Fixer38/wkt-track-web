using Microsoft.AspNetCore.Identity;

namespace wkt_track_backend.Data
{
    public class DbSeed
    {
        public static void Seed(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            WktDbContext ctx)
        {
            SeedRole(roleManager);
        }

        private static void SeedRole(RoleManager<IdentityRole> roleManager)
        {
            if (roleManager.RoleExistsAsync("Basic User").Result) return;
            var userRole = new IdentityRole
            {
                Name = "Basic User"
            };
            var userRoleCreationResult = roleManager.CreateAsync(userRole).Result;
            
            if (roleManager.RoleExistsAsync("Admin").Result) return;
            var adminRole = new IdentityRole
            {
                Name = "Admin"
            };
            var adminRoleCreationResult = roleManager.CreateAsync(adminRole).Result;
        }
    }
}