using DannMichelson.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

namespace DannMichelson.Domain
{
    public partial class CleanCodeDbContext : DbContext, ICleanCodeDbContext
    {
        public CleanCodeDbContext()
        {
        }

        public CleanCodeDbContext(DbContextOptions<CleanCodeDbContext> options)
            : base(options)
        {
        }

        public static ICleanCodeDbContext GetContext()
        {
            return new CleanCodeDbContext();
        }

        public virtual DbSet<Person> Person { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(ConfigurationManager.ConnectionStrings["CleanCodeDb"].ConnectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Person>(entity =>
            {
                entity.Property(e => e.Bio)
                    .IsRequired()
                    .HasMaxLength(500);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(e => e.TagLine).HasMaxLength(80);
            });
        }
    }
}
