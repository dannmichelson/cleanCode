using System.Collections.Generic;
using System.Linq;
using DannMichelson.Domain;
using DannMichelson.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace DannMichelson.Repository
{
    public class PersonRepository : IPersonRepository
    {
        private readonly ICleanCodeDbContext _cleanCodeDbContext;

        public PersonRepository()
        {
            _cleanCodeDbContext = CleanCodeDbContext.GetContext();
        }

        public IEnumerable<Person> GetPeople()
        {
            return _cleanCodeDbContext.Person.ToList();
        }
    }
}