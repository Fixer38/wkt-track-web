using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using wkt_track_backend.Models;

namespace wkt_track_backend.Data
{
    public class WktDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public WktDbContext(DbContextOptions options) : base(options)
        {}
    }
}