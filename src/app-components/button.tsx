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
      <style>{`
        .button-group,
        .badge-group {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        /* Button Styles */
        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: inherit;
          letter-spacing: 0.3px;
        }

        .btn-primary {
          background: #39CDCC;
          color: #FFFFFF;
        }

        .btn-primary:hover {
          background: #2DB8B7;
        }

        .btn-secondary {
          background: #213F7D;
          color: #FFFFFF;
        }

        .btn-secondary:hover {
          background: #1A3261;
        }

        .btn-danger {
          background: #E4033B;
          color: #FFFFFF;
        }

        .btn-danger:hover {
          background: #C7032F;
        }

        .btn-outlined {
          background: transparent;
          color: #E4033B;
          border: 1px solid #E4033B;
        }

        .btn-outlined:hover {
          background: rgba(228, 3, 59, 0.05);
        }

        .btn-small {
          padding: 8px 16px;
          font-size: 12px;
        }

        .btn-medium {
          padding: 12px 24px;
          font-size: 14px;
        }

        .btn-large {
          padding: 16px 32px;
          font-size: 16px;
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

       

        

        

        

        @media (max-width: 480px) {
          .button-group,
          .badge-group {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }
        }
      `}</style>
    </button>
  );
};
export default Button