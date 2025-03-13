import React from 'react';
import { BookOpen, Users, PieChart, Award, Map, Calendar } from 'lucide-react';
export const Features = () => {
  const features = [{
    icon: <BookOpen className="h-8 w-8 text-green-500" />,
    title: 'Knowledge Center',
    description: 'Access articles, reports, and tutorials on circular economy principles.',
    color: 'from-green-500 to-green-600'
  }, {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: 'Collaboration Hub',
    description: 'Join discussions, submit ideas, and connect with sustainability enthusiasts.',
    color: 'from-blue-500 to-blue-600'
  }, {
    icon: <PieChart className="h-8 w-8 text-indigo-500" />,
    title: 'Project Dashboard',
    description: 'Track and monitor campus sustainability initiatives and measure impact.',
    color: 'from-indigo-500 to-indigo-600'
  }, {
    icon: <Award className="h-8 w-8 text-yellow-500" />,
    title: 'Gamification System',
    description: 'Earn badges, join challenges, and compete on sustainability leaderboards.',
    color: 'from-yellow-500 to-yellow-600'
  }, {
    icon: <Map className="h-8 w-8 text-red-500" />,
    title: 'Interactive Map',
    description: 'Locate waste collection points and track sustainability efforts on campus.',
    color: 'from-red-500 to-red-600'
  }, {
    icon: <Calendar className="h-8 w-8 text-purple-500" />,
    title: 'Event Management',
    description: 'Discover workshops, hackathons, and guest lectures on sustainability.',
    color: 'from-purple-500 to-purple-600'
  }];
  return <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Hub for Circular Economy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover all the tools you need to learn, collaborate, and make a
            difference in sustainability.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-6">
                <div className="rounded-full bg-gray-50 w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};