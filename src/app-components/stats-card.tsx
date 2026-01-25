import { TrendingUp, TrendingDown } from "lucide-react";

const StatsCard = ({ icon, label, value, iconColor, iconBgColor, trend }: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconColor: string;
  iconBgColor: string;
  trend?: { value: number; isPositive: boolean };
} ) => {
  return (
    <div className="stats-card">
      <div className="icon-wrapper" style={{ backgroundColor: iconBgColor }}>
        <div style={{ color: iconColor }}>{icon}</div>
      </div>
      <p className="label">{label}</p>
      <div className="stats-row">
        <h2 className="value">{value}</h2>
        {trend && (
          <div className={`trend ${trend.isPositive ? 'positive' : 'negative'}`}>
            {trend.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default StatsCard