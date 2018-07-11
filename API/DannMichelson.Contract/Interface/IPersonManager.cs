using System.Collections.Generic;
using DannMichelson.Contract.Model;

namespace DannMichelson.Contract.Interface
{
    public interface IPersonManager
    {
        IEnumerable<Person> GetAllPeople();
        IEnumerable<Person> GetPeopleByLastName(string lastName);
        Person InsertOrUpdatePerson(Person person);
    }
}