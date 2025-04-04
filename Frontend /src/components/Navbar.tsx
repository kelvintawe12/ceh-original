import React, { useEffect, useState } from 'react';
import { Search, Menu, X, User, Bell, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



export const Navbar = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  
  
  
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };
  
  return(
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white bg-opacity-90 shadow-md' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              CircularHub
            </span>
          </Link>
        </div>
        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">
            Home
          </Link>
          <Link to="/learn" className="text-gray-700 hover:text-green-600 transition-colors">
            Learn
          </Link>
          <Link to="/collaborate" className="text-gray-700 hover:text-green-600 transition-colors">
            Collaborate
          </Link>
          <Link to="/events" className="text-gray-700 hover:text-green-600 transition-colors">
            Events
          </Link>
          <Link to="/map" className="text-gray-700 hover:text-green-600 transition-colors">
            Map
          </Link>
          <Link to="/rewards" className="text-gray-700 hover:text-green-600 transition-colors">
            Rewards
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">
            About
          </Link>
          <Link to="/dashboard/profile" className="text-gray-700 hover:text-green-600 transition-colors">
            Profile
          </Link>
          <Link to="/dashboard/notifications" className="text-gray-700 hover:text-green-600 transition-colors">
            Notifications
          </Link>
          <Link to="/dashboard/settings" className="text-gray-700 hover:text-green-600 transition-colors">
            Settings
          </Link>
        </nav>

        {/* User Actions (Login/Logout) */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Search className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>

          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-green-600 transition-colors">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-gray-700 hover:text-green-600 transition-colors">
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                Register
              </Link>
            </>
          )}
          
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {isMenuOpen && <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-3 pb-3">
              <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors py-2">
                Home
              </Link>
              <Link to="/learn" className="text-gray-700 hover:text-green-600 transition-colors py-2">
                Learn
              </Link>
              <Link to="/collaborate" className="text-gray-700 hover:text-green-600 transition-colors py-2">
                Collaborate
              </Link>
              <Link to="/events" className="text-gray-700 hover:text-green-600 transition-colors py-2">
                Events
              </Link>
              <Link to="/map" className="text-gray-700 hover:text-green-600 transition-colors py-2">
                Map
              </Link>
              <Link to="/rewards" className="text-gray-700 hover:text-green-600 transition-colors py-2">
                Rewards
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors py-2">
                About
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-green-600 transition-colors py-2">
                Profile
              </Link>
              <Link to="/notifications" className="text-gray-700 hover:text-green-600 transition-colors py-2">
                Notifications
              </Link>
              <Link to="/settings" className="text-gray-700 hover:text-green-600 transition-colors py-2">
                Settings
              </Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-green-600 transition-colors py-2">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="text-gray-700 hover:text-green-600 transition-colors py-2">
                    Sign In
                  </Link>
                  <Link to="/signup" className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all">
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>}
    </header>
  );
};