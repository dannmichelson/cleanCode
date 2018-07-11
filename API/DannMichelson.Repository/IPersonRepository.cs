using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DannMichelson.Domain.Models;

namespace DannMichelson.Repository
{
    public interface IPersonRepository
    {
        IEnumerable<Person> GetPeople();
        IEnumerable<Person> GetPeople(string lastName);
        Person InsertOrUpdatePerson(Person person);
    }
}
