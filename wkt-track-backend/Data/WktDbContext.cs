using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace wkt_track_backend.Data
{
    public class WktDbContext : IdentityDbContext<IdentityUser>
    {
        public WktDbContext(DbContextOptions options) : base(options)
        {}
    }
}