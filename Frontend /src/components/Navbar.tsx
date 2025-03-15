import React, { useEffect, useState } from 'react';
import { Search, Menu, X, User, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white bg-opacity-90 shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              CircularHub
            </span>
          </Link>
        </div>
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
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Search className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <button onClick={() => navigate('/signin')} className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all">
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </button>
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
                <button onClick={() => navigate('/signin')} className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all">
                <User className="h-4 w-4" />
                <span>Sign In</span>
                </button>
                {/* <button onClick={() => navigate('/signup')} className="flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all">
                <User className="h-4 w-4" />
                <span>Sign Up</span>
                </button> */}
              
            </nav>
          </div>
        </div>}
    </header>;
};