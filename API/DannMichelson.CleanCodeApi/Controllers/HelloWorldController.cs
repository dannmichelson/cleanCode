using System.Web.Http;

namespace DannMichelson.CleanCodeApi.Controllers
{
    [RoutePrefix("hello")]
    public class HelloWorldController : ApiController
    {
        [Route("")]
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