import React, { useState } from 'react';
import { Bell, Moon, Lock, Shield, Globe, Mail, Smartphone, Eye, AlertCircle } from 'lucide-react';
export const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    projectUpdates: true,
    eventReminders: true,
    messages: true
  });
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const settingsSections = [{
    title: 'Notifications',
    icon: Bell,
    settings: [{
      name: 'Email Notifications',
      description: 'Receive email updates about your account activity',
      enabled: notifications.email,
      onChange: () => setNotifications(prev => ({
        ...prev,
        email: !prev.email
      }))
    }, {
      name: 'Push Notifications',
      description: 'Receive push notifications on your device',
      enabled: notifications.push,
      onChange: () => setNotifications(prev => ({
        ...prev,
        push: !prev.push
      }))
    }, {
      name: 'Project Updates',
      description: 'Get notified about updates to your projects',
      enabled: notifications.projectUpdates,
      onChange: () => setNotifications(prev => ({
        ...prev,
        projectUpdates: !prev.projectUpdates
      }))
    }]
  }, {
    title: 'Appearance',
    icon: Eye,
    settings: [{
      name: 'Dark Mode',
      description: 'Use dark theme across the application',
      enabled: darkMode,
      onChange: () => setDarkMode(prev => !prev)
    }]
  }, {
    title: 'Language & Region',
    icon: Globe,
    settings: []
  }];
  return <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Settings
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>
        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map(section => <div key={section.title} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <section.icon className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6 space-y-6">
                {section.settings.map((setting, index) => <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {setting.name}
                      </h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {setting.description}
                      </p>
                    </div>
                    <button type="button" onClick={setting.onChange} className={`${setting.enabled ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}>
                      <span className={`${setting.enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
                    </button>
                  </div>)}
                {section.title === 'Language & Region' && <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        Language
                      </h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Select your preferred language
                      </p>
                    </div>
                    <select value={language} onChange={e => setLanguage(e.target.value)} className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="es">Español</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>}
              </div>
            </div>)}
        </div>
        {/* Privacy and Security Section */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Privacy & Security
              </h3>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-6">
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Change Password
                  </span>
                </div>
                <AlertCircle className="h-5 w-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Update Email
                  </span>
                </div>
                <AlertCircle className="h-5 w-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-center">
                  <Smartphone className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Two-Factor Authentication
                  </span>
                </div>
                <AlertCircle className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        {/* Save Changes Button */}
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>;
};
export default Settings;