import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Authentication Pages (from your remote branch)
import FarmerLogin from './FarmerLogin';
import FarmerSignup from './FarmerSignup';

// Dashboards (from the new UI implementation)
import Layout from './components/Layout';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Authentication Routes without the Sidebar Layout */}
        <Route path="/" element={<FarmerLogin />} />
        <Route path="/signup" element={<FarmerSignup />} />
        
        {/* Protected Dashboard Routes inside the Sidebar Layout */}
        <Route path="/dashboard" element={<Layout><FarmerDashboard /></Layout>} />
        <Route path="/buyer" element={<Layout><BuyerDashboard /></Layout>} />
        <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;