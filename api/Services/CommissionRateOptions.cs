namespace FCamara.CommissionCalculator.Services
{
    public class CommissionRateOptions
    {
        public decimal FCamaraLocalRate { get; set; } = 0.20m;
        public decimal FCamaraForeignRate { get; set; } = 0.35m;
        public decimal CompetitorLocalRate { get; set; } = 0.02m;
        public decimal CompetitorForeignRate { get; set; } = 0.0755m;
    }
} 