using DannMichelson.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace DannMichelson.Domain
{
    public interface ICleanCodeDbContext
    {
        DbSet<Person> Person { get; set; }
    }
}