using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VacayCheck.Models;

namespace VacayCheck.Contexts
{
    public class Context: DbContext
    {
        public DbSet<City> Cities { get; set; }
        public DbSet<Apartment> Apartments { get; set; }
        public DbSet<Owner> Owners { get; set; }
        public DbSet<Favourite> Favourites { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<ExchangeRequest> ExchangeRequests { get; set; }

        public static bool isMigration = true;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (isMigration)
                optionsBuilder.UseSqlServer(@"Server=.\;Database=VacayCheckDB;Trusted_Connection=true;");           
        }
        public Context() { }
        public Context(DbContextOptions<Context> options) : base(options) { }

    }

}
