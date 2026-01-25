import { BadgeProps } from "@/interface-and-types";
const Badge = ({ status, children }: BadgeProps) => {
  const getStatusClass = () => {
    switch (status) {
      case 'active':
        return 'badge-active';
      case 'inactive':
        return 'badge-inactive';
      case 'pending':
        return 'badge-pending';
      case 'blacklisted':
        return 'badge-blacklisted';
      default:
        return '';
    }
  };

  return <span className={`badge ${getStatusClass()}`}>{children}
  {/* <style>{`
        
        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 400;
          min-width: 80px;
        }

        .badge-active {
          background: rgba(57, 205, 98, 0.06);
          color: #39CD62;
        }

        .badge-inactive {
          background: rgba(84, 95, 125, 0.06);
          color: #545F7D;
        }

        .badge-pending {
          background: rgba(233, 178, 0, 0.06);
          color: #E9B200;
        }

        .badge-blacklisted {
          background: rgba(228, 3, 59, 0.06);
          color: #E4033B;
        }
      `}</style> */}
  </span>;
};
export default Badge