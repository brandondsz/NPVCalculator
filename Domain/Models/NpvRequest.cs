
namespace Domain.Models
{
    public class NpvRequest
    {
        public decimal InitialInvestment { get; set; }
        public List<decimal> CashFlows { get; set; } = new();
        public decimal LowerBoundRate { get; set; }
        public decimal UpperBoundRate { get; set; }
        public decimal Increment { get; set; }

        public override string ToString()
        {
            return $"NPV Request: Investment={InitialInvestment:C}, " +
           $"CashFlows=[{string.Join(", ", CashFlows)}], " +
           $"Rates={LowerBoundRate:P2}-{UpperBoundRate:P2}, " +
           $"Increment={Increment:P2}";
        }
    }

}
