import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FarmerLogin from './FarmerLogin';
import FarmerSignup from './FarmerSignup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FarmerLogin />} />
        <Route path="/signup" element={<FarmerSignup />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;