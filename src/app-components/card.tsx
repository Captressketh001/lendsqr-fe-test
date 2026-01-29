import { StatsCardProps } from "@/interface-and-types"
const StatsCard = ({ 
  icon, 
  label, 
  value, 
  iconColor = '#DF18FF',
  iconBgColor = '#FFF0FF'
}: StatsCardProps) => {
  return (
    <div className="stats-card">
      <div className="icon-wrapper" style={{ backgroundColor: iconBgColor }}>
        <div style={{ color: iconColor }}>
          {icon}
        </div>
      </div>
      <p className="label">{label}</p>
      <h2 className="value">{value}</h2>
      
    </div>
    
  );
};
export default StatsCard