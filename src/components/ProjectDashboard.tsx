import React from 'react';
import { BarChart, PieChart, TrendingUp, Users } from 'lucide-react';
export const ProjectDashboard = () => {
  const projects = [{
    name: 'Campus Plastic Reduction',
    progress: 75,
    members: 24,
    impact: '2.5 tons diverted',
    color: 'from-green-500 to-green-300'
  }, {
    name: 'E-Waste Recycling Drive',
    progress: 45,
    members: 16,
    impact: '820 devices collected',
    color: 'from-blue-500 to-blue-300'
  }, {
    name: 'Zero-Waste Cafeteria',
    progress: 90,
    members: 32,
    impact: '85% waste reduction',
    color: 'from-purple-500 to-purple-300'
  }];
  const stats = [{
    icon: <BarChart className="h-6 w-6 text-green-500" />,
    value: '15',
    label: 'Active Projects'
  }, {
    icon: <Users className="h-6 w-6 text-blue-500" />,
    value: '328',
    label: 'Contributors'
  }, {
    icon: <PieChart className="h-6 w-6 text-purple-500" />,
    value: '8.2',
    label: 'Tons Waste Diverted'
  }, {
    icon: <TrendingUp className="h-6 w-6 text-yellow-500" />,
    value: '42%',
    label: 'Monthly Growth'
  }];
  return <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Project Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track progress of campus sustainability initiatives and their
            real-world impact.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">
              Active Sustainability Projects
            </h3>
            <div className="space-y-8">
              {projects.map((project, index) => <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-sm text-gray-500">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${project.color} rounded-full`} style={{
                  width: `${project.progress}%`
                }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{project.members} members</span>
                    <span>{project.impact}</span>
                  </div>
                </div>)}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6">Impact Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>)}
            </div>
          </div>
        </div>
        <div className="text-center">
          <button className="px-6 py-3 bg-white text-gray-800 rounded-full text-lg font-medium border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all">
            View All Projects
          </button>
        </div>
      </div>
    </section>;
};