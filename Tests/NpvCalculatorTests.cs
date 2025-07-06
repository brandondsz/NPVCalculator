using Domain.Interfaces;
using Domain.Models;
using Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class NpvCalculatorTests
    {
        private readonly INpvCalculator _calculator;

        public NpvCalculatorTests()
        {
            _calculator = new NpvCalculator();
        }

        [Fact]
        public void Calculate_WithValidInputs_ReturnsCorrectNumberOfResults()
        {
            // Arrange
            var request = new NpvRequest
            {
                InitialInvestment = 10000,
                CashFlows = new List<decimal> { 2000, 2500, 3000 },
                LowerBoundRate = 1.0m,
                UpperBoundRate = 2.0m,
                Increment = 0.5m
            };

            // Act
            var results = _calculator.Calculate(request).ToList();

            // Assert
            Assert.Equal(3, results.Count);
            Assert.Contains(results, r => r.Rate == 1.0m);
            Assert.Contains(results, r => r.Rate == 1.5m);
            Assert.Contains(results, r => r.Rate == 2.0m);
        }

        [Fact]
        public void Calculate_ReturnsExpectedNPVValues()
        {
            // Arrange
            var request = new NpvRequest
            {
                InitialInvestment = 5000,
                CashFlows = new List<decimal> { 1000, 2000, 3000 },
                LowerBoundRate = 10.0m,
                UpperBoundRate = 10.0m,
                Increment = 1.0m
            };

            // Act
            var result = _calculator.Calculate(request).First();

            // NPV = -5000 + (1000 / 1.1^1 + 2000 / 1.1^2 + 3000 / 1.1^3)
            var expectedNpv = -5000m
                + 1000m / (decimal)Math.Pow(1.1, 1)
                + 2000m / (decimal)Math.Pow(1.1, 2)
                + 3000m / (decimal)Math.Pow(1.1, 3);

            // Assert
            Assert.Equal(10.0m, result.Rate);
            Assert.Equal(Math.Round(expectedNpv, 2), result.NPV);
        }

        [Fact]
        public void Calculate_WithEmptyCashFlows_ReturnsOnlyNegativeInitialInvestment()
        {
            // Arrange
            var request = new NpvRequest
            {
                InitialInvestment = 5000,
                CashFlows = new List<decimal>(),
                LowerBoundRate = 5.0m,
                UpperBoundRate = 5.0m,
                Increment = 1.0m
            };

            // Act
            var result = _calculator.Calculate(request).First();

            // Assert
            Assert.Equal(-5000m, result.NPV);
        }

        [Fact]
        public void Calculate_WithHighPrecisionInputs_ReturnsPreciseResults()
        {
            // Arrange
            var request = new NpvRequest
            {
                InitialInvestment = 12345.67m,
                CashFlows = new List<decimal> { 1000.12m, 2000.56m },
                LowerBoundRate = 1.23m,
                UpperBoundRate = 1.23m,
                Increment = 0.0001m
            };

            // Act
            var result = _calculator.Calculate(request).First();

            // Assert
            Assert.Equal(1.23m, result.Rate);
            Assert.InRange(result.NPV, -9405.47m, -9405.45m); // Verify in reasonable range
        }
    }
}
