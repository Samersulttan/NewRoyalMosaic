import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import SocialMediaLanding from './pages/SocialMediaLanding';
import Kitchens from './pages/Kitchens';
import Closets from './pages/Closets';
import Doors from './pages/Doors';
import Cladding from './pages/Cladding';
import TvUnit from './pages/TvUnit';
import Bathrooms from './pages/Bathrooms';
import ArabicDesigns from './pages/ArabicDesigns';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Dashboard from './pages/admin/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/social" element={<><Navbar /><SocialMediaLanding /><Footer /></>} />
          <Route path="/kitchens" element={<><Navbar /><Kitchens /><Footer /></>} />
          <Route path="/closets" element={<><Navbar /><Closets /><Footer /></>} />
          <Route path="/doors" element={<><Navbar /><Doors /><Footer /></>} />
          <Route path="/cladding" element={<><Navbar /><Cladding /><Footer /></>} />
          <Route path="/tv-units" element={<><Navbar /><TvUnit /><Footer /></>} />
          <Route path="/bathrooms" element={<><Navbar /><Bathrooms /><Footer /></>} />
          <Route path="/arabic-designs" element={<><Navbar /><ArabicDesigns /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;