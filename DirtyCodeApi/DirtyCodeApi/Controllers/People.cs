using System.Web.Http;

namespace DirtyCodeApi.Controllers
{
    [RoutePrefix("person")]
    public class PersonController : ApiController
    {
        [Route("")]
        public IHttpActionResult People()
        {
            return Ok();
        }
    }
}