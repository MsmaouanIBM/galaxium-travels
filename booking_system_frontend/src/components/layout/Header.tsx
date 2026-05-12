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
    <header className="fixed top-0 left-0 right-0 z-30 bg-carbon-ui-background border-b border-carbon-border-subtle">
      <div className="container mx-auto px-4 py-04">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.3 }}
            >
              <Rocket className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text" size={32} style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }} />
            </motion.div>
            <span className="text-2xl font-normal bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Galaxium Travels
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-05">
            <Link
              to="/"
              className={`text-sm font-normal px-04 py-02 transition-colors ${
                isActive('/')
                  ? 'text-carbon-text-primary bg-carbon-layer-02'
                  : 'text-carbon-text-secondary hover:text-carbon-text-primary hover:bg-carbon-layer-01'
              }`}
            >
              Home
            </Link>
            <Link
              to="/flights"
              className={`text-sm font-normal px-04 py-02 transition-colors ${
                isActive('/flights')
                  ? 'text-carbon-text-primary bg-carbon-layer-02'
                  : 'text-carbon-text-secondary hover:text-carbon-text-primary hover:bg-carbon-layer-01'
              }`}
            >
              Flights
            </Link>
            {user && (
              <Link
                to="/bookings"
                className={`text-sm font-normal px-04 py-02 transition-colors ${
                  isActive('/bookings')
                    ? 'text-carbon-text-primary bg-carbon-layer-02'
                    : 'text-carbon-text-secondary hover:text-carbon-text-primary hover:bg-carbon-layer-01'
                }`}
              >
                My Bookings
              </Link>
            )}
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-03">
            {user && (
              <div className="flex items-center gap-03">
                <div className="hidden md:flex items-center gap-02 text-sm px-03 py-02 bg-carbon-layer-01">
                  <User size={16} className="text-carbon-interactive" />
                  <span className="text-carbon-text-primary">Siddhartha Sood</span>
                </div>
                <Button
                  variant="tertiary"
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-02"
                >
                  <LogOut size={16} />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </div>
            )}
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
