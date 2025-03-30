import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { BarChart, Users, BookOpen, Award } from "lucide-react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export const Overview = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.token) {
      return;
    }
  
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${API_URL}/dashboard`, {
          headers: { Authorization: `Token ${user?.token}` },
        });
        setDashboardData(response.data.data);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    
  
    fetchDashboardData();
  }, [user]);

  const stats = dashboardData
  ? [
      {
        name: "Projects",
        value: dashboardData.projects.count,
        icon: BarChart,
        change: `${dashboardData.projects.percentage_change}%`,
      },
      {
        name: "Collaborators",
        value: dashboardData.collaborators.count,
        icon: Users,
        change: `${dashboardData.collaborators.percentage_change}%`,
      },
      {
        name: "Resources",
        value: dashboardData.resources.count,
        icon: BookOpen,
        change: `${dashboardData.resources.percentage_change}%`,
      },
      {
        name: "Points",
        value: dashboardData.points.count,
        icon: Award,
        change: `${dashboardData.points.percentage_change}%`,
      },
    ]
  : [];


  if (loading) {
    return <div className="text-center">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome , {dashboardData?.user.full_name}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Here's what's happening with your sustainability projects
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
        {dashboardData?.recent_activity?.length > 0 ? (
          <div className="space-y-4">
            {dashboardData.recent_activity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No recent activity yet.
            </p>
          )}

      </div>
    </div>
  );
  
};