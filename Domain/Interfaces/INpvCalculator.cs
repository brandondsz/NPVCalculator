using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface INpvCalculator
    {
        IAsyncEnumerable<NpvResult> CalculateAsync(NpvRequest request, CancellationToken ct = default);
    }
}
