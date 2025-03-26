import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { DashboardSidebar } from './DashboardSidebar';
import { NotificationsDropdown } from './NotificationsDropdown';
import { SearchBar } from './SearchBar';

export const DashboardLayout: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const {
    user,
    logout
  } = useAuth();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/signin');
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} transition-all duration-200`}>
        {/* Header */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30 transition-all duration-200">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center flex-1">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex-1 flex items-center justify-end lg:justify-between">
                <div className="flex-1 max-w-xl mx-4 hidden lg:block">
                  <SearchBar isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={toggleTheme} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200">
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </button>
                  <NotificationsDropdown isOpen={isNotificationsOpen} setIsOpen={setIsNotificationsOpen} openSidebar={() => setIsSidebarOpen(true)} />
                  <div className="relative">
                    <button className="flex items-center space-x-3 focus:outline-none">
                      <img src={user?.avatar} alt={user?.fullName} className="h-8 w-8 rounded-full object-cover" />
                      <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-200">
                        {user?.fullName}
                      </span>
                    </button>
                  </div>
                  <button onClick={handleLogout} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <main className="pt-16 h-screen overflow-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>;
};