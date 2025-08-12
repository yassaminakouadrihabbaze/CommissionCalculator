export default function KPI({ title, value }) {
  return (
    <div className="kpi">
      <h4>{title}</h4>
      <p className="value">{value}</p>
    </div>
  );
} 