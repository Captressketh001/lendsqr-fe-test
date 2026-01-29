import React, { useState } from 'react';

import Header from '@/app-components/header';
import Sidebar from '@/app-components/sidenav';

// Main Layout Component
const Layout = ({ children }: { children?: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-wrapper">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        {/* <main className="main-content"> */}
          {children}
        {/* </main> */}
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

        
        }
      `}</style>
    </div>
  );
};

export default Layout;