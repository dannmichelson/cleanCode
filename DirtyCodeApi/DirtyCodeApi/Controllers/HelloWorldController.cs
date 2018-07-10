using System.Web.Http;

namespace DirtyCodeApi.Controllers
{
    [RoutePrefix("hello")]
    public class FirstController : ApiController
    {
        [Route("")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok("Hello World!");
        }

        [Route("{name}")]
        public IHttpActionResult Get(string name)
        {
            return Ok($"Hello {name}!");
        }
    }
}