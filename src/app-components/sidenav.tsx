import  { useState } from 'react';
import {
  Home,
  Users,
  UserCheck,
  UserX,
  Briefcase,
  PiggyBank,
  HandCoins,
  UserCog,
  Scroll,
  BarChart3,
  Sliders,
  Award,
  ClipboardList,
  FileText,
//   Settings,
//   UserCircle,
  Building2,
  ChevronDown,
//   Menu,
  X,
//   Bell,
//   Search,
//   LogOut,
} from 'lucide-react';

import { SidebarSection } from '@/interface-and-types';

// Sidebar Component
const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeItem, setActiveItem] = useState('Users');
  const [organizationOpen, setOrganizationOpen] = useState(true);

  const sidebarSections: SidebarSection[] = [
    {
      items: [
        { icon: <Home size={16} />, label: 'Dashboard', path: '/dashboard' },
      ],
    },
    {
      title: 'CUSTOMERS',
      items: [
        { icon: <UserCheck size={16} />, label: 'Users', path: '/users' },
        { icon: <Users size={16} />, label: 'Guarantors', path: '/guarantors' },
        { icon: <Briefcase size={16} />, label: 'Loans', path: '/loans' },
        { icon: <HandCoins size={16} />, label: 'Decision Models', path: '/decision-models' },
        { icon: <PiggyBank size={16} />, label: 'Savings', path: '/savings' },
        { icon: <HandCoins size={16} />, label: 'Loan Requests', path: '/loan-requests' },
        { icon: <UserCog size={16} />, label: 'Whitelist', path: '/whitelist' },
        { icon: <UserX size={16} />, label: 'Karma', path: '/karma' },
      ],
    },
    {
      title: 'BUSINESSES',
      items: [
        { icon: <Briefcase size={16} />, label: 'Organization', path: '/organization' },
        { icon: <HandCoins size={16} />, label: 'Loan Products', path: '/loan-products' },
        { icon: <PiggyBank size={16} />, label: 'Savings Products', path: '/savings-products' },
        { icon: <FileText size={16} />, label: 'Fees and Charges', path: '/fees' },
        { icon: <ClipboardList size={16} />, label: 'Transactions', path: '/transactions' },
        { icon: <Building2 size={16} />, label: 'Services', path: '/services' },
        { icon: <UserCog size={16} />, label: 'Service Account', path: '/service-account' },
        { icon: <Scroll size={16} />, label: 'Settlements', path: '/settlements' },
        { icon: <BarChart3 size={16} />, label: 'Reports', path: '/reports' },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        { icon: <Sliders size={16} />, label: 'Preferences', path: '/preferences' },
        { icon: <Award size={16} />, label: 'Fees and Pricing', path: '/pricing' },
        { icon: <ClipboardList size={16} />, label: 'Audit Logs', path: '/audit-logs' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Mobile Close Button */}
        <button className="sidebar-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="sidebar-logo">
          <img src='/logo.svg'/>
        </div>

        {/* Organization Dropdown */}
        <div className="sidebar-organization">
          <button 
            className="organization-btn"
            onClick={() => setOrganizationOpen(!organizationOpen)}
          >
            <Briefcase size={16} />
            <span>Switch Organization</span>
            <ChevronDown size={16} className={organizationOpen ? 'rotate' : ''} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {sidebarSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="sidebar-section">
              {section.title && (
                <div className="sidebar-section-title">{section.title}</div>
              )}
              <ul className="sidebar-menu">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <button
                      className={`sidebar-menu-item ${activeItem === item.label ? 'active' : ''}`}
                      onClick={() => {
                        setActiveItem(item.label);
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

        {/* Version */}
        <div className="sidebar-version">
          v1.2.0
        </div>
        <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #FBFBFB;
          overflow-x: hidden;
        }

        .dashboard-layout {
          display: flex;
          min-height: 100vh;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 283px;
          background: #FFFFFF;
          border-right: 1px solid #E5E5E5;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          overflow-y: auto;
          transition: transform 0.3s ease;
          z-index: 1000;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.05);
        }

        .sidebar::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar::-webkit-scrollbar-track {
          background: transparent;
        }

        .sidebar::-webkit-scrollbar-thumb {
          background: #D4D4D4;
          border-radius: 3px;
        }

        .sidebar-close-btn {
          display: none;
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: #213F7D;
          cursor: pointer;
          z-index: 10;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 30px 30px 20px;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 700;
          color: #213F7D;
        }

        .sidebar-organization {
          padding: 0 30px 30px;
        }

        .organization-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0;
          background: none;
          border: none;
          color: #213F7D;
          font-size: 16px;
          cursor: pointer;
          font-family: inherit;
        }

        .organization-btn svg:last-child {
          margin-left: auto;
          transition: transform 0.3s ease;
        }

        .organization-btn svg:last-child.rotate {
          transform: rotate(180deg);
        }

        .sidebar-nav {
          padding-bottom: 30px;
        }

        .sidebar-section {
          margin-bottom: 30px;
        }

        .sidebar-section-title {
          font-size: 12px;
          color: #545F7D;
          font-weight: 500;
          padding: 0 30px;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
        }

        .sidebar-menu {
          list-style: none;
        }

        .sidebar-menu-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 30px;
          background: none;
          border: none;
          border-left: 3px solid transparent;
          color: #213F7D;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          text-align: left;
          opacity: 0.6;
        }

        .sidebar-menu-item:hover {
          opacity: 1;
          background: rgba(33, 63, 125, 0.02);
        }

        .sidebar-menu-item.active {
          background: rgba(57, 205, 204, 0.06);
          border-left-color: #39CDCC;
          opacity: 1;
        }

        .menu-icon {
          display: flex;
          align-items: center;
          color: #213F7D;
        }

        .menu-label {
          flex: 1;
        }

        .menu-badge {
          background: #39CDCC;
          color: #FFFFFF;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 10px;
        }

        .sidebar-version {
          padding: 30px;
          color: #213F7D;
          font-size: 12px;
          opacity: 0.4;
          text-align: center;
          border-top: 1px solid #E5E5E5;
          margin-top: auto;
        }

        .sidebar-overlay {
          display: none;
        }

        /* Header Styles */
        .header {
          height: 100px;
          background: #FFFFFF;
          border-bottom: 1px solid #E5E5E5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #213F7D;
          cursor: pointer;
          padding: 8px;
        }

        .header-logo-mobile {
          display: none;
          align-items: center;
          gap: 8px;
        }

        .header-search {
          display: flex;
          max-width: 400px;
          flex: 1;
          background: #FFFFFF;
          border: 1px solid #E5E5E5;
          border-radius: 8px;
          overflow: hidden;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 12px 16px;
          font-size: 14px;
          color: #213F7D;
          font-family: inherit;
        }

        .search-input::placeholder {
          color: #9CA3AF;
        }

        .search-btn {
          background: #39CDCC;
          border: none;
          padding: 0 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 40px;
        }

        .header-link {
          color: #213F7D;
          text-decoration: underline;
          font-size: 16px;
          transition: opacity 0.2s ease;
        }

        .header-link:hover {
          opacity: 0.7;
        }

        .header-icon-btn {
          background: none;
          border: none;
          color: #213F7D;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          border-radius: 50%;
          transition: background 0.2s ease;
        }

        .header-icon-btn:hover {
          background: rgba(33, 63, 125, 0.05);
        }

        .header-user {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-name {
          color: #213F7D;
          font-size: 16px;
          font-weight: 500;
        }

        /* Main Content */
        .main-wrapper {
          flex: 1;
          margin-left: 283px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          padding: 40px;
          background: #FBFBFB;
        }

        .content-placeholder h1 {
          font-size: 24px;
          color: #213F7D;
          margin-bottom: 16px;
        }

        .content-placeholder p {
          color: #545F7D;
          font-size: 16px;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .main-wrapper {
            margin-left: 0;
          }

          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar-open {
            transform: translateX(0);
          }

          .sidebar-overlay {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
          }

          .sidebar-close-btn {
            display: block;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .header-logo-mobile {
            display: flex;
          }

          .header-right {
            gap: 20px;
          }

          .header-link {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .header {
            padding: 0 20px;
            height: 80px;
          }

          .header-search {
            max-width: 200px;
          }

          .user-name {
            display: none;
          }

          .main-content {
            padding: 20px;
          }
        }

        @media (max-width: 480px) {
          .header-search {
            display: none;
          }

          .header-right {
            gap: 12px;
          }

          .header-icon-btn {
            padding: 4px;
          }

          .user-avatar {
            width: 32px;
            height: 32px;
          }

          .main-content {
            padding: 16px;
          }
        }
      `}</style>
      </aside>
    </>
  );
};
export default Sidebar