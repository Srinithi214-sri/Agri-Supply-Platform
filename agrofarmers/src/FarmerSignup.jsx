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
    overflow-x: hidden;
  }

  .signup-root {
    display: flex;
    min-height: 100vh;
    position: relative;
  }

  /* ── LEFT = FORM PANEL ── */
  .left-form-panel {
    flex: 0.9;
    background: var(--cream);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 36px;
    position: relative;
    overflow-y: auto;
  }

  .left-form-panel::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    bottom: 0; width: 4px;
    background: linear-gradient(180deg, var(--harvest), var(--leaf), var(--wheat));
  }

  .left-form-panel::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.5;
  }

  /* ── RIGHT = BRAND PANEL ── */
  .right-brand-panel {
    flex: 1.1;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 48px;
  }

  .right-brand-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 80% 20%, rgba(212,124,15,0.18) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 80%, rgba(58,125,68,0.15) 0%, transparent 50%),
      linear-gradient(135deg, #1A0A04 0%, #2C1A0E 50%, #1E2B1A 100%);
    z-index: 0;
  }

  .field-art {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0.07;
    pointer-events: none;
  }

  .glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 1; }
  .orb-gold { width: 300px; height: 300px; background: radial-gradient(circle, rgba(212,124,15,0.35), transparent 70%); top: -40px; right: -40px; }
  .orb-green { width: 260px; height: 260px; background: radial-gradient(circle, rgba(58,125,68,0.28), transparent 70%); bottom: 60px; left: -30px; }
  .orb-amber { width: 200px; height: 200px; background: radial-gradient(circle, rgba(240,192,96,0.15), transparent 70%); top: 50%; left: 40%; }

  .brand-block { position: relative; z-index: 2; }

  .brand-icon {
    width: 56px; height: 56px;
    background: linear-gradient(135deg, var(--harvest), var(--wheat));
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 28px;
    box-shadow: 0 8px 24px rgba(212,124,15,0.35);
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
  .brand-title span { color: var(--wheat); }

  .brand-sub {
    font-size: 14px;
    color: rgba(240,192,96,0.65);
    font-weight: 300;
    letter-spacing: 0.5px;
    max-width: 340px;
    line-height: 1.7;
    margin-bottom: 44px;
  }

  /* Feature list */
  .feature-list { display: flex; flex-direction: column; gap: 18px; }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .feature-dot {
    width: 32px; height: 32px;
    border-radius: 10px;
    background: rgba(240,192,96,0.12);
    border: 1px solid rgba(240,192,96,0.2);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .feature-text-title {
    font-size: 13.5px;
    font-weight: 500;
    color: var(--cream);
    margin-bottom: 2px;
  }
  .feature-text-desc {
    font-size: 12px;
    color: rgba(253,246,227,0.45);
    font-weight: 300;
    line-height: 1.5;
  }

  /* ── FORM CARD ── */
  .form-card {
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .form-eyebrow { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .form-eyebrow-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--harvest); }
  .form-eyebrow-text { font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: var(--harvest); }

  .form-heading {
    font-family: 'Playfair Display', serif;
    font-size: 30px;
    font-weight: 800;
    color: var(--text-dark);
    line-height: 1.15;
    margin-bottom: 6px;
  }

  .form-desc { font-size: 13px; color: var(--text-mid); font-weight: 300; margin-bottom: 24px; line-height: 1.5; }

  /* Role toggle */
  .role-toggle {
    display: flex;
    background: rgba(74,44,23,0.08);
    border-radius: 12px;
    padding: 4px;
    margin-bottom: 24px;
    gap: 4px;
  }

  .role-btn {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 9px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: transparent;
    color: var(--text-mid);
  }

  .role-btn.active {
    background: #fff;
    color: var(--text-dark);
    box-shadow: 0 2px 10px rgba(74,44,23,0.12);
  }

  .role-btn.active.farmer { color: var(--leaf); }
  .role-btn.active.buyer  { color: var(--harvest); }

  /* Inputs */
  .input-row { display: flex; gap: 12px; }
  .input-row .input-group { flex: 1; }

  .input-group { margin-bottom: 14px; position: relative; }

  .input-label {
    display: block;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--text-mid);
    margin-bottom: 6px;
  }

  .input-wrap { position: relative; display: flex; align-items: center; }

  .input-icon {
    position: absolute; left: 13px;
    color: #A07840; z-index: 1;
    pointer-events: none;
    display: flex; align-items: center;
  }

  .input-field {
    width: 100%;
    padding: 13px 13px 13px 42px;
    border: 1.5px solid rgba(74,44,23,0.15);
    border-radius: 11px;
    background: #FFFDF5;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text-dark);
    outline: none;
    transition: all 0.2s ease;
    -webkit-appearance: none;
  }
  .input-field::placeholder { color: #BFA882; font-weight: 300; }
  .input-field:focus { border-color: var(--leaf); background: #fff; box-shadow: 0 0 0 3px rgba(58,125,68,0.1); }

  .select-field {
    width: 100%;
    padding: 13px 13px 13px 42px;
    border: 1.5px solid rgba(74,44,23,0.15);
    border-radius: 11px;
    background: #FFFDF5;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--text-dark);
    outline: none;
    transition: all 0.2s ease;
    -webkit-appearance: none;
    cursor: pointer;
  }
  .select-field:focus { border-color: var(--leaf); background: #fff; box-shadow: 0 0 0 3px rgba(58,125,68,0.1); }

  .eye-toggle {
    position: absolute; right: 13px;
    background: none; border: none;
    cursor: pointer; color: #A07840;
    display: flex; align-items: center;
    padding: 4px; transition: color 0.2s;
  }
  .eye-toggle:hover { color: var(--leaf); }

  /* Terms */
  .terms-row {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 20px;
    margin-top: 4px;
  }

  .terms-checkbox {
    width: 16px; height: 16px;
    margin-top: 2px;
    accent-color: var(--leaf);
    cursor: pointer;
    flex-shrink: 0;
  }

  .terms-text {
    font-size: 12px;
    color: var(--text-mid);
    line-height: 1.5;
  }

  .terms-link { color: var(--leaf); font-weight: 500; cursor: pointer; background: none; border: none; font-size: 12px; font-family: 'DM Sans', sans-serif; }

  /* Submit */
  .submit-btn {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.3px;
    cursor: pointer;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #fff;
  }

  .submit-btn.farmer-btn {
    background: linear-gradient(135deg, var(--leaf) 0%, #2E6638 100%);
    box-shadow: 0 6px 20px rgba(58,125,68,0.35);
  }
  .submit-btn.buyer-btn {
    background: linear-gradient(135deg, var(--harvest) 0%, #A85E08 100%);
    box-shadow: 0 6px 20px rgba(212,124,15,0.35);
  }

  .submit-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent); opacity: 0; transition: opacity 0.25s; }
  .submit-btn:hover { transform: translateY(-2px); }
  .submit-btn:hover::before { opacity: 1; }
  .submit-btn.farmer-btn:hover { box-shadow: 0 10px 28px rgba(58,125,68,0.45); }
  .submit-btn.buyer-btn:hover  { box-shadow: 0 10px 28px rgba(212,124,15,0.45); }
  .submit-btn:active { transform: translateY(0); }
  .submit-btn.loading { pointer-events: none; opacity: 0.85; }

  .spinner { width: 17px; height: 17px; border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .login-row { text-align: center; font-size: 13px; color: var(--text-mid); margin-top: 18px; }
  .login-link { color: var(--leaf); font-weight: 500; cursor: pointer; border: none; background: none; font-size: 13px; font-family: 'DM Sans', sans-serif; transition: color 0.2s; }
  .login-link:hover { color: var(--harvest); }

  .error-msg { background: rgba(200,50,50,0.08); border: 1px solid rgba(200,50,50,0.2); border-radius: 8px; padding: 9px 13px; font-size: 12.5px; color: #B03030; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; animation: fadeIn 0.3s ease; }
  .success-msg { background: rgba(58,125,68,0.08); border: 1px solid rgba(58,125,68,0.2); border-radius: 8px; padding: 9px 13px; font-size: 12.5px; color: var(--leaf); margin-bottom: 14px; display: flex; align-items: center; gap: 8px; animation: fadeIn 0.3s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* Farmer-specific field highlight */
  .farmer-section .input-field:focus { border-color: var(--leaf); box-shadow: 0 0 0 3px rgba(58,125,68,0.1); }
  .buyer-section  .input-field:focus { border-color: var(--harvest); box-shadow: 0 0 0 3px rgba(212,124,15,0.1); }

  @media (max-width: 820px) {
    .right-brand-panel { display: none; }
    .left-form-panel { flex: 1; }
  }
`;

// Icons
const LeafIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 26C6 26 8 12 20 8C28 5.5 28 5.5 28 5.5C28 5.5 27 14 20 19C14 23.5 6 26 6 26Z" fill="#1A0F06" stroke="#1A0F06" strokeWidth="1"/>
    <path d="M6 26C10 22 14 18 18 14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FarmerSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a5 5 0 0 1 5 5c0 3-2 5.5-5 6.5C9 12.5 7 10 7 7a5 5 0 0 1 5-5z"/>
    <path d="M3 21c0-4 4-7 9-7s9 3 9 7"/>
  </svg>
);

const BuyerSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const MapIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const CropIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 2v20"/><path d="M2 12h20"/><path d="M12 2C6.48 2 2 6.48 2 12"/>
  </svg>
);

const BuildingIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
  </svg>
);

const EyeIcon = ({ open }) => open ? (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
) : (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const features = [
  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, title: "Real-time Price Tracking", desc: "See live market prices for your crops before you sell." },
  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2"/><path d="M15 7h2a5 5 0 1 1 0 10h-2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>, title: "Direct Market Access", desc: "Connect directly with verified buyers, no middlemen." },
  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, title: "End-to-End Logistics", desc: "Track your shipments from farm to final delivery." },
];

export default function FarmerSignup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("farmer");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Shared fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Farmer-specific
  const [village, setVillage] = useState("");
  const [cropType, setCropType] = useState("");

  // Buyer-specific
  const [company, setCompany] = useState("");
  const [buyerType, setBuyerType] = useState("");

  const handleSignup = async () => {
    setError("");
    if (!name.trim())     { setError("Please enter your full name."); return; }
    if (!phone.trim())    { setError("Please enter your phone number."); return; }
    if (!email.trim())    { setError("Please enter your email address."); return; }
    if (!password)        { setError("Please set a password."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (!agreed)          { setError("Please agree to the terms & conditions."); return; }

    setLoading(true);
    try {
      const payload = { role, name, phone, email, password };
      if (role === 'farmer') {
        payload.village = village;
        payload.cropType = cropType;
      } else {
        payload.company = company;
        payload.buyerType = buyerType;
      }

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isFarmer = role === "farmer";

  return (
    <>
      <style>{styles}</style>
      <div className="signup-root">

        {/* ── LEFT: FORM ── */}
        <div className="left-form-panel">
          <div className="form-card">
            <div className="form-eyebrow">
              <span className="form-eyebrow-dot" style={{ background: isFarmer ? "var(--leaf)" : "var(--harvest)" }}/>
              <span className="form-eyebrow-text" style={{ color: isFarmer ? "var(--leaf)" : "var(--harvest)" }}>
                {isFarmer ? "Farmer Registration" : "Buyer Registration"}
              </span>
            </div>
            <h2 className="form-heading">Create Account</h2>
            <p className="form-desc">Join Agrochain and be part of a transparent, trusted supply chain.</p>

            {/* Role toggle */}
            <div className="role-toggle">
              <button className={`role-btn farmer ${role === "farmer" ? "active" : ""}`} onClick={() => { setRole("farmer"); setError(""); setSuccess(false); }}>
                <FarmerSvg /> Farmer
              </button>
              <button className={`role-btn buyer ${role === "buyer" ? "active" : ""}`} onClick={() => { setRole("buyer"); setError(""); setSuccess(false); }}>
                <BuyerSvg /> Buyer
              </button>
            </div>

            {error   && <div className="error-msg"><AlertIcon /> {error}</div>}
            {success && <div className="success-msg"><CheckIcon /> Account created! Welcome to KisanChain 🌱</div>}

            <div className={isFarmer ? "farmer-section" : "buyer-section"}>
              {/* Name */}
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <div className="input-wrap">
                  <span className="input-icon"><UserIcon /></span>
                  <input className="input-field" type="text" placeholder={isFarmer ? "e.g. Rajan Kumar" : "e.g. Priya Sharma"} value={name} onChange={e => setName(e.target.value)} />
                </div>
              </div>

              {/* Phone + Email row */}
              <div className="input-row">
                <div className="input-group">
                  <label className="input-label">Phone</label>
                  <div className="input-wrap">
                    <span className="input-icon"><PhoneIcon /></span>
                    <input className="input-field" type="tel" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Email</label>
                  <div className="input-wrap">
                    <span className="input-icon"><MailIcon /></span>
                    <input className="input-field" type="email" placeholder="you@mail.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Role-specific fields */}
              {isFarmer ? (
                <div className="input-row">
                  <div className="input-group">
                    <label className="input-label">Village / District</label>
                    <div className="input-wrap">
                      <span className="input-icon"><MapIcon /></span>
                      <input className="input-field" type="text" placeholder="e.g. Thanjavur" value={village} onChange={e => setVillage(e.target.value)} />
                    </div>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Primary Crop</label>
                    <div className="input-wrap">
                      <span className="input-icon"><CropIcon /></span>
                      <select className="select-field" value={cropType} onChange={e => setCropType(e.target.value)}>
                        <option value="">Select crop</option>
                        <option>Rice</option>
                        <option>Wheat</option>
                        <option>Vegetables</option>
                        <option>Fruits</option>
                        <option>Pulses</option>
                        <option>Spices</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="input-row">
                  <div className="input-group">
                    <label className="input-label">Company / Organisation</label>
                    <div className="input-wrap">
                      <span className="input-icon"><BuildingIcon /></span>
                      <input className="input-field" type="text" placeholder="e.g. FreshMart Pvt Ltd" value={company} onChange={e => setCompany(e.target.value)} />
                    </div>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Buyer Type</label>
                    <div className="input-wrap">
                      <span className="input-icon"><BuyerSvg /></span>
                      <select className="select-field" value={buyerType} onChange={e => setBuyerType(e.target.value)}>
                        <option value="">Select type</option>
                        <option>Retailer</option>
                        <option>Wholesaler</option>
                        <option>Exporter</option>
                        <option>Processor</option>
                        <option>Restaurant</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Password row */}
              <div className="input-row">
                <div className="input-group">
                  <label className="input-label">Password</label>
                  <div className="input-wrap">
                    <span className="input-icon"><LockIcon /></span>
                    <input className="input-field" type={showPw ? "text" : "password"} placeholder="Min 8 characters" value={password} onChange={e => setPassword(e.target.value)} />
                    <button className="eye-toggle" type="button" onClick={() => setShowPw(v => !v)}><EyeIcon open={showPw} /></button>
                  </div>
                </div>
                <div className="input-group">
                  <label className="input-label">Confirm Password</label>
                  <div className="input-wrap">
                    <span className="input-icon"><LockIcon /></span>
                    <input className="input-field" type={showConfirm ? "text" : "password"} placeholder="Re-enter password" value={confirm} onChange={e => setConfirm(e.target.value)} />
                    <button className="eye-toggle" type="button" onClick={() => setShowConfirm(v => !v)}><EyeIcon open={showConfirm} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="terms-row">
              <input type="checkbox" className="terms-checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} id="terms" />
              <label htmlFor="terms" className="terms-text">
                I agree to the <button className="terms-link">Terms of Service</button> and <button className="terms-link">Privacy Policy</button> of AgroFarmers.
              </label>
            </div>

            <button className={`submit-btn ${isFarmer ? "farmer-btn" : "buyer-btn"}${loading ? " loading" : ""}`} onClick={handleSignup} type="button">
              {loading ? (
                <><div className="spinner"/> Creating account…</>
              ) : (
                <>Create {isFarmer ? "Farmer" : "Buyer"} Account <ArrowRight /></>
              )}
            </button>

            <div className="login-row">
              Already have an account? <button 
  className="login-link" 
  type="button"
  onClick={() => navigate("/")}
>
  Sign In
</button>
            </div>
          </div>
        </div>

        {/* ── RIGHT: BRAND ── */}
        <div className="right-brand-panel">
          <svg className="field-art" viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rows2" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <line x1="0" y1="20" x2="40" y2="20" stroke="#D4A855" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="600" height="800" fill="url(#rows2)"/>
            {[...Array(8)].map((_, i) => (
              <ellipse key={i} cx={80 + i * 70} cy={400 + Math.sin(i) * 80} rx="18" ry="60"
                fill="#52A85E" opacity="0.6" transform={`rotate(${-20 + i * 5}, ${80 + i * 70}, ${400 + Math.sin(i) * 80})`}/>
            ))}
          </svg>
          <div className="glow-orb orb-gold"/>
          <div className="glow-orb orb-green"/>
          <div className="glow-orb orb-amber"/>

          <div className="brand-block">
            <div className="brand-icon"><LeafIcon /></div>
            <h1 className="brand-title">Agro<span>Farmers</span></h1>
            <p className="brand-sub">
              A smarter way to grow, sell, and deliver. Empowering farmers and buyers with full supply chain transparency.
            </p>

            <div className="feature-list">
              {features.map((f, i) => (
                <div className="feature-item" key={i}>
                  <div className="feature-dot">{f.icon}</div>
                  <div>
                    <div className="feature-text-title">{f.title}</div>
                    <div className="feature-text-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
