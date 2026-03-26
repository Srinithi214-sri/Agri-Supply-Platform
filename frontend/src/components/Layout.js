import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <button className="mobile-toggle" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
