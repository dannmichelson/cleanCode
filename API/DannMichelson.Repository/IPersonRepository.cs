using System.Collections.Generic;
using DannMichelson.Repository.Model;

namespace DannMichelson.Repository
{
    public interface IPersonRepository
    {
        IEnumerable<Person> GetPeople();
        IEnumerable<Person> GetPeopleByLastName(string lastName);
        int SavePerson(Person person);
    }
}