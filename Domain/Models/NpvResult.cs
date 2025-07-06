using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class NpvResult
    {
        public NpvResult(decimal rate, decimal npv)
        {
            this.Rate = rate;
            this.NPV = npv;
        }
        public decimal Rate { get; set; }
        public decimal NPV { get; set; }
    }
}
