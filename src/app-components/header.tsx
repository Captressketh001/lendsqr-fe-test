import {
  ChevronDown,
  Menu,
  Bell
} from 'lucide-react';
import SearchBar from './search';
const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {

  return (
    <header className="header">
      <div className="header-left">
        {/* Mobile Menu Button */}
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>

        {/* Logo (Mobile) */}
        <div className="header-logo-mobile">
          <img src='/logo.svg'/>
        </div>

        {/* Search Bar */}
        {/* <div className="header-search">
          <input
            type="text"
            placeholder="Search for anything"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input"
          />
          <button className="search-btn">
            <Search size={16} />
          </button>
        </div> */}
        <SearchBar placeholder='Search for anything'/>
      </div>

      <div className="header-right">
        <a href="#" className="header-link">Docs</a>
        <button className="header-icon-btn">
          <Bell size={20} />
        </button>
        <div className="header-user">
          <img
            src="/avatar.png"
            alt="User Avatar"
            className="user-avatar"
          />
          <span className="user-name">Adedeji</span>
          <ChevronDown size={16} />
        </div>
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
    </header>
  );
};
export default Header