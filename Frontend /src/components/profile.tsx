import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Building, Award, BookOpen, Calendar, MapPin, Edit, Camera, Shield } from 'lucide-react';
export const Profile = () => {
  const {
    user
  } = useAuth();
  const achievements = [{
    name: 'Eco Warrior',
    icon: Shield,
    date: 'Earned 2 weeks ago'
  }, {
    name: 'Project Leader',
    icon: User,
    date: 'Earned 1 month ago'
  }, {
    name: 'Resource Champion',
    icon: BookOpen,
    date: 'Earned 2 months ago'
  }];
  const activities = [{
    type: 'project',
    title: 'Started Campus Recycling Initiative',
    date: '2 days ago',
    icon: BookOpen,
    color: 'bg-green-100 text-green-600'
  }, {
    type: 'event',
    title: 'Attended Sustainability Workshop',
    date: '1 week ago',
    icon: Calendar,
    color: 'bg-blue-100 text-blue-600'
  }, {
    type: 'achievement',
    title: 'Earned Eco Warrior Badge',
    date: '2 weeks ago',
    icon: Award,
    color: 'bg-yellow-100 text-yellow-600'
  }];
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-green-400 to-blue-500">
          <button className="absolute bottom-2 right-2 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors">
            <Camera className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-5">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="relative -mt-16">
                <img src={user?.avatar} alt={user?.fullName} className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 bg-white" />
                <button className="absolute bottom-0 right-0 p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 sm:mt-0 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {user?.fullName}
                </h1>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Mail className="flex-shrink-0 mr-1.5 h-4 w-4" />
                    {user?.email}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Building className="flex-shrink-0 mr-1.5 h-4 w-4" />
                    {user?.institution}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4" />
                    Role: {user?.role}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-0">
              <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[{
        label: 'Projects',
        value: '12'
      }, {
        label: 'Contributions',
        value: '48'
      }, {
        label: 'Achievement Points',
        value: '2,345'
      }, {
        label: 'Events Attended',
        value: '15'
      }].map(stat => <div key={stat.label} className="bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {stat.label}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </dd>
            </div>
          </div>)}
      </div>
      {/* Achievements and Activity */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Achievements */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Achievements
            </h3>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-5">
              {achievements.map((achievement, index) => <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <achievement.icon className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {achievement.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {achievement.date}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Recent Activity
            </h3>
          </div>
          <div className="px-6 py-5">
            <div className="space-y-5">
              {activities.map((activity, index) => <div key={index} className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 rounded-full p-2 ${activity.color}`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.date}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};

export default Profile;