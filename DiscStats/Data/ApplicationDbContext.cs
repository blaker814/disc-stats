using DiscStats.Models;
using Microsoft.EntityFrameworkCore;

namespace DiscStats.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Conditions> Conditions { get; set; }
        public DbSet<Course> Course { get; set; }
        public DbSet<Disc> Disc { get; set; }
        public DbSet<DiscType> DiscType { get; set; }
        public DbSet<Hole> Hole { get; set; }
        public DbSet<QualityOfShot> QualityOfShot { get; set; }
        public DbSet<Scorecard> Scorecard { get; set; }
        public DbSet<Shot> Shot { get; set; }
        public DbSet<ShotRange> ShotRange { get; set; }
        public DbSet<ShotSelection> ShotSelection { get; set; }
        public DbSet<ShotType> ShotType { get; set; }
        public DbSet<User> User { get; set; }
    }
}
