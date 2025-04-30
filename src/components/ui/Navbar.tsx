import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { authState, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-dark-200/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                PixelMind
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-primary-700/20 text-primary-400' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              Create
            </Link>
            {authState.isAuthenticated && (
              <Link
                to="/gallery"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/gallery') 
                    ? 'bg-primary-700/20 text-primary-400' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                Gallery
              </Link>
            )}
            {authState.isAuthenticated ? (
              <button
                onClick={logout}
                className="ml-2 btn-outline text-sm"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/login') 
                      ? 'bg-primary-700/20 text-primary-400' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-200 border-b border-gray-800 pb-3 px-4">
          <div className="flex flex-col space-y-2 pt-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-primary-700/20 text-primary-400' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
              onClick={closeMenu}
            >
              Create
            </Link>
            {authState.isAuthenticated && (
              <Link
                to="/gallery"
                className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/gallery') 
                    ? 'bg-primary-700/20 text-primary-400' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={closeMenu}
              >
                Gallery
              </Link>
            )}
            {authState.isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="btn-outline text-sm w-full"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/login') 
                      ? 'bg-primary-700/20 text-primary-400' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={closeMenu}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;