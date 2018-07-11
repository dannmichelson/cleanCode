using System.Web.Http;
using DannMichelson.BusinessLogic;
using DannMichelson.Contract.Interface;
using DannMichelson.Contract.Model;

namespace DannMichelson.CleanCodeApi.Controllers
{
    [RoutePrefix("person")]
    public class PersonController : ApiController
    {
        private readonly IPersonManager _personManager;

        public PersonController() : this(new PersonManager())
        {
        }

        public PersonController(IPersonManager personManager)
        {
            _personManager = personManager;
        }

        [Route("")]
        public IHttpActionResult GetPeople()
        {
            return Ok(_personManager.GetAllPeople());
        }

        [Route("lastName/{lastName}")]
        public IHttpActionResult GetPeopleByLastName(string lastName)
        {
            return Ok(_personManager.GetPeopleByLastName(lastName));
        }

        [Route("")]
        public IHttpActionResult PutPerson(Person person)
        {
            _personManager.InsertOrUpdatePerson(person);
            return Ok();
        }
    }
}