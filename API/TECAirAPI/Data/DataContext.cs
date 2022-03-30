using Microsoft.EntityFrameworkCore;
using TECAirAPI.Models;
 
 /// <summary>
 /// Creation of data context that implements the interface IDataContext
 /// </summary>

namespace TECAirAPI.Data
{
    public class DataContext: DbContext, IDataContext //Usage of DbContext from Entity Framework
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
             
        }
 
        public DbSet<Worker> Workers { get; init; } //Setting of workers in the database
        public DbSet<Bag> Bags { get; init; } //Setting of bags in the database
        public DbSet<Plane> Planes { get; init; } //Setting of planes in the database
        public DbSet<Seat> Seats { get; init; } //Setting of seats in the database
        public DbSet<User> Users { get; init; } //Setting of users in the database
        public DbSet<Flight> Flights { get; init; } //Setting of flights in the database


    }
}