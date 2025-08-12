import './App.css';
import { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5112/api';

function ChevronUp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="6 14 12 8 18 14" strokeLinecap="round" strokeLinejoin="round"></polyline>
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="6 10 12 16 18 10" strokeLinecap="round" strokeLinejoin="round"></polyline>
    </svg>
  );
}

function App() {
  const [localSalesCount, setLocalSalesCount] = useState(0);
  const [foreignSalesCount, setForeignSalesCount] = useState(0);
  const [averageSaleAmount, setAverageSaleAmount] = useState(0);

  const [totalFcamaraCommission, setTotalFcamaraCommission] = useState(null);
  const [totalCompetitorCommission, setTotalCompetitorCommission] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    const payload = {
      localSalesCount: Number(localSalesCount),
      foreignSalesCount: Number(foreignSalesCount),
      averageSaleAmount: Number(averageSaleAmount)
    };

    if (payload.localSalesCount < 0 || payload.foreignSalesCount < 0 || payload.averageSaleAmount < 0) {
      setErrorMessage('All values must be non-negative.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/commission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const problem = await response.json().catch(() => null);
        const detail = problem?.detail || problem?.title || 'Failed to calculate commission.';
        throw new Error(detail);
      }

      const data = await response.json();
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
  };

  const selectOnFocus = (e) => {
    // Select all text so typing replaces the current value (e.g., default 0)
    e.target.select();
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
            <div className="grid">
              <form className="form" onSubmit={handleSubmit}>
                {errorMessage && <p className="error">{errorMessage}</p>}

                <div className="field">
                  <label htmlFor="localSalesCount">Local Sales Count</label>
                  <div className="inputStepper">
                    <input
                      id="localSalesCount"
                      name="localSalesCount"
                      className="input"
                      type="number"
                      min="0"
                      step="1"
                      value={localSalesCount}
                      onChange={(e) => setLocalSalesCount(e.target.value)}
                      onFocus={selectOnFocus}
                    />
                    <div className="stepper">
                      <button
                        type="button"
                        aria-label="Increase local sales count"
                        className="stepperBtn"
                        onClick={() => setLocalSalesCount((prev) => Math.max(0, Number(prev || 0) + 1))}
                      >
                        <ChevronUp />
                      </button>
                      <div className="stepperDivider" />
                      <button
                        type="button"
                        aria-label="Decrease local sales count"
                        className="stepperBtn"
                        onClick={() => setLocalSalesCount((prev) => Math.max(0, Number(prev || 0) - 1))}
                      >
                        <ChevronDown />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="foreignSalesCount">Foreign Sales Count</label>
                  <div className="inputStepper">
                    <input
                      id="foreignSalesCount"
                      name="foreignSalesCount"
                      className="input"
                      type="number"
                      min="0"
                      step="1"
                      value={foreignSalesCount}
                      onChange={(e) => setForeignSalesCount(e.target.value)}
                      onFocus={selectOnFocus}
                    />
                    <div className="stepper">
                      <button
                        type="button"
                        aria-label="Increase foreign sales count"
                        className="stepperBtn"
                        onClick={() => setForeignSalesCount((prev) => Math.max(0, Number(prev || 0) + 1))}
                      >
                        <ChevronUp />
                      </button>
                      <div className="stepperDivider" />
                      <button
                        type="button"
                        aria-label="Decrease foreign sales count"
                        className="stepperBtn"
                        onClick={() => setForeignSalesCount((prev) => Math.max(0, Number(prev || 0) - 1))}
                      >
                        <ChevronDown />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="averageSaleAmount">Average Sale Amount (£)</label>
                  <div className="inputStepper">
                    <input
                      id="averageSaleAmount"
                      name="averageSaleAmount"
                      className="input"
                      type="number"
                      min="0"
                      step="0.01"
                      value={averageSaleAmount}
                      onChange={(e) => setAverageSaleAmount(e.target.value)}
                      onFocus={selectOnFocus}
                    />
                    <div className="stepper">
                      <button
                        type="button"
                        aria-label="Increase average sale amount"
                        className="stepperBtn"
                        onClick={() => setAverageSaleAmount((prev) => {
                          const next = Number(prev || 0) + 0.01;
                          return Math.max(0, Math.round(next * 100) / 100);
                        })}
                      >
                        <ChevronUp />
                      </button>
                      <div className="stepperDivider" />
                      <button
                        type="button"
                        aria-label="Decrease average sale amount"
                        className="stepperBtn"
                        onClick={() => setAverageSaleAmount((prev) => {
                          const next = Number(prev || 0) - 0.01;
                          return Math.max(0, Math.round(next * 100) / 100);
                        })}
                      >
                        <ChevronDown />
                      </button>
                    </div>
                  </div>
                  <div className="hint">Enter average amount per sale in GBP.</div>
                </div>

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
                    <div className="kpi">
                      <h4>FCamara Commission</h4>
                      <p className="value">
                        {totalFcamaraCommission !== null ? `£${Number(totalFcamaraCommission).toFixed(2)}` : '—'}
                      </p>
                    </div>
                    <div className="kpi">
                      <h4>Competitor Commission</h4>
                      <p className="value">
                        {totalCompetitorCommission !== null ? `£${Number(totalCompetitorCommission).toFixed(2)}` : '—'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
