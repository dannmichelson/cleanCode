using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using Dapper;

namespace DirtyCodeApi.Data
{
    public class PersonDatabase : Person
    {
        public int PersonId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
    }

    public class PersonData
    {
        public IEnumerable<Person> GetPeople()
        {
            using (var c = new SqlConnection(ConfigurationManager.ConnectionStrings["CleanCodeDb"].ConnectionString))
            {
                return c.Query<PersonDatabase>("SELECT * FROM person").Select(x =>
                {
                    x.Last = x.LastName;
                    x.First = x.FirstName;
                    return x;
                }).ToList();
            }
        }

        public IEnumerable<Person> GetPeople(string name)
        {
            using (var c = new SqlConnection(ConfigurationManager.ConnectionStrings["CleanCodeDb"].ConnectionString))
                return c.Query<PersonDatabase>($"SELECT * FROM person where lastName like '%{name}%'").Select(x =>
                {
                    x.Last = x.LastName;
                    x.First = x.FirstName;
                    return x;
                }).ToList();
        }

        public int UpdateOrInsertPerson(Person person)
        {
            using (var c = new SqlConnection(ConfigurationManager.ConnectionStrings["CleanCodeDb"].ConnectionString)){
                var p = c.Query<PersonDatabase>(
                    $"SELECT * FROM Person where lastName = '{person.Last}' and firstName = '{person.First}';").SingleOrDefault();

                if (p == null)
                {
                    return c.Execute(
                        $"Insert into person (lastName, firstName, bio, tagline) values ('{person.Last}','{person.First}','{person.Bio}','{person.TagLine}')");
                }
                else
                {
                    return c.Execute(
                        $"update person set lastName = {person.Last}, firstName = {person.First}, bio={person.Bio}, tagline = {person.TagLine} where personid = {p.PersonId}");
                }
            }
        }
    }
}