using Domain.Exceptions;
using Domain.Interfaces;
using Domain.Models;
using System.Runtime.CompilerServices;

namespace Domain.Services;


public class NpvCalculator : INpvCalculator
{
    public async IAsyncEnumerable<NpvResult> CalculateAsync(NpvRequest request, [EnumeratorCancellation] CancellationToken ct)
    {
        ValidateRequest(request);

        for (var rate = request.LowerBoundRate; rate <= request.UpperBoundRate; rate += request.Increment)
        {
            ct.ThrowIfCancellationRequested();
            var npv = CalculateSingleNpv(request, rate);
            await Task.Delay(100, ct); // Simulate processing time

            yield return new NpvResult(rate, npv);
        }
    }

    private decimal CalculateSingleNpv(NpvRequest request, decimal rate)
    {
        decimal rateDecimal = rate / 100m;
        decimal npv = -request.InitialInvestment;
        for (int t = 0; t < request.CashFlows.Count; t++)
        {
            npv += request.CashFlows[t] / (decimal)Math.Pow(1 + (double)rateDecimal, t + 1);
        }
        return Math.Round(npv, 2);
    }

    private void ValidateRequest(NpvRequest request)
    {
        if (request.InitialInvestment < 0)
        {
            throw new DomainValidationException("Initial investment must be a positive value.");
        }
        if (request.LowerBoundRate > request.UpperBoundRate)
        {
            throw new DomainValidationException("Lower bound rate must be less than or equal to upper bound rate.");
        }
        if (request.Increment <= 0)
        {
            throw new DomainValidationException("Increment must be greater than 0.");
        }
    }
}
