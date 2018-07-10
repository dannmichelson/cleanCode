using System.Collections.Generic;
using DannMichelson.Contract.Interface;
using DannMichelson.Contract.Model;

namespace DannMichelson.BusinessLogic
{
    public class PersonManager : IPersonManager
    {
        public IEnumerable<Person> GetAllPeople()
        {
            yield return new Person
            {
                FirstName = "Dann",
                LastName = "Michelson",
                Bio = "Sample Code",
                TagLine = "My tagline!"
            };
        }
    }
}
