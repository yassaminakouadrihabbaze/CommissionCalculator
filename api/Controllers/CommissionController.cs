using FCamara.CommissionCalculator.Contracts;
using FCamara.CommissionCalculator.Services;
using Microsoft.AspNetCore.Mvc;

namespace FCamara.CommissionCalculator.Controllers
{
    [ApiController]
    [Route("api/commission")]
    [Produces("application/json")]
    public class CommissionController : ControllerBase
    {
        private readonly ICommissionCalculator _calculator;

        public CommissionController(ICommissionCalculator calculator)
        {
            _calculator = calculator;
        }

        [HttpPost]
        [ProducesResponseType(typeof(CommissionCalculationResponse), 200)]
        [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
        public IActionResult Calculate([FromBody] CommissionCalculationRequest calculationRequest)
        {
            if (!ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var response = _calculator.Calculate(calculationRequest);
            return Ok(response);
        }

        // Backwards-compatibility: support legacy route used by the UI earlier
        [HttpPost("/Commision")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public IActionResult CalculateLegacy([FromBody] CommissionCalculationRequest calculationRequest)
        {
            return Calculate(calculationRequest);
        }
    }
} 