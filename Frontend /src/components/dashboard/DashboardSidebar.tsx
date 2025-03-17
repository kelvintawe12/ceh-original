import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Users, Calendar, Map, Award, Settings, User } from 'lucide-react';
type DashboardSidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpen,
  setIsOpen
}) => {
  const location = useLocation();
  const navigation = [{
    name: 'Dashboard',
    icon: Home,
    href: '/dashboard'
  }, {
    name: 'Learn',
    icon: BookOpen,
    href: '/dashboard/learn'
  }, {
    name: 'Collaborate',
    icon: Users,
    href: '/dashboard/collaborate'
  }, {
    name: 'Events',
    icon: Calendar,
    href: '/dashboard/events'
  }, {
    name: 'Map',
    icon: Map,
    href: '/dashboard/map'
  }, {
    name: 'Rewards',
    icon: Award,
    href: '/dashboard/rewards'
  }, {
    name: 'Profile',
    icon: User,
    href: '/dashboard/profile'
  }, {
    name: 'Settings',
    icon: Settings,
    href: '/dashboard/Settings'
  }];
  return <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden" onClick={() => setIsOpen(false)} />}
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 transform ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 lg:w-20'} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="px-2 py-4">
              {navigation.map(item => {
              const isActive = location.pathname === item.href;
              return <li key={item.name} className="mb-2">
                    <Link to={item.href} className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-150 ${isActive ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                      <item.icon className="h-5 w-5" />
                      <span className={`ml-3 ${!isOpen && 'lg:hidden'}`}>
                        {item.name}
                      </span>
                    </Link>
                  </li>;
            })}
            </ul>
          </nav>
        </div>
      </aside>
    </>;
};