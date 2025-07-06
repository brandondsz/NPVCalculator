using Domain.Interfaces;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public IEnumerable<NpvResult> Handle(NpvRequest request)
        {
            return _calculator.Calculate(request);
        }
    }
}
