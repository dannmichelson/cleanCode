using System.Web.Http;

namespace DirtyCodeApi.Controllers
{
    [RoutePrefix("people")]
    public class PersonController : ApiController
    {
        [Route("")]
        [HttpGet]
        public IHttpActionResult People()
        {
            return Ok(new Person[] {
                new Person
            {
                First = "Dann",
                Last = "Michelson",
                Bio = "Sample Code",
                TagLine = "TagLine"
            }});


        }
    }
}