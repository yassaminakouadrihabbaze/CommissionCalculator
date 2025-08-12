import './App.css';
import { useState } from 'react';
import { calculateCommission } from './api/client';
import { formatGBP } from './utils/format';
import ErrorBoundary from './components/ErrorBoundary';
import InputStepper from './components/InputStepper';
import KPI from './components/KPI';

function App() {
  const [localSalesCount, setLocalSalesCount] = useState(0);
  const [foreignSalesCount, setForeignSalesCount] = useState(0);
  const [averageSaleAmount, setAverageSaleAmount] = useState(0);

  const [fieldErrors, setFieldErrors] = useState({});

  const [totalFcamaraCommission, setTotalFcamaraCommission] = useState(null);
  const [totalCompetitorCommission, setTotalCompetitorCommission] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setFieldErrors({});

    const payload = {
      localSalesCount: Number(localSalesCount),
      foreignSalesCount: Number(foreignSalesCount),
      averageSaleAmount: Number(averageSaleAmount)
    };

    const newErrors = {};
    if (localSalesCount === '' || isNaN(Number(localSalesCount))) newErrors.localSalesCount = 'Enter a valid number.';
    if (foreignSalesCount === '' || isNaN(Number(foreignSalesCount))) newErrors.foreignSalesCount = 'Enter a valid number.';
    if (averageSaleAmount === '' || isNaN(Number(averageSaleAmount))) newErrors.averageSaleAmount = 'Enter a valid amount.';

    if (payload.localSalesCount < 0) newErrors.localSalesCount = 'Must be non-negative.';
    if (payload.foreignSalesCount < 0) newErrors.foreignSalesCount = 'Must be non-negative.';
    if (payload.averageSaleAmount < 0) newErrors.averageSaleAmount = 'Must be non-negative.';

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setErrorMessage('Please correct the highlighted fields.');
      return;
    }

    try {
      setIsLoading(true);
      const data = await calculateCommission(payload);
      setTotalFcamaraCommission(data.fCamaraCommissionAmount);
      setTotalCompetitorCommission(data.competitorCommissionAmount);
    } catch (error) {
      setErrorMessage(error.message || 'Unexpected error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setLocalSalesCount(0);
    setForeignSalesCount(0);
    setAverageSaleAmount(0);
    setTotalFcamaraCommission(null);
    setTotalCompetitorCommission(null);
    setErrorMessage('');
    setFieldErrors({});
  };

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <div className="header">
            <h1 className="title">Commission Calculator</h1>
            <p className="subtitle">Compare FCamara vs Competitor commissions for your sales performance.</p>
          </div>

          <div className="content">
            <ErrorBoundary>
              <div className="grid">
                <form className="form" onSubmit={handleSubmit}>
                  {errorMessage && (
                    <p className="error" role="alert" aria-live="polite">{errorMessage}</p>
                  )}

                  <InputStepper
                    id="localSalesCount"
                    label="Local Sales Count"
                    value={localSalesCount}
                    onChange={setLocalSalesCount}
                    min={0}
                    step={1}
                    error={fieldErrors.localSalesCount}
                  />

                  <InputStepper
                    id="foreignSalesCount"
                    label="Foreign Sales Count"
                    value={foreignSalesCount}
                    onChange={setForeignSalesCount}
                    min={0}
                    step={1}
                    error={fieldErrors.foreignSalesCount}
                  />

                  <InputStepper
                    id="averageSaleAmount"
                    label="Average Sale Amount (£)"
                    value={averageSaleAmount}
                    onChange={setAverageSaleAmount}
                    min={0}
                    step={0.01}
                    type="number"
                    hint="Enter average amount per sale in GBP."
                    error={fieldErrors.averageSaleAmount}
                  />

                  <div className="actions">
                    <button className="button" type="submit" disabled={isLoading}>
                      {isLoading ? 'Calculating…' : 'Calculate'}
                    </button>
                    <button className="button buttonSecondary" type="button" disabled={isLoading} onClick={handleClear}>
                      Clear
                    </button>
                  </div>
                </form>

                <div>
                  <div className="results">
                    <div className="kpis">
                      <KPI title="FCamara Commission" value={totalFcamaraCommission !== null ? formatGBP(totalFcamaraCommission) : '—'} />
                      <KPI title="Competitor Commission" value={totalCompetitorCommission !== null ? formatGBP(totalCompetitorCommission) : '—'} />
                    </div>
                  </div>
                </div>
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
