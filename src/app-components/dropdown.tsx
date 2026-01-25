import { useState, useEffect, useRef } from "react";
import { MoreVertical } from "lucide-react";
import { DropdownProps } from "@/interface-and-types";
const Dropdown = ({ items, trigger }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button
        className="dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger || <MoreVertical size={16} />}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {items.map((item, index) => (
            <button
              key={index}
              className="dropdown-item"
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              <span className="dropdown-icon">{item.icon}</span>
              <span className="dropdown-label">{item.label}</span>
            </button>
          ))}
        </div>
      )}
      <style>{`
        

        /* Dropdown Styles */
        .dropdown-container {
          position: relative;
          display: inline-block;
        }

        .dropdown-trigger {
          background: none;
          border: none;
          cursor: pointer;
          color: #545F7D;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.2s ease;
        }

        .dropdown-trigger:hover {
          background: #F5F5F7;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: #FFFFFF;
          border: 1px solid #04498580;
          border-radius: 4px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
          min-width: 180px;
          z-index: 1000;
          overflow: hidden;
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          background: none;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
          font-family: inherit;
          text-align: left;
        }

        .dropdown-item:hover {
          background: #F5F7FA;
        }

        .dropdown-item:not(:last-child) {
          border-bottom: 1px solid #EDF1F7;
        }

        .dropdown-icon {
          display: flex;
          align-items: center;
          color: #545F7D;
        }

        .dropdown-label {
          font-size: 14px;
          color: #545F7D;
          font-weight: 400;
        }
        }
      `}</style>
    </div>
  );
};

export default Dropdown