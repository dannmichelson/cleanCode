using System.Collections.Generic;
using System.Linq;
using DannMichelson.Contract.Interface;
using DannMichelson.Contract.Model;
using DannMichelson.Repository;

namespace DannMichelson.BusinessLogic
{
    public class PersonManager : IPersonManager
    {
        private readonly IPersonRepository _personRepository;

        public PersonManager()
        {
            _personRepository = new PersonRepository();
        }

        public IEnumerable<Person> GetAllPeople()
        {
            return _personRepository.GetPeople().Select(MapPerson);
        }

        public IEnumerable<Person> GetPeopleByLastName(string lastName)
        {
            return _personRepository.GetPeople(lastName).Select(MapPerson);
        }

        public Person InsertOrUpdatePerson(Person person)
        {
            var response = _personRepository.InsertOrUpdatePerson(MapPerson(person));
            return MapPerson(response);
        }

        public Person MapPerson(Domain.Models.Person person)
        {
            return new Person
            {
                Bio = person.Bio,
                FirstName = person.FirstName,
                TagLine = person.TagLine,
                LastName = person.LastName
            };
        }

        public Domain.Models.Person MapPerson(Person person)
        {
            return new Domain.Models.Person
            {
                Bio = person.Bio,
                FirstName = person.FirstName,
                TagLine = person.TagLine,
                LastName = person.LastName
            };
        }
    }
}
