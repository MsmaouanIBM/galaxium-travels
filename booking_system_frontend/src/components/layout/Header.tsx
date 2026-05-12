import { Link, useLocation } from 'react-router-dom';
import { Rocket, User, LogOut } from 'lucide-react';
import { useUser } from '../../hooks/useUser';
import { Button } from '../common';
import { motion } from 'framer-motion';

export const Header = () => {
  const location = useLocation();
  const { user, logout } = useUser();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-[#0a0e1a] border-b border-gray-800">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Rocket className="text-purple-500" size={24} />
            <span className="text-lg font-normal bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Galaxium Travels
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm transition-colors ${
                isActive('/')
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/flights"
              className={`text-sm transition-colors ${
                isActive('/flights')
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Flights
            </Link>
            <Link
              to="/bookings"
              className={`text-sm transition-colors ${
                isActive('/bookings')
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              My Bookings
            </Link>
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-sm text-gray-300">
              <User size={16} className="text-purple-500" />
              Siddhartha Sood
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-gray-800 hover:bg-gray-700 rounded transition-colors"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center gap-03 mt-03 pt-03 border-t border-carbon-border-subtle">
          <Link
            to="/"
            className={`text-sm font-normal px-03 py-02 transition-colors ${
              isActive('/')
                ? 'text-carbon-text-primary bg-carbon-layer-02'
                : 'text-carbon-text-secondary hover:text-carbon-text-primary'
            }`}
          >
            Home
          </Link>
          <Link
            to="/flights"
            className={`text-sm font-normal px-03 py-02 transition-colors ${
              isActive('/flights')
                ? 'text-carbon-text-primary bg-carbon-layer-02'
                : 'text-carbon-text-secondary hover:text-carbon-text-primary'
            }`}
          >
            Flights
          </Link>
          {user && (
            <Link
              to="/bookings"
              className={`text-sm font-normal px-03 py-02 transition-colors ${
                isActive('/bookings')
                  ? 'text-carbon-text-primary bg-carbon-layer-02'
                  : 'text-carbon-text-secondary hover:text-carbon-text-primary'
              }`}
            >
              My Bookings
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

// Made with Bob - IBM Carbon Design System
