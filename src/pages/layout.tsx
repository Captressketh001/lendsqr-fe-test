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

    </div>
  );
};

export default Layout;