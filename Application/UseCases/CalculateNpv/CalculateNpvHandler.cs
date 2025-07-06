using Domain.Interfaces;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Application.UseCases.CalculateNpv
{
    public class CalculateNpvHandler
    {
        private readonly INpvCalculator _calculator;

        public CalculateNpvHandler(INpvCalculator calculator)
        {
            _calculator = calculator;
        }

        public async IAsyncEnumerable<NpvResult> HandleAsync(
            NpvRequest request,
            [EnumeratorCancellation] CancellationToken ct)
        {
            await foreach (var result in _calculator.CalculateAsync(request, ct))
            {
                yield return result;
            }
        }
    }
}
