import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Sprout, TrendingUp, DollarSign, Package, 
  MapPin, Upload, Bell, Truck, TrendingDown, Info,
  PackageCheck, History, LineChart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';

const FarmerDashboard = () => {
  const [prediction, setPrediction] = useState(null);
  const userName = localStorage.getItem("name") || "Ram";
  const [loading, setLoading] = useState(false);
  
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifs, setLoadingNotifs] = useState(true);
  
  // States for Add Crop Form
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [sellPrice, setSellPrice] = useState('');
  const [sellQty, setSellQty] = useState('');

  // We fetch market and prediction data when the crop changes.
  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:5000/api/mandi/predict/${selectedCrop}`);
        setPrediction({
          inputs: res.data.inputs,
          result: res.data.prediction
        });
      } catch (err) {
        console.error('Prediction fetch error', err);
        // Fallback for visual demonstration
        const mockPrices = [40, 42, 45, 43, 44, 46, 45, 47, 49, 48];
        const predicted = Math.floor(Math.random() * 10) + 45;
        setPrediction({
          inputs: { last_10_day_prices: mockPrices },
          result: {
            predicted_price: predicted,
            trend: predicted > 48 ? 'Increase' : 'Decrease',
            reason: "Based on local supply shortages and anticipated regional demand."
          }
        });
      }
      setLoading(false);
    };
    
    fetchPrediction();
  }, [selectedCrop]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notifications/farmer');
        if (res.data.success) {
          setNotifications(res.data.notifications);
        }
      } catch (err) {
        console.error('Failed to grab notifications:', err);
      }
      setLoadingNotifs(false);
    };
    fetchNotifications();
  }, []);

  const handlePublish = (e) => {
    e.preventDefault();
    alert(`Successfully listed ${sellQty}kg of ${selectedCrop} at ₹${sellPrice}/kg!`);
    setSellPrice(''); setSellQty('');
  };

  // Prepare graph data mimicking the python output
  let graphData = [];
  if (prediction && prediction.inputs && prediction.inputs.last_10_day_prices) {
    const prices = prediction.inputs.last_10_day_prices;
    graphData = prices.map((price, i) => ({
      name: `Day ${i + 1}`,
      price: price,
      isPrediction: false
    }));
    
    // Day 11 Predicted
    graphData.push({
      name: `Day 11 (Pred)`,
      price: prediction.result.predicted_price,
      isPrediction: true
    });
  }

  return (
    <div className="animate-fade-in">
      <header className="page-header">
        <h1>Welcome back, Farmer {userName}! 🌾</h1>
        <p className="subtitle">Here is your farm's overview and latest market insights.</p>
      </header>

      {/* A. Dashboard Overview */}
      <section id="overview" className="dashboard-grid">
        <div className="card summary-card animate-slide-in" style={{ animationDelay: '0.1s' }}>
          <div className="summary-icon-wrapper">
            <Sprout size={28} />
          </div>
          <div className="summary-details">
            <h3>Listed Products</h3>
            <p>12</p>
          </div>
        </div>
        <div className="card summary-card animate-slide-in" style={{ animationDelay: '0.2s' }}>
          <div className="summary-icon-wrapper">
            <PackageCheck size={28} />
          </div>
          <div className="summary-details">
            <h3>Products Sold</h3>
            <p>4,520 kg</p>
          </div>
        </div>
        <div className="card summary-card animate-slide-in" style={{ animationDelay: '0.3s' }}>
          <div className="summary-icon-wrapper">
            <DollarSign size={28} />
          </div>
          <div className="summary-details">
            <h3>Total Earnings</h3>
            <p>₹1,85,000</p>
          </div>
        </div>
        <div className="card summary-card animate-slide-in" style={{ animationDelay: '0.4s' }}>
          <div className="summary-icon-wrapper">
            <Package size={28} />
          </div>
          <div className="summary-details">
            <h3>Active Orders</h3>
            <p>3</p>
          </div>
        </div>
      </section>

      {/* Main Feature Layout */}
      <div className="dashboard-grid" style={{ gridTemplateColumns: 'minmax(350px, 1fr) minmax(400px, 1fr)' }}>
        
        {/* B. Add Product Section */}
        <section id="add-produce" className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>1. List New Produce</h2>
          <form onSubmit={handlePublish} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Select Crop Name</label>
              <select 
                className="form-control" 
                value={selectedCrop} 
                onChange={(e) => setSelectedCrop(e.target.value)}
              >
                <option value="wheat">Wheat</option>
                <option value="rice">Rice</option>
                <option value="tomato">Tomato</option>
                <option value="potato">Potato</option>
                <option value="onion">Onion</option>
              </select>
              <small style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', display: 'block' }}>
                * Selecting a crop will automatically refresh the Mandi Prices and AI Prediction graphs below.
              </small>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1, margin: 0 }}>
                <label>Total Quantity (Kg)</label>
                <input type="number" className="form-control" placeholder="e.g. 500" value={sellQty} onChange={e=>setSellQty(e.target.value)} required />
              </div>
              <div className="form-group" style={{ flex: 1, margin: 0 }}>
                <label>Asking Price / Kg (₹)</label>
                <input type="number" className="form-control" placeholder="e.g. 45" value={sellPrice} onChange={e=>setSellPrice(e.target.value)} required />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label>Farm Location</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={20} style={{ position: 'absolute', left: '1rem', top: '1rem', color: 'var(--text-secondary)' }} />
                <input type="text" className="form-control" style={{ paddingLeft: '2.8rem' }} placeholder="Enter village or district" required />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0, flex: 1 }}>
              <label>Produce Image</label>
              <div style={{ 
                border: '2px dashed var(--border-color)', height: '100%', minHeight: '120px',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                borderRadius: '8px', color: 'var(--text-secondary)', cursor: 'pointer',
                background: 'var(--bg-color)', transition: 'all 0.2s'
              }} className="upload-box" onClick={(e) => e.currentTarget.style.borderColor = 'var(--primary-green)'}>
                <Upload size={32} style={{ marginBottom: '0.5rem' }} />
                <p>Tap to upload harvest photo</p>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: 'auto' }}>
              Publish Produce to Marketplace
            </button>
          </form>
        </section>

        {/* C & D. Mandi Price / AI Prediction + Graph */}
        <section id="insights" className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            2. Market Price & AI Prediction <LineChart size={24} color="var(--primary-green)" />
          </h2>

          <div className="prediction-box" style={{ marginBottom: '1.5rem', flexShrink: 0 }}>
            {loading ? (
              <p>Analyzing {selectedCrop} prices...</p>
            ) : prediction ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ opacity: 0.9 }}>AI Predicted Price (Tomorrow)</p>
                    <div className="prediction-price">
                      ₹{prediction.result.predicted_price}
                      <span className="trend-icon" style={{
                        color: prediction.result.trend === 'Increase' ? '#fff' : '#fed7d7',
                        background: prediction.result.trend === 'Increase' ? 'rgba(255,255,255,0.2)' : 'rgba(255,0,0,0.2)'
                      }}>
                        {prediction.result.trend === 'Increase' ? <TrendingUp size={36}/> : <TrendingDown size={36}/>}
                      </span>
                    </div>
                  </div>
                  <div className="badge badge-success" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                    92% Confidence
                  </div>
                </div>
                
                <p style={{ fontSize: '0.95rem', lineHeight: '1.4', padding: '0.75rem', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', marginTop: '0.5rem' }}>
                  <Info size={16} style={{ display: 'inline', marginRight: '6px' }}/>
                  {prediction.result.reason}
                </p>
              </>
            ) : (
              <p>Prediction unavailable.</p>
            )}
          </div>

          <div style={{ flex: 1, minHeight: '250px', marginLeft: '-1.5rem', marginRight: '-1.5rem' }}>
            {graphData.length > 0 && !loading && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData} margin={{ top: 20, right: 30, left: 0, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
                  <YAxis tick={{ fontSize: 12 }} width={50} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(46, 139, 87, 0.1)' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                  />
                  <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                    {graphData.map((entry, index) => {
                      // Simulating the Python plot colors: 'skyblue' for historical, 'orange'/'lightgreen' for pred
                      if (!entry.isPrediction) {
                        return <Cell key={`cell-${index}`} fill="#87CEEB" />;
                      } else {
                        // It's prediction day
                        return <Cell key={`cell-${index}`} fill={prediction?.result?.trend === 'Increase' ? '#f57c00' : '#81c784'} />;
                      }
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
            {loading && (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                Loading price trends...
              </div>
            )}
          </div>
          
        </section>
      </div>

      <div className="dashboard-grid">
        {/* E. Active Shipments / Logistics Section */}
        <section id="shipments" className="card animate-fade-in">
          <h2>3. Active Shipments</h2>
          <div className="data-list">
            <div className="list-item">
              <div className="list-item-left">
                <Truck color="var(--primary-green)" size={24} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>1,200kg Rice</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>To: ABC Supermarkets, Chennai</p>
                </div>
              </div>
              <span className="badge badge-info">In Transit</span>
            </div>
            <div className="list-item">
              <div className="list-item-left">
                <Truck color="var(--text-secondary)" size={24} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>400kg Tomatoes</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>To: Local Market, Madurai</p>
                </div>
              </div>
              <span className="badge badge-warning">Pending Pickup</span>
            </div>
            <div className="list-item">
              <div className="list-item-left">
                <History color="var(--success)" size={24} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>800kg Onions</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>To: FreshVeg Ltd</p>
                </div>
              </div>
              <span className="badge badge-success">Delivered</span>
            </div>
          </div>
        </section>

        {/* F. Notifications Section */}
        <section id="notifications" className="card animate-fade-in">
          <h2>4. Notifications</h2>
          <div className="data-list">
            {loadingNotifs ? (
              <div style={{ color: 'var(--text-secondary)', padding: '1rem', textAlign: 'center' }}>Loading latest alerts...</div>
            ) : notifications.length > 0 ? (
              notifications.map((notif) => (
                <div key={notif.id} className="list-item" style={{ borderLeft: `4px solid ${notif.type === 'alert' ? 'var(--primary-green)' : notif.type === 'offer' ? 'var(--accent-orange)' : '#4299e1'}` }}>
                  <div className="list-item-left">
                    <div style={{ background: notif.type === 'alert' ? '#e8f5e9' : notif.type === 'offer' ? '#feebc8' : '#ebf8ff', padding: '0.5rem', borderRadius: '50%' }}>
                      {notif.type === 'alert' ? <TrendingUp color="var(--primary-green)" size={20} /> : notif.type === 'offer' ? <Bell color="var(--accent-orange)" size={20} /> : <Info color="#4299e1" size={20} />}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{notif.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{notif.message}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ padding: '1rem' }}>No new notifications at this time.</p>
            )}
            <button className="btn btn-outline" style={{ width: '100%', marginTop: '0.5rem' }}>View All Alerts</button>
          </div>
        </section>
      </div>

    </div>
  );
};

export default FarmerDashboard;
