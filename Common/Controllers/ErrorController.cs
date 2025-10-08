using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace backend.Common.Controllers
{
    [ApiController]
    [Route("/error")]
    public class ErrorController : ControllerBase
    {
        [HttpGet, HttpPost, HttpPut, HttpDelete]
        public IActionResult HandleError()
        {
            var feature = HttpContext.Features.Get<IExceptionHandlerFeature>();
            var ex = feature?.Error;

            return Problem(
                detail: ex?.Message,
                title: "An unexpected error occurred",
                statusCode: 500
            );
        }
    }
}
