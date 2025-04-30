import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts/AuthContext';
import { ImageProvider } from './contexts/ImageContext';

import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <ImageProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1e1e1e',
                color: '#fff',
                border: '1px solid #333',
              },
              duration: 3000,
            }} 
          />
        </ImageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;