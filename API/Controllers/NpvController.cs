using Application.UseCases.CalculateNpv;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class NpvController : ControllerBase
    {
        private readonly CalculateNpvHandler _handler;
        private readonly ILogger<NpvController> _logger;

        public NpvController(CalculateNpvHandler handler, ILogger<NpvController> logger)
        {
            _handler = handler;
            _logger = logger;
        }

        [HttpPost]
        public ActionResult<IEnumerable<NpvResult>> Post([FromBody] NpvRequest request)
        {
            if (request.CashFlows == null || !request.CashFlows.Any())
            {
                _logger.LogWarning("NPV request received with empty cash flows.");
                return BadRequest("CashFlows must not be empty.");
            }

            _logger.LogInformation("NPV calculation started."+request.ToString());
            var results = _handler.Handle(request);
            _logger.LogInformation("NPV calculation completed with {Count} results.", results.Count());

            return Ok(results);
        }
    }
}
