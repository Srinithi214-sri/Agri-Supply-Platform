import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Sprout, Activity, ShieldCheck } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ registeredFarmers: 0, activeBuyers: 0, totalTransactions: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/dashboard-stats');
        if (res.data.success) {
          setStats(res.data.stats);
          setTransactions(res.data.recentTransactions);
        }
      } catch (err) {
        console.error("Failed to fetch admin stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminStats();
  }, []);

  return (
    <div className="animate-fade-in">
      <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Admin Control Panel ⚙️</h1>
          <p className="subtitle">Platform ecosystem overview and management.</p>
        </div>
        <span className="badge badge-success" style={{ padding: '0.75rem 1rem' }}><ShieldCheck size={20}/> System Secure</span>
      </header>

      {/* Analytics Overview */}
      <section id="overview" className="dashboard-grid">
        <div className="card summary-card animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="summary-icon-wrapper">
            <Sprout size={28} />
          </div>
          <div className="summary-details">
            <h3>Registered Farmers</h3>
            <p>{loading ? '...' : stats.registeredFarmers}</p>
          </div>
        </div>
        <div className="card summary-card animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <div className="summary-icon-wrapper">
            <Users size={28} />
          </div>
          <div className="summary-details">
            <h3>Active Buyers</h3>
            <p>{loading ? '...' : stats.activeBuyers}</p>
          </div>
        </div>
        <div className="card summary-card animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <div className="summary-icon-wrapper">
            <Activity size={28} />
          </div>
          <div className="summary-details">
            <h3>Total Transactions</h3>
            <p>{loading ? '...' : stats.totalTransactions}</p>
          </div>
        </div>
      </section>

      <div className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
        <section id="transactions" className="card animate-fade-in">
          <h2>Recent Ecosystem Transactions</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '1rem' }}>Order ID</th>
                  <th style={{ padding: '1rem' }}>Crop</th>
                  <th style={{ padding: '1rem' }}>Farmer</th>
                  <th style={{ padding: '1rem' }}>Buyer</th>
                  <th style={{ padding: '1rem' }}>Amount</th>
                  <th style={{ padding: '1rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr><td colSpan="6" style={{ padding: '1rem', textAlign: 'center' }}>No transactions found.</td></tr>
                ) : (
                  transactions.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                      <td style={{ padding: '1rem', fontWeight: 500 }}>{row.shipmentId}</td>
                      <td style={{ padding: '1rem' }}>{row.crop}</td>
                      <td style={{ padding: '1rem' }}>{row.farmer}</td>
                      <td style={{ padding: '1rem' }}>{row.buyer}</td>
                      <td style={{ padding: '1rem', color: 'var(--primary-green)', fontWeight: 600 }}>{row.amount}</td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`badge ${row.status === 'delivered' ? 'badge-success' : row.status === 'in-transit' ? 'badge-info' : row.status === 'loading' ? 'badge-warning' : 'badge-danger'}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
