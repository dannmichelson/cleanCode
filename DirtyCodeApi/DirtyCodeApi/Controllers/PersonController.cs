using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Web.Http;
using DirtyCodeContract;
using DirtyCodeRepository;

namespace DirtyCodeApi.Controllers
{
    [RoutePrefix("person")]
    public class PersonController : ApiController
    {
        private IPrincipal _identity;

        public PersonController()
        {
            this._identity = this.User;
        }

        [Route("")]
        [HttpGet]
        public IHttpActionResult People()
        {
            if(_identity.Identity.IsAuthenticated && _identity.IsInRole("C9REB"))
            {
                return BadRequest();
            }

            return Ok(new PersonData().GetPeople());
        }


        /// <summary>
        /// Gets All People who's last name contains the input
        /// </summary>
        /// <param name="lastName"></param>
        /// <returns></returns>
        [Route("lastName/{lastName}")]
        [HttpGet]
        public IHttpActionResult ByLastName(string lastName)
        {
            return Ok(new PersonData().GetPeopleByLastName(lastName));
        }

        [Route("")]
        [HttpPut]
        public IHttpActionResult InsertOrSavePerson(Person person)
        {
            if(person.First == null || person.First == "")
            {
                throw new Exception("Bad Data - first Name is not populated.");
            }

            person.First = person.First.Trim();
            person.Last = person.Last.Trim();
            person.Bio = person.Bio.Trim();
            person.TagLine = person.TagLine.Trim();

            if(!ValidatePerson(person))
            {
                throw new Exception("bad request");
            }

            return Ok(new PersonData().UpdateOrInsertPerson(person));
        }

        private bool ValidatePerson(Person person)
        {
            if(string.IsNullOrWhiteSpace(person.First))
            {
                return false;
            }

            if(string.IsNullOrWhiteSpace(person.Last))
            {
                return false;
            }

            if(string.IsNullOrWhiteSpace(person.Bio))
            {
                return false;
            }

            return true;
        }

        [Route("firstNames")]
        public IHttpActionResult GetFirstNames()
        {
            var allPeople = new PersonData().GetPeople();
            List<string> names = new List<string>();
            foreach(var person in allPeople)
            {
                var firstName = person.First;
                firstName = firstName.Trim();
                if(!names.Contains(firstName))
                    names.Add(firstName);
            }

            return Ok(names);
        }   
    }
}