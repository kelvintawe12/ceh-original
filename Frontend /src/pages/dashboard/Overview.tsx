import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { BarChart, Users, BookOpen, Award } from 'lucide-react';
export const Overview = () => {
  const {
    user
  } = useAuth();
  const stats = [{
    name: 'Projects',
    value: '12',
    icon: BarChart,
    change: '+2.5%'
  }, {
    name: 'Collaborators',
    value: '24',
    icon: Users,
    change: '+12%'
  }, {
    name: 'Resources',
    value: '150+',
    icon: BookOpen,
    change: '+8%'
  }, {
    name: 'Points',
    value: '2,345',
    icon: Award,
    change: '+23%'
  }];
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome , {user?.fullName}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Here's what\'s happening with your sustainability projects
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => <div key={stat.name} className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 px-5 py-3">
              <div className="text-sm text-green-600 dark:text-green-400">
                {stat.change} from last month
              </div>
            </div>
          </div>)}
      </div>
      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Earned "Eco Warrior" badge
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                2 hours ago
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Joined "Campus Clean-Up" project
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                1 day ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};