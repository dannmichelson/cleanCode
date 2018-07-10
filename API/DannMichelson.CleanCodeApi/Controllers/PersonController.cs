using System.Web.Http;
using DannMichelson.BusinessLogic;
using DannMichelson.Contract.Interface;

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
    }
}