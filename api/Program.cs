
namespace FCamara.CommissionCalculator
{
    using FCamara.CommissionCalculator.Services;

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddProblemDetails();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Options
            builder.Services.Configure<CommissionRateOptions>(builder.Configuration.GetSection("CommissionRates"));

            // DI
            builder.Services.AddSingleton<ICommissionCalculator, CommissionCalculator>();

            // CORS for local dev UI
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontendDev", policyBuilder =>
                {
                    policyBuilder
                        .WithOrigins(
                            "http://localhost:3000",
                            "https://localhost:3000",
                            "http://localhost:3001",
                            "https://localhost:3001"
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            if (!app.Environment.IsDevelopment())
            {
                app.UseHttpsRedirection();
            }

            app.UseCors("AllowFrontendDev");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
