using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using wkt_track_backend.Data;

namespace wkt_track_backend
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().SeedDatabase().Run();
        }

        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseUrls("http://*:2000");
                    webBuilder.UseStartup<Startup>(); 
                });

        private static IHost SeedDatabase(this IHost iHost)
        {
            var servicesScopeFactory = (IServiceScopeFactory) iHost
                .Services.GetService(typeof(IServiceScopeFactory));
            using (var scope = servicesScopeFactory.CreateScope())
            {
                var services = scope.ServiceProvider;
                var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
                var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
                var dbContext = services.GetRequiredService<WktDbContext>();
                DbSeed.Seed(userManager, roleManager, dbContext);
            }

            return iHost;
        }
    }
}