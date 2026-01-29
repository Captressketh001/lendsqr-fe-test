import { SearchProps } from "@/interface-and-types"
import { Search } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = ({ 
  placeholder = 'Search for anything',
  onSearch 
}: SearchProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Directly read from URL - no state needed!
  const currentQuery = searchParams.get('query') || '';

  // Debounced search that updates URL
  const debouncedSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(location.search);
    
    // Always reset to page 1 when searching
    params.set('page', '1');
    
    if (term.trim()) {
      params.set('query', term.trim());
    } else {
      params.delete('page')
      params.delete('query');
    }
    
    // Update URL with new search params
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    
    // Call optional callback
    if (onSearch) {
      onSearch(term);
    }
  }, 300);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Handle button click
  const handleButtonClick = () => {
    const input = document.querySelector('.search-input') as HTMLInputElement;
    if (input) {
      debouncedSearch.flush(); // Execute immediately without waiting
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      debouncedSearch.flush(); // Execute immediately
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        defaultValue={currentQuery}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button 
        className="search-button" 
        onClick={handleButtonClick}
        type="button"
      >
        <Search size={20} />
      </button>
      <style>{`
        
          .search-bar {
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

        
        
        .search-button {
          background: #39CDCC;
          border: none;
          padding: 0 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
          color: #FFFFFF;
        }

        .search-button:hover {
          background: #2DB8B7;
        }

        .search-button:active {
          transform: scale(0.98);
        }

        @media (max-width: 768px) {
          .search-bar {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchBar;