using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using DirtyCodeContract;

namespace DirtyCodeRepository
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
                return Enumerable.Select<PersonDatabase, PersonDatabase>(c.Query<PersonDatabase>("SELECT * FROM person"), x =>
                {
                    x.Last = x.LastName;
                    x.First = x.FirstName;
                    return x;
                }).ToList();
            }
        }

        public IEnumerable<Person> GetPeopleByLastName(string lastName)
        {
            using (var c = new SqlConnection(ConfigurationManager.ConnectionStrings["CleanCodeDb"].ConnectionString))
                return Enumerable.Select<PersonDatabase, PersonDatabase>(c.Query<PersonDatabase>($"SELECT * FROM person where lastName like '%{lastName}%'"), x =>
                {
                    x.Last = x.LastName;
                    x.First = x.FirstName;
                    return x;
                }).ToList();
        }

        public int UpdateOrInsertPerson(Person person)
        {
            using (var c = new SqlConnection(ConfigurationManager.ConnectionStrings["CleanCodeDb"].ConnectionString)){
                var p = Enumerable.SingleOrDefault<PersonDatabase>(c.Query<PersonDatabase>(
                    $"SELECT * FROM Person where lastName = '{person.Last}' and firstName = '{person.First}';"));

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