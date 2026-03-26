import React from 'react';
import { Search, MapPin, TrendingUp, Truck, Filter, ShoppingBag } from 'lucide-react';

const BuyerDashboard = () => {
  const userName = localStorage.getItem("name") || "Buyer";

  return (
    <div className="animate-fade-in">
      <header className="page-header">
        <h1>Welcome back, {userName}! 🛒</h1>
        <p className="subtitle">Find the best crops directly from local farmers.</p>
      </header>

      {/* A. Browse Crops & Filter */}
      <section id="browse" className="dashboard-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="card animate-slide-in" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-secondary)' }} />
            <input type="text" className="form-control" style={{ paddingLeft: '2.8rem' }} placeholder="Search for crops..." />
          </div>
          <button className="btn btn-outline"><Filter size={20} /> Filter by Location</button>
          <button className="btn btn-outline">Sort by Price</button>
        </div>
      </section>

      <section className="dashboard-grid">
        {/* Crop Cards */}
        {[
          { name: 'Organic Wheat', price: 42, qty: 500, loc: 'Pune District', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=400&q=80' },
          { name: 'Fresh Tomatoes', price: 28, qty: 200, loc: 'Nashik', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80' },
          { name: 'Red Onions', price: 35, qty: 800, loc: 'Lasalgaon', img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80' },
        ].map((crop, i) => (
          <div className="card product-card animate-slide-in" style={{ animationDelay: `${i * 0.1}s` }} key={i}>
            <img src={crop.img} alt={crop.name} className="product-img" />
            <h3 style={{ fontSize: '1.25rem' }}>{crop.name}</h3>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              <MapPin size={16} /> {crop.loc}
            </p>
            <div className="product-price">₹{crop.price} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/ kg</span></div>
            <p style={{ marginBottom: '1rem', fontWeight: 500 }}>Available: {crop.qty} kg</p>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input type="number" className="form-control" placeholder="Qty" style={{ flex: 1, padding: '0.5rem' }} />
              <button className="btn btn-primary" style={{ flex: 2, padding: '0.5rem' }}>Place Request</button>
            </div>
          </div>
        ))}
      </section>

      <div className="dashboard-grid">
        {/* C. Price Insights */}
        <section id="insights" className="card animate-fade-in">
          <h2>Market Insights 📈</h2>
          <div className="data-list">
            <div className="list-item">
              <div>
                <h4>Onion Prices</h4>
                <p className="subtitle" style={{ fontSize: '0.9rem' }}>Expected to rise by 12% next week</p>
              </div>
              <span className="badge badge-danger"><TrendingUp size={16}/> High Demand</span>
            </div>
            <div className="list-item">
              <div>
                <h4>Wheat Supply</h4>
                <p className="subtitle" style={{ fontSize: '0.9rem' }}>Surplus supply in northern regions</p>
              </div>
              <span className="badge badge-success">Good Buying Time</span>
            </div>
          </div>
        </section>

        {/* D & E. Logistics Tracking & History */}
        <section id="orders" className="card animate-fade-in">
          <h2>Your Orders</h2>
          <div className="data-list">
            <div className="list-item">
              <div className="list-item-left">
                <Truck color="var(--primary-green)" size={24} />
                <div style={{ flex: 1 }}>
                  <h4>Order #8492 - 100kg Potato</h4>
                  <div style={{ width: '100%', background: 'var(--border-color)', height: '8px', borderRadius: '4px', marginTop: '0.5rem' }}>
                    <div style={{ width: '60%', background: 'var(--primary-green)', height: '100%', borderRadius: '4px' }}></div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.25rem' }}>In Transit - Arriving Tomorrow</p>
                </div>
              </div>
            </div>
            
            <div className="list-item">
              <div className="list-item-left">
                <ShoppingBag color="var(--text-secondary)" size={24} />
                <div>
                  <h4>Order #8120 - 500kg Wheat</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Delivered on 12-Oct-2023</p>
                </div>
              </div>
              <span className="badge badge-success">Completed</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BuyerDashboard;
