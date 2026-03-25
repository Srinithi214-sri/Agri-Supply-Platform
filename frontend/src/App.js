import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FarmerLogin from './FarmerLogin';
import FarmerSignup from './FarmerSignup';
import MandiPrices from './MandiPrices';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FarmerLogin />} />
        <Route path="/signup" element={<FarmerSignup />} />
        <Route path="/dashboard" element={<MandiPrices />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;