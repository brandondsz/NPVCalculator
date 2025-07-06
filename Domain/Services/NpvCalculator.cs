using Domain.Interfaces;
using Domain.Models;

namespace Domain.Services;


public class NpvCalculator : INpvCalculator
{
    public IEnumerable<NpvResult> Calculate(NpvRequest request)
    {
        var results = new List<NpvResult>();

        for (decimal rate = request.LowerBoundRate; rate <= request.UpperBoundRate; rate += request.Increment)
        {
            decimal rateDecimal = rate / 100m;
            decimal npv = -request.InitialInvestment;

            for (int t = 0; t < request.CashFlows.Count; t++)
            {
                npv += request.CashFlows[t] / (decimal)Math.Pow(1 + (double)rateDecimal, t + 1);
            }

            results.Add(new NpvResult
            {
                Rate = rate,
                NPV = Math.Round(npv, 2)
            });
        }

        return results;
    }
}
