﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Web.Http;
using DirtyCodeApi.Data;

namespace DirtyCodeApi.Controllers
{
    [RoutePrefix("people")]
    public class PersonController : ApiController
    {
        private IPrincipal Identity;

        public PersonController()
        {
            this.Identity = this.User;
        }

        [Route("")]
        [HttpGet]
        public IHttpActionResult People()
        {
            if(this.Identity.Identity.IsAuthenticated && this.Identity.IsInRole("C9REB"))
            {
                return BadRequest();
            }

            return Ok(new PersonData().GetPeople());
        }

        [Route("name/{name}")]
        [HttpGet]
        public IHttpActionResult ByName(string name)
        {
            return Ok(new DirtyCodeApi.Data.PersonData().GetPeople(name));
        }

        [Route("")]
        [HttpPut]
        public IHttpActionResult InsertOrSavePerson(Person p)
        {
            if(p.First == null || p.First == "")
            {
                throw new Exception("Bad Data - first Name is not populated.");
            }

            p.First = p.First.Trim();
            p.Last = p.Last.Trim();
            p.Bio = p.Bio.Trim();
            p.TagLine = p.TagLine.Trim();

            if(!ValidatePerson(p))
            {
                throw new Exception("bad request");
            }

            return Ok(new DirtyCodeApi.Data.PersonData().UpdateOrInsertPerson(p));
        }

        private bool ValidatePerson(Person person)
        {
            if(!string.IsNullOrWhiteSpace(person.First))
            {
                return false;
            }
            else if(!string.IsNullOrWhiteSpace(person.Last)) return false;
            else if(!string.IsNullOrWhiteSpace(person.Bio))
                return false;

            return true;
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
                    names.Add(firstName);
            }

            return Ok(names);
        }   
    }
}