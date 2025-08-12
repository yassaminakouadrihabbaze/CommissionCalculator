const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5112/api';

export async function calculateCommission(payload) {
  const response = await fetch(`${BASE_URL}/commission`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const problem = await response.json().catch(() => null);
    const detail = problem?.detail || problem?.title || 'Failed to calculate commission.';
    throw new Error(detail);
  }

  return response.json();
} 