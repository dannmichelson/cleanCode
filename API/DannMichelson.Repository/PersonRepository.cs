using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using DannMichelson.Repository.Model;
using Dapper;

namespace DannMichelson.Repository
{
    public class PersonRepository : IPersonRepository
    {
        public IEnumerable<Person> GetPeopleByLastName(string lastName)
        {
            using (var dbConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["CleanCodeDb"].ConnectionString))
            {
                lastName = $"%{lastName}%";
                return dbConnection.Query<Person>("SELECT * FROM Person WHERE LastName like @LastName", new {lastName}).ToList();
            }
        }

        public int SavePerson(Person person)
        {
            using (var dbConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["CleanCodeDb"].ConnectionString))
            {
                var existingPerson = dbConnection.QuerySingleOrDefault<Person>(
                    "SELECT * FROM Person WHERE LastName = '@LastName' and FirstName = '@FirstName'", person);

                if (existingPerson == null)
                {
                    return dbConnection.Execute(
                        "Insert into person (lastName, firstName, bio, tagline) values (@LastName,@FirstName,@Bio,@TagLine)",
                        person);
                }

                person.PersonId = existingPerson.PersonId;
                return dbConnection.Execute(
                    "UPDATE PERSON SET LastName = @LastName, FirstName = @FirstName, Bio = @Bio, TagLine = @Tagline WHERE PersonId = @PersonId",
                    person);
            }
        }

        public IEnumerable<Person> GetPeople()
        {
            using (var dbConnection = new SqlConnection(ConfigurationManager.ConnectionStrings["CleanCodeDb"].ConnectionString))
            {
                return dbConnection.Query<Person>("SELECT * FROM person").ToList();
            }
        }
    }
}