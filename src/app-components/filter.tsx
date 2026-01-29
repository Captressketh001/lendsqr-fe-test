import React, { useRef, useEffect, useState } from 'react';

interface FilterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onFilter: (filters: FilterValues) => void;
  onReset: () => void;
}

export interface FilterValues {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="filter-form-wrapper">
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
    </div>
  );
};

export default FilterForm;