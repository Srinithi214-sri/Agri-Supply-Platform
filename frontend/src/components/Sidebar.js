import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Trees, BarChart2, Upload, TrendingUp, Truck, Bell,
  Search, ShieldCheck, LogOut
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const handleClick = (e, id) => {
    e.preventDefault();
    if(window.innerWidth <= 768) toggleSidebar();
    const element = document.getElementById(id);
    if(element) {
      // Offset for a floating header if any, or just smooth scroll to the section
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderFarmerLinks = () => (
    <>
      <a href="#overview" className="nav-item" onClick={(e) => handleClick(e, 'overview')}><BarChart2 size={24}/> Overview</a>
      <a href="#add-produce" className="nav-item" onClick={(e) => handleClick(e, 'add-produce')}><Upload size={24}/> List Produce</a>
      <a href="#insights" className="nav-item" onClick={(e) => handleClick(e, 'insights')}><TrendingUp size={24}/> Market Insights</a>
      <a href="#shipments" className="nav-item" onClick={(e) => handleClick(e, 'shipments')}><Truck size={24}/> Shipments</a>
      <a href="#notifications" className="nav-item" onClick={(e) => handleClick(e, 'notifications')}><Bell size={24}/> Notifications</a>
    </>
  );

  const renderBuyerLinks = () => (
    <>
      <a href="#browse" className="nav-item" onClick={(e) => handleClick(e, 'browse')}><Search size={24}/> Browse Crops</a>
      <a href="#insights" className="nav-item" onClick={(e) => handleClick(e, 'insights')}><TrendingUp size={24}/> Market Insights</a>
      <a href="#orders" className="nav-item" onClick={(e) => handleClick(e, 'orders')}><Truck size={24}/> Your Orders</a>
    </>
  );

  const renderAdminLinks = () => (
    <>
      <a href="#overview" className="nav-item" onClick={(e) => handleClick(e, 'overview')}><ShieldCheck size={24}/> System Overview</a>
      <a href="#transactions" className="nav-item" onClick={(e) => handleClick(e, 'transactions')}><BarChart2 size={24}/> Transactions</a>
    </>
  );

  let navContent;
  if(location.pathname === '/buyer') navContent = renderBuyerLinks();
  else if(location.pathname === '/admin') navContent = renderAdminLinks();
  else navContent = renderFarmerLinks();

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Trees className="sidebar-logo-icon" size={32} />
          <h2 className="sidebar-title">AgriSmart<br/>Platform</h2>
        </div>
        <nav className="nav-links" style={{ flex: 1 }}>
          {navContent}
        </nav>
        <div style={{ padding: '1rem', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <a href="/" className="nav-item" style={{ color: '#fed7d7' }}>
            <LogOut size={24}/> Logout
          </a>
        </div>
      </aside>
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={toggleSidebar}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 90 }}
        />
      )}
    </>
  );
};

export default Sidebar;
