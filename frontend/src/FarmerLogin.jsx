import { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --soil: #2C1A0E;
    --bark: #4A2C17;
    --harvest: #D47C0F;
    --wheat: #F0C060;
    --leaf: #3A7D44;
    --leaf-light: #52A85E;
    --cream: #FDF6E3;
    --mist: #F5EDD6;
    --text-dark: #1A0F06;
    --text-mid: #5C3D1E;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--soil);
    min-height: 100vh;
    overflow: hidden;
  }

  .login-root {
    display: flex;
    min-height: 100vh;
    position: relative;
  }

  /* Left panel */
  .left-panel {
    flex: 1.1;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 48px;
  }

  .left-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse at 20% 80%, rgba(212,124,15,0.18) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(58,125,68,0.15) 0%, transparent 50%),
      linear-gradient(135deg, #1A0A04 0%, #2C1A0E 50%, #1E2B1A 100%);
    z-index: 0;
  }

  /* Organic field pattern SVG overlay */
  .field-art {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0.07;
    pointer-events: none;
  }

  .glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 1;
  }
  .orb-gold {
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(212,124,15,0.35), transparent 70%);
    bottom: -60px; left: -60px;
  }
  .orb-green {
    width: 260px; height: 260px;
    background: radial-gradient(circle, rgba(58,125,68,0.28), transparent 70%);
    top: 60px; right: -40px;
  }

  .brand-block {
    position: relative;
    z-index: 2;
  }

  .brand-icon {
    width: 56px; height: 56px;
    background: linear-gradient(135deg, var(--harvest), var(--wheat));
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 28px;
    box-shadow: 0 8px 24px rgba(212,124,15,0.35);
  }

  .brand-icon svg {
    width: 32px; height: 32px;
  }

  .brand-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 3.5vw, 46px);
    font-weight: 800;
    color: var(--cream);
    line-height: 1.1;
    letter-spacing: -0.5px;
    margin-bottom: 12px;
  }

  .brand-title span {
    color: var(--wheat);
  }

  .brand-sub {
    font-size: 14px;
    color: rgba(240,192,96,0.65);
    font-weight: 300;
    letter-spacing: 0.5px;
    max-width: 320px;
    line-height: 1.6;
    margin-bottom: 40px;
  }

  .stats-row {
    display: flex;
    gap: 28px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--wheat);
  }

  .stat-label {
    font-size: 11px;
    color: rgba(253,246,227,0.45);
    letter-spacing: 0.8px;
    text-transform: uppercase;
  }

  .stat-divider {
    width: 1px;
    background: rgba(240,192,96,0.2);
    align-self: stretch;
    margin: 4px 0;
  }

  /* Right panel */
  .right-panel {
    flex: 0.9;
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 40px;
    position: relative;
  }

  .right-panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    right: 0; height: 4px;
    background: linear-gradient(90deg, var(--harvest), var(--leaf), var(--wheat));
  }

  /* Subtle grain texture */
  .right-panel::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.5;
  }

  .form-card {
    width: 100%;
    max-width: 400px;
    position: relative;
    z-index: 1;
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .form-eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .form-eyebrow-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--leaf);
  }

  .form-eyebrow-text {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--leaf);
  }

  .form-heading {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    font-weight: 800;
    color: var(--text-dark);
    line-height: 1.15;
    margin-bottom: 6px;
  }

  .form-desc {
    font-size: 13.5px;
    color: var(--text-mid);
    font-weight: 300;
    margin-bottom: 36px;
    line-height: 1.5;
  }

  .input-group {
    margin-bottom: 18px;
    position: relative;
  }

  .input-label {
    display: block;
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--text-mid);
    margin-bottom: 8px;
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 14px;
    color: #A07840;
    z-index: 1;
    pointer-events: none;
    display: flex;
    align-items: center;
  }

  .input-field {
    width: 100%;
    padding: 14px 14px 14px 44px;
    border: 1.5px solid rgba(74,44,23,0.15);
    border-radius: 12px;
    background: #FFFDF5;
    font-family: 'DM Sans', sans-serif;
    font-size: 14.5px;
    color: var(--text-dark);
    outline: none;
    transition: all 0.2s ease;
    -webkit-appearance: none;
  }

  .input-field::placeholder {
    color: #BFA882;
    font-weight: 300;
  }

  .input-field:focus {
    border-color: var(--leaf);
    background: #fff;
    box-shadow: 0 0 0 3px rgba(58,125,68,0.1);
  }

  .input-field:focus + .input-line {
    width: 100%;
  }

  .eye-toggle {
    position: absolute;
    right: 14px;
    background: none;
    border: none;
    cursor: pointer;
    color: #A07840;
    display: flex;
    align-items: center;
    padding: 4px;
    transition: color 0.2s;
  }
  .eye-toggle:hover { color: var(--leaf); }

  .forgot-row {
    display: flex;
    justify-content: flex-end;
    margin-top: -6px;
    margin-bottom: 28px;
  }

  .forgot-link {
    font-size: 12.5px;
    color: var(--harvest);
    text-decoration: none;
    font-weight: 500;
    letter-spacing: 0.2px;
    transition: color 0.2s;
    cursor: pointer;
    background: none;
    border: none;
  }
  .forgot-link:hover { color: var(--leaf); }

  .submit-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, var(--leaf) 0%, #2E6638 100%);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.3px;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 6px 20px rgba(58,125,68,0.35);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
    opacity: 0;
    transition: opacity 0.25s;
  }

  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(58,125,68,0.45);
  }
  .submit-btn:hover::before { opacity: 1; }
  .submit-btn:active { transform: translateY(0); }

  .submit-btn.loading {
    pointer-events: none;
    opacity: 0.85;
  }

  .spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 28px 0;
  }
  .divider-line { flex: 1; height: 1px; background: rgba(74,44,23,0.12); }
  .divider-text { font-size: 12px; color: #BFA882; font-weight: 400; }

  .register-row {
    text-align: center;
    font-size: 13.5px;
    color: var(--text-mid);
  }

  .register-link {
    color: var(--leaf);
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    border: none;
    background: none;
    font-size: 13.5px;
    font-family: 'DM Sans', sans-serif;
    transition: color 0.2s;
  }
  .register-link:hover { color: var(--harvest); }

  .error-msg {
    background: rgba(200,50,50,0.08);
    border: 1px solid rgba(200,50,50,0.2);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 12.5px;
    color: #B03030;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: fadeIn 0.3s ease;
  }

  .success-msg {
    background: rgba(58,125,68,0.08);
    border: 1px solid rgba(58,125,68,0.2);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 12.5px;
    color: var(--leaf);
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* Responsive */
  @media (max-width: 820px) {
    .left-panel { display: none; }
    .right-panel { flex: 1; }
  }
`;

// Icons
const LeafIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 26C6 26 8 12 20 8C28 5.5 28 5.5 28 5.5C28 5.5 27 14 20 19C14 23.5 6 26 6 26Z" fill="#1A0F06" stroke="#1A0F06" strokeWidth="1"/>
    <path d="M6 26C10 22 14 18 18 14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeIcon = ({ open }) => open ? (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const AlertIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

export default function FarmerLogin() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!identifier.trim()) { setError("Please enter your email or phone number."); return; }
    if (!password) { setError("Please enter your password."); return; }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials.");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      setSuccess(true);
      
      const targetRoute = data.role === 'buyer' ? '/buyer' : '/dashboard';
      setTimeout(() => navigate(targetRoute), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        {/* Left decorative panel */}
        <div className="left-panel">
          <svg className="field-art" viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rows" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <line x1="0" y1="20" x2="40" y2="20" stroke="#D4A855" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="600" height="800" fill="url(#rows)"/>
            {[...Array(8)].map((_, i) => (
              <ellipse key={i} cx={80 + i * 70} cy={400 + Math.sin(i) * 80} rx="18" ry="60"
                fill="#52A85E" opacity="0.6" transform={`rotate(${-20 + i * 5}, ${80 + i * 70}, ${400 + Math.sin(i) * 80})`}/>
            ))}
          </svg>
          <div className="glow-orb orb-gold"/>
          <div className="glow-orb orb-green"/>
          <div className="brand-block">
            <div className="brand-icon"><LeafIcon /></div>
            <h1 className="brand-title">Agro<span>Farmers</span></h1>
            <p className="brand-sub">
              Connecting farmers to markets. Transparent, traceable, and trusted supply chain for every harvest.
            </p>
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-num">12K+</span>
                <span className="stat-label">Farmers</span>
              </div>
              <div className="stat-divider"/>
              <div className="stat-item">
                <span className="stat-num">340+</span>
                <span className="stat-label">Markets</span>
              </div>
              <div className="stat-divider"/>
              <div className="stat-item">
                <span className="stat-num">98%</span>
                <span className="stat-label">Traceability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="right-panel">
          <div className="form-card">
            <div className="form-eyebrow">
              <span className="form-eyebrow-dot"/>
              <span className="form-eyebrow-text">Farmer Portal</span>
            </div>
            <h2 className="form-heading">Welcome!</h2>
            <p className="form-desc">Sign in to manage your produce, track shipments & view payments.</p>

            {error && (
              <div className="error-msg">
                <AlertIcon /> {error}
              </div>
            )}
            {success && (
              <div className="success-msg">
                <CheckIcon /> Signed in successfully! Redirecting…
              </div>
            )}

            <div className="input-group">
              <label className="input-label">Email or Phone Number</label>
              <div className="input-wrap">
                <span className="input-icon"><UserIcon /></span>
                <input
                  className="input-field"
                  type="text"
                  placeholder="you@example.com or +91 9876543210"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Password</label>
              <div className="input-wrap">
                <span className="input-icon"><LockIcon /></span>
                <input
                  className="input-field"
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button className="eye-toggle" onClick={() => setShowPw(v => !v)} type="button" aria-label="Toggle password">
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </div>

            <div className="forgot-row">
              <button className="forgot-link" type="button">Forgot password?</button>
            </div>

            <button className={`submit-btn${loading ? " loading" : ""}`} onClick={handleLogin} type="button">
              {loading ? (
                <><div className="spinner"/> Signing in…</>
              ) : (
                <>Sign In <ArrowRight /></>
              )}
            </button>

            <div className="divider">
              <div className="divider-line"/>
              <span className="divider-text">New to AgroFarmers?</span>
              <div className="divider-line"/>
            </div>

            <div className="register-row">
              <span>Register as a </span>
              <button
  className="register-link" 
  type="button"
  onClick={() => navigate("/signup")}
>
  Farmer or Buyer
</button>
            </div> 
          </div>
        </div>
      </div>
    </>
  );
}
