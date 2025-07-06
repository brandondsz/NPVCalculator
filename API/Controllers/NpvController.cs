using Application.UseCases.CalculateNpv;
using Domain.Exceptions;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.CompilerServices;
using System.Text.Json;

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

        /// <summary>
        /// Streams Net Present Value (NPV) calculations for a range of discount rates as Server-Sent Events (SSE).
        /// </summary>
        /// <remarks>This method calculates NPV values for a series of cash flows over a range of discount
        /// rates, specified by the caller, and streams the results to the client using the Server-Sent Events (SSE)
        /// protocol. The response is sent as a text/event-stream, and each result is serialized as JSON.</remarks>
        /// <param name="initialInvestment">The initial investment amount. Must be a decimal value representing the upfront cost.</param>
        /// <param name="cashFlows">A comma-separated string of cash flow values. Each value must be parsable as a decimal.</param>
        /// <param name="lowerBoundRate">The lower bound of the discount rate range. Must be a decimal value.</param>
        /// <param name="upperBoundRate">The upper bound of the discount rate range. Must be a decimal value greater than or equal to <paramref
        /// name="lowerBoundRate"/>.</param>
        /// <param name="increment">The increment by which the discount rate increases for each calculation. Must be a positive decimal value.</param>
        /// <param name="ct">A <see cref="CancellationToken"/> used to cancel the operation if requested.</param>
        /// <returns>This method does not return a value directly. Instead, it streams NPV calculation results to the client.
        /// Each streamed result is serialized as JSON and sent as a Server-Sent Event.</returns>
        [HttpGet("stream")]
        public async Task GetNpvStream(
            [FromQuery] decimal initialInvestment,
            [FromQuery] string cashFlows,
            [FromQuery] decimal lowerBoundRate,
            [FromQuery] decimal upperBoundRate,
            [FromQuery] decimal increment,
            [EnumeratorCancellation] CancellationToken ct)
        {
            Response.ContentType = "text/event-stream";
            Response.Headers.Add("Cache-Control", "no-cache");
            Response.Headers.Add("Connection", "keep-alive");

            var request = new NpvRequest
            {
                InitialInvestment = initialInvestment,
                CashFlows = cashFlows.Split(',').Select(decimal.Parse).ToList(),
                LowerBoundRate = lowerBoundRate,
                UpperBoundRate = upperBoundRate,
                Increment = increment
            };

            await foreach (var result in _handler.HandleAsync(request, ct))
            {
                var json = JsonSerializer.Serialize(result);
                await Response.WriteAsync($"data: {json}\n\n", ct);
                await Response.Body.FlushAsync(ct);
            }
        }
    }
}
