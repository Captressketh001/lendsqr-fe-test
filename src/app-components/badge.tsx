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

  return <span className={`badge ${getStatusClass()}`}>{children}</span>;
};
export default Badge