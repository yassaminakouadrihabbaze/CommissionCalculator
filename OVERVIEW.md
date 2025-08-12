# Commission Calculator – Overview

## What it is
- .NET 8 Web API + React (CRA) app to compare FCamara vs competitor commissions.

## How to run
- Windows: double‑click `start-dev.cmd`
  - API: http://localhost:5112 (Swagger at `/swagger`)
  - UI: http://localhost:3000
- Manual:
  - API: `cd api && dotnet run --urls http://localhost:5112`
  - UI: `cd ui && npm install && npm start`

## Endpoint
- POST `/api/commission`
  - Body: `{ localSalesCount, foreignSalesCount, averageSaleAmount }`
  - Returns: `{ fCamaraCommissionAmount, competitorCommissionAmount }`
- Legacy alias kept for compatibility: POST `/Commision`

## Configuration
- `api/appsettings.json` → `CommissionRates` section
  - `FCamaraLocalRate`, `FCamaraForeignRate`, `CompetitorLocalRate`, `CompetitorForeignRate`

## Architecture
- `Contracts/` – DTOs with data annotations (validation)
- `Services/` – `ICommissionCalculator` + implementation
- `Controllers/CommissionController.cs` – thin controller at `api/commission`
- `Program.cs` – DI, options binding, ProblemDetails, Swagger, CORS

## Key practices
- Separation of concerns (controller vs service)
- Options pattern for rates (config‑driven)
- Automatic model validation + Problem Details responses
- Clean, versionable routing (`api/commission`), legacy route supported
- Dev CORS for UI localhost

## Future improvements
- Unit tests for service logic
- CI build/test pipeline
- Remove unused `ui/my-app` prototype when confirmed 