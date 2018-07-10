using System.Web.Http;

namespace DannMichelson.CleanCodeApi.Controllers
{
    [RoutePrefix("person")]
    public class PersonController : ApiController
    {
        [Route("")]
        public IHttpActionResult GetPeople()
        {
            return Ok();
        }
    }
}