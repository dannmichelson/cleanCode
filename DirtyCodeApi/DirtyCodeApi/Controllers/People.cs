using System.Collections.Generic;
using System.Web.Http;
using DirtyCodeApi.Data;

namespace DirtyCodeApi.Controllers
{
    [RoutePrefix("people")]
    public class PersonController : ApiController
    {
        [Route("")]
        [HttpGet]
        public IHttpActionResult People()
        {
            return Ok(new PersonData().GetPeople());
        }

        [Route("name/{name}")]
        [HttpGet]
        public IHttpActionResult ByName(string name)
        {
            return Ok(new PersonData().GetPeople(name));
        }

        [Route("")]
        [HttpPut]
        public IHttpActionResult InsertOrSavePerson(Person p)
        {
            return Ok(new PersonData().UpdateOrInsertPerson(p));
        }

        [Route("FirstNames")]
        public IHttpActionResult GetFirstNames()
        {
            var allPeople = new PersonData().GetPeople();
            List<string> names = new List<string>();
            foreach(var person in allPeople)
            {
                var firstName = person.First;
                firstName = firstName.Trim();
                if(!names.Contains(firstName))
                {
                    names.Add(firstName);
                }
            }

            return Ok(names);
        }
    }
}