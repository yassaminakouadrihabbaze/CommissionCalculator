using FCamara.CommissionCalculator.Contracts;

namespace FCamara.CommissionCalculator.Services
{
    public interface ICommissionCalculator
    {
        CommissionCalculationResponse Calculate(CommissionCalculationRequest request);
    }
} 