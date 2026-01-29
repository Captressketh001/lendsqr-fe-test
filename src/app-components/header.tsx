import {
  ChevronDown,
  Menu,
} from 'lucide-react';
import SearchBar from './search';
const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {

  return (
    <header className="header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
        <div className="header-logo-mobile">
          <img src='/logo.svg'/>
        </div>
        <SearchBar placeholder='Search for anything'/>
      </div>

      <div className="header-right">
        <a href="#" className="header-link">Docs</a>
        <button className="header-icon-btn">
          <img src="notification.svg" />
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
    </header>
  );
};
export default Header