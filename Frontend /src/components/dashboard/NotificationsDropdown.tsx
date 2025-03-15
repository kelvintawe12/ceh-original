import React, { useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
type NotificationsDropdownProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  isOpen,
  setIsOpen
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);
  const notifications = [{
    id: 1,
    title: 'New Project Update',
    message: 'Campus Plastic Reduction project reached 75% completion',
    time: '5 minutes ago',
    unread: true
  }, {
    id: 2,
    title: 'Event Reminder',
    message: 'Circular Design Workshop starts in 2 hours',
    time: '2 hours ago',
    unread: true
  }, {
    id: 3,
    title: 'Challenge Completed',
    message: 'You earned the "Waste Warrior" badge',
    time: '1 day ago',
    unread: false
  }];
  return <div ref={dropdownRef} className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200">
        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center">
          <span className="text-xs text-white">2</span>
        </span>
        <Bell className="h-5 w-5" />
      </button>
      {isOpen && <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Notifications
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.map(notification => <div key={notification.id} className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-150 ${notification.unread ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                <div className="flex items-start">
                  {notification.unread && <div className="h-2 w-2 mt-2 rounded-full bg-green-500 mr-2" />}
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {notification.message}
                    </p>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>)}
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full text-center text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
              View all notifications
            </button>
          </div>
        </div>}
    </div>;
};