using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KarnatakaApis.Models
{
    public class ConsolidatedModel : BalanceModel
    {
        public double value_present { get; set; }
        public double value_last { get; set; }
        public double porcent_present { get; set; }
        public double porcent_last { get; set; }
    }
}
