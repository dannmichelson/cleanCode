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
        public IHttpActionResult Save(Person p)
        {
            return Ok(new PersonData().UpdateOrInsertPerson(p));
        }
    }
}