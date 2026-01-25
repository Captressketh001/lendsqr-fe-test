import { FilterFormProps, FilterValues } from "@/interface-and-types";
import { useState, useEffect, useRef } from "react";
import { Calendar } from "lucide-react";
const FilterForm = ({ isOpen, onClose, onFilter, onReset }: FilterFormProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  });

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onFilter(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: '',
    });
    onReset();
  };

  if (!isOpen) return null;

  return (
    <div className="filter-form-overlay">
      <div className="filter-form" ref={formRef}>
        <div className="filter-form-group">
          <label htmlFor="organization">Organization</label>
          <select
            id="organization"
            name="organization"
            value={filters.organization}
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">Select</option>
            <option value="lendsqr">Lendsqr</option>
            <option value="lendstar">Lendstar</option>
            <option value="irorun">Irorun</option>
          </select>
        </div>

        <div className="filter-form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="User"
            value={filters.username}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        <div className="filter-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={filters.email}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        <div className="filter-form-group">
          <label htmlFor="date">Date</label>
          <div className="date-input-wrapper">
            <input
              type="date"
              id="date"
              name="date"
              placeholder="Date"
              value={filters.date}
              onChange={handleChange}
              className="filter-input filter-date"
            />
            <Calendar size={16} className="date-icon" />
          </div>
        </div>

        <div className="filter-form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            value={filters.phoneNumber}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        <div className="filter-form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="filter-select"
          >
            <option value="">Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="blacklisted">Blacklisted</option>
          </select>
        </div>

        <div className="filter-form-actions">
          <button type="button" onClick={handleReset} className="filter-reset-btn">
            Reset
          </button>
          <button type="button" onClick={handleSubmit} className="filter-submit-btn">
            Filter
          </button>
        </div>
      </div>
      <style>
        {`
            /* Filter Form Styles */
        .filter-form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 999;
          background: transparent;
        }

        .filter-form {
          position: absolute;
          background: #FFFFFF;
          border: 1px solid #04498580;
          border-radius: 4px;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
          padding: 30px;
          width: 270px;
          z-index: 1000;
        }

        .filter-form-group {
          margin-bottom: 20px;
        }

        .filter-form-group:last-of-type {
          margin-bottom: 30px;
        }

        .filter-form-group label {
          display: block;
          font-size: 14px;
          color: #545F7D;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .filter-input,
        .filter-select {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #D4D4D4;
          border-radius: 8px;
          font-size: 14px;
          color: #545F7D;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s ease;
          background: #FFFFFF;
        }

        .filter-input:focus,
        .filter-select:focus {
          border-color: #39CDCC;
        }

        .filter-input::placeholder {
          color: #9CA3AF;
        }

        .filter-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L7 7L13 1' stroke='%23545F7D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 40px;
          cursor: pointer;
        }

        .date-input-wrapper {
          position: relative;
        }

        .filter-date {
          padding-right: 40px;
        }

        .date-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #545F7D;
          pointer-events: none;
        }

        .filter-form-actions {
          display: flex;
          gap: 14px;
        }

        .filter-reset-btn,
        .filter-submit-btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .filter-reset-btn {
          background: transparent;
          color: #545F7D;
          border: 1px solid #545F7D;
        }

        .filter-reset-btn:hover {
          background: rgba(84, 95, 125, 0.05);
        }

        .filter-submit-btn {
          background: #39CDCC;
          color: #FFFFFF;
        }

        .filter-submit-btn:hover {
          background: #2DB8B7;
        }

        `}
      </style>
    </div>
  );
};
export default FilterForm