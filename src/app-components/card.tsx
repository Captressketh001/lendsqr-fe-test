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
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #FBFBFB;
        }

        .app-container {
          padding: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .demo-title {
          font-size: 32px;
          color: #213F7D;
          margin-bottom: 40px;
          font-weight: 600;
        }

        .demo-section {
          margin-bottom: 50px;
        }

        .demo-section h3 {
          font-size: 20px;
          color: #545F7D;
          margin-bottom: 20px;
          font-weight: 500;
        }

        /* Stats Card Styles */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 26px;
        }

        .stats-card {
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 4px;
          padding: 30px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .stats-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }

        .label {
          font-size: 14px;
          color: #545F7D;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .value {
          font-size: 24px;
          color: #213F7D;
          font-weight: 600;
        }

        /* Search Bar Styles */
        .search-bar {
          display: flex;
          max-width: 400px;
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 14px 20px;
          font-size: 14px;
          color: #213F7D;
          font-family: inherit;
        }

        .search-input::placeholder {
          color: #9CA3AF;
        }

        .search-button {
          background: #39CDCC;
          border: none;
          padding: 0 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
          color: #FFFFFF;
        }

        .search-button:hover {
          background: #2DB8B7;
        }

        .search-button:active {
          transform: scale(0.98);
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .app-container {
            padding: 20px;
          }

          .demo-title {
            font-size: 24px;
            margin-bottom: 30px;
          }

          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
          }

          .stats-card {
            padding: 20px;
          }

          .value {
            font-size: 20px;
          }

          .search-bar {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .demo-section h3 {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
    
  );
};
export default StatsCard