using System.Collections.Generic;
using System.Linq;
using DannMichelson.Domain;
using DannMichelson.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace DannMichelson.Repository
{
    public class PersonRepository : IPersonRepository
    {
        private readonly CleanCodeDbContext _cleanCodeDbContext;

        public PersonRepository()
        {
            _cleanCodeDbContext = CleanCodeDbContext.GetContext();
        }

        public IEnumerable<Person> GetPeople()
        {
            return _cleanCodeDbContext.Person.ToList();
        }

        public IEnumerable<Person> GetPeople(string lastName)
        {
            return _cleanCodeDbContext.Person.Where(p => p.LastName.Contains(lastName)).ToList();
        }

        public Person InsertOrUpdatePerson(Person person)
        {
            var existingPerson = _cleanCodeDbContext.Person.FirstOrDefault(p => p.LastName == person.LastName && p.FirstName == person.FirstName);

            if (existingPerson != null)
            {
                existingPerson.Bio = person.Bio;
                existingPerson.TagLine = person.TagLine;
                var result = _cleanCodeDbContext.Person.Update(person);
                _cleanCodeDbContext.SaveChanges();
                return result.Entity;
            }
            else
            {
                var result = _cleanCodeDbContext.Person.Add(new Person
                {
                    Bio = person.Bio,
                    LastName = person.LastName,
                    FirstName = person.FirstName,
                    TagLine = person.TagLine
                });
                _cleanCodeDbContext.SaveChanges();
                return result.Entity;
            }

        }
    }
}