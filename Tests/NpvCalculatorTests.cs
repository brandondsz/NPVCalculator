using Domain.Exceptions;
using Domain.Models;
using Domain.Services;

namespace Tests
{
    public class NpvCalculatorTests
    {
        private readonly NpvCalculator _calculator = new();

        [Fact]
        public async Task CalculateAsync_ReturnsCorrectResults()
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

            var cancellationToken = CancellationToken.None;

            // Act
            var results = await _calculator.CalculateAsync(request, cancellationToken).ToListAsync();

            // Assert
            Assert.Equal(3, results.Count);
            Assert.Contains(results, r => r.Rate == 1.0m);
            Assert.Contains(results, r => r.Rate == 1.5m);
            Assert.Contains(results, r => r.Rate == 2.0m);
        }

        [Fact]
        public async Task CalculateAsync_CalculatesExpectedNpv()
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
            var result = await _calculator.CalculateAsync(request, CancellationToken.None).FirstAsync();

            // Expected NPV = -5000 + 1000/1.1 + 2000/1.1^2 + 3000/1.1^3
            var expected = -5000m
                + 1000m / (decimal)Math.Pow(1.1, 1)
                + 2000m / (decimal)Math.Pow(1.1, 2)
                + 3000m / (decimal)Math.Pow(1.1, 3);

            // Assert
            Assert.Equal(10.0m, result.Rate);
            Assert.Equal(Math.Round(expected, 2), result.NPV);
        }

        [Fact]
        public async Task CalculateAsync_ThrowsForNegativeInitialInvestment()
        {
            var request = new NpvRequest
            {
                InitialInvestment = -100,
                CashFlows = new List<decimal> { 1000 },
                LowerBoundRate = 1,
                UpperBoundRate = 2,
                Increment = 0.5m
            };

            var ex = await Assert.ThrowsAsync<DomainValidationException>(async () =>
            {
                await foreach (var _ in _calculator.CalculateAsync(request, CancellationToken.None))
                {
                }
            });

            Assert.Equal("Initial investment must be a positive value.", ex.Message);
        }

        [Fact]
        public async Task CalculateAsync_ThrowsForInvalidRateBounds()
        {
            var request = new NpvRequest
            {
                InitialInvestment = 1000,
                CashFlows = new List<decimal> { 1000 },
                LowerBoundRate = 5,
                UpperBoundRate = 1,
                Increment = 0.5m
            };

            var ex = await Assert.ThrowsAsync<DomainValidationException>(async () =>
            {
                await foreach (var _ in _calculator.CalculateAsync(request, CancellationToken.None))
                {
                }
            });

            Assert.Equal("Lower bound rate must be less than or equal to upper bound rate.", ex.Message);
        }

        [Fact]
        public async Task CalculateAsync_ThrowsForInvalidIncrement()
        {
            var request = new NpvRequest
            {
                InitialInvestment = 1000,
                CashFlows = new List<decimal> { 1000 },
                LowerBoundRate = 1,
                UpperBoundRate = 5,
                Increment = 0
            };

            var ex = await Assert.ThrowsAsync<DomainValidationException>(async () =>
            {
                await foreach (var _ in _calculator.CalculateAsync(request, CancellationToken.None))
                {
                }
            });

            Assert.Equal("Increment must be greater than 0.", ex.Message);
        }

        [Fact]
        public async Task CalculateAsync_CancelsOperation_WhenTokenIsCancelled()
        {
            // Arrange
            var request = new NpvRequest
            {
                InitialInvestment = 1000,
                CashFlows = new List<decimal> { 1000, 1000, 1000 },
                LowerBoundRate = 1,
                UpperBoundRate = 10,
                Increment = 1
            };

            using var cts = new CancellationTokenSource(100); // cancel after 100ms

            // Act & Assert
            await Assert.ThrowsAsync<TaskCanceledException>(async () =>
            {
                await foreach (var _ in _calculator.CalculateAsync(request, cts.Token))
                {
                }
            });
        }
    }

}
