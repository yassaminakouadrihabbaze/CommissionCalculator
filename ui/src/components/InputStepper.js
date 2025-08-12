import React from 'react';

export default function InputStepper({
  id,
  label,
  value,
  onChange,
  min = 0,
  step = 1,
  type = 'number',
  hint,
  error,
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const increase = () => {
    const next = Number(value || 0) + Number(step);
    onChange(Math.max(min, Number.isFinite(next) ? next : 0));
  };

  const decrease = () => {
    const next = Number(value || 0) - Number(step);
    onChange(Math.max(min, Number.isFinite(next) ? next : 0));
  };

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="inputStepper">
        <input
          id={id}
          name={id}
          className={`input${error ? ' inputError' : ''}`}
          type={type}
          min={min}
          step={step}
          value={value}
          inputMode="numeric"
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
        <div className="stepper">
          <button
            type="button"
            aria-label={`Increase ${label}`}
            className="stepperBtn"
            onClick={increase}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="6 14 12 8 18 14" strokeLinecap="round" strokeLinejoin="round"></polyline>
            </svg>
          </button>
          <div className="stepperDivider" />
          <button
            type="button"
            aria-label={`Decrease ${label}`}
            className="stepperBtn"
            onClick={decrease}
            disabled={Number(value || 0) <= Number(min)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="6 10 12 16 18 10" strokeLinecap="round" strokeLinejoin="round"></polyline>
            </svg>
          </button>
        </div>
      </div>
      {hint && (
        <div className="hint" id={hintId}>
          {hint}
        </div>
      )}
      {error && (
        <div className="fieldError" id={errorId}>
          {error}
        </div>
      )}
    </div>
  );
} 