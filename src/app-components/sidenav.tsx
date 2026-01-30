import  { useState } from 'react';
import {
  ChevronDown,
  X,
} from 'lucide-react';

import { SidebarSection } from '@/interface-and-types';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [organizationOpen, setOrganizationOpen] = useState(true);

  const sidebarSections: SidebarSection[] = [
    {
      items: [
        { icon: <img src="/dashboard.svg"/>, label: 'Dashboard', path: '/dashboard' },
      ],
    },
    {
      title: 'CUSTOMERS',
      items: [
        { icon: <img src="/users.svg"/>, label: 'Users', path: '/users' },
        { icon: <img src="/guarantor.svg"/>, label: 'Guarantors', path: '/guarantors' },
        { icon: <img src="/loan.svg"/>, label: 'Loans', path: '/loans' },
        { icon: <img src="/decision.svg"/>, label: 'Decision Models', path: '/decision-models' },
        { icon: <img src="/savings.svg"/>, label: 'Savings', path: '/savings' },
        { icon: <img src="/loan-request.svg"/>, label: 'Loan Requests', path: '/loan-requests' },
        { icon: <img src="/whitelist.svg"/>, label: 'Whitelist', path: '/whitelist' },
        { icon: <img src="/karma.svg"/>, label: 'Karma', path: '/karma' },
      ],
    },
    {
      title: 'BUSINESSES',
      items: [
        { icon: <img src="/organisation.svg"/>, label: 'Organization', path: '/organization' },
        { icon: <img src="/loan-request.svg"/>, label: 'Loan Products', path: '/loan-products' },
        { icon: <img src="/saving-product.svg"/>, label: 'Savings Products', path: '/savings-products' },
        { icon: <img src="/fee.svg"/>, label: 'Fees and Charges', path: '/fees' },
        { icon: <img src="/transaction.svg"/>, label: 'Transactions', path: '/transactions' },
        { icon: <img src="/services.svg"/>, label: 'Services', path: '/services' },
        { icon: <img src="/service-account.svg"/>, label: 'Service Account', path: '/service-account' },
        { icon: <img src="/settlement.svg"/>, label: 'Settlements', path: '/settlements' },
        { icon: <img src="/report.svg"/>, label: 'Reports', path: '/reports' },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        { icon: <img src="/preference.svg"/>, label: 'Preferences', path: '/preferences' },
        { icon: <img src="/pricing.svg"/>, label: 'Fees and Pricing', path: '/pricing' },
        { icon: <img src="/audit.svg"/>, label: 'Audit Logs', path: '/audit-logs' },
         { icon: <img src="/system-messages.svg"/>, label: 'Systems Messages', path: '/system-messages' },
      ],
    },
  ];

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <button className="sidebar-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="sidebar-logo">
          <img onClick={() => navigate('/')} src='/logo.svg'/>
        </div>

        <div className="sidebar-organization">
          <button 
            className="organization-btn"
            onClick={() => setOrganizationOpen(!organizationOpen)}
          >
            <img src="/organisation.svg"/>
            <span>Switch Organization</span>
            <ChevronDown size={16} className={organizationOpen ? 'rotate' : ''} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {sidebarSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="sidebar-section">
              {section.title && (
                <div className="sidebar-section-title">{section.title}</div>
              )}
              <ul className="sidebar-menu">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} >
                    <button
                      className={`sidebar-menu-item ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={() => {
                        navigate(item.path)
                        onClose();
                      }}
                    >
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-label">{item.label}</span>
                      {item.badge && (
                        <span className="menu-badge">{item.badge}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        
        <div className="sidebar-version-container">
          <div className="sidebar-organization">
          <button 
            className="organization-btn"
          >
            <img src="/sign-out.svg"/>
            <span>Logout</span>
          </button>
        </div>
        <div className="sidebar-version">
          v1.2.0
        </div>
        </div>
      </aside>
    </>
  );
};
export default Sidebar