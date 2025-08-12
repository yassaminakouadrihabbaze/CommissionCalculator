using FCamara.CommissionCalculator.Contracts;
using Microsoft.Extensions.Options;

namespace FCamara.CommissionCalculator.Services
{
    public class CommissionCalculator : ICommissionCalculator
    {
        private readonly CommissionRateOptions _rates;

        public CommissionCalculator(IOptions<CommissionRateOptions> options)
        {
            _rates = options.Value;
        }

        public CommissionCalculationResponse Calculate(CommissionCalculationRequest request)
        {
            decimal fcamaraLocal = _rates.FCamaraLocalRate * request.LocalSalesCount * request.AverageSaleAmount;
            decimal fcamaraForeign = _rates.FCamaraForeignRate * request.ForeignSalesCount * request.AverageSaleAmount;
            decimal competitorLocal = _rates.CompetitorLocalRate * request.LocalSalesCount * request.AverageSaleAmount;
            decimal competitorForeign = _rates.CompetitorForeignRate * request.ForeignSalesCount * request.AverageSaleAmount;

            return new CommissionCalculationResponse
            {
                FCamaraCommissionAmount = decimal.Round(fcamaraLocal + fcamaraForeign, 2, MidpointRounding.AwayFromZero),
                CompetitorCommissionAmount = decimal.Round(competitorLocal + competitorForeign, 2, MidpointRounding.AwayFromZero)
            };
        }
    }
} 