import { ButtonProps } from '@/interface-and-types';

const Button  = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button