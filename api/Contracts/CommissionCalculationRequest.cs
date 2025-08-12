using System.ComponentModel.DataAnnotations;

namespace FCamara.CommissionCalculator.Contracts
{
    public class CommissionCalculationRequest
    {
        [Range(0, int.MaxValue, ErrorMessage = "Local sales count must be non-negative.")]
        public int LocalSalesCount { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Foreign sales count must be non-negative.")]
        public int ForeignSalesCount { get; set; }

        [Range(typeof(decimal), "0", "79228162514264337593543950335", ErrorMessage = "Average sale amount must be non-negative.")]
        public decimal AverageSaleAmount { get; set; }
    }
} 