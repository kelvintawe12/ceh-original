import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const resources = [
  {
    title: 'Sustainable Living Guide',
    description: 'Learn practical tips and strategies to live a more sustainable life.',
    link: '/resources/sustainable-living',
  },
  {
    title: 'Circular Economy 101',
    description: 'Understand the basics of the circular economy and how it can transform industries.',
    link: '/resources/circular-economy',
  },
  {
    title: 'Community Projects',
    description: 'Explore inspiring projects led by communities around the world.',
    link: '/resources/community-projects',
  },
  {
    title: 'Recycling Best Practices',
    description: 'Discover effective ways to recycle and reduce waste in your daily life.',
    link: '/resources/recycling',
  },
];

const Resources = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-20 pb-20 px-4 md:pt-28 md:pb-28 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Explore Our Resources
          </h1>
          <p className="text-lg text-gray-700">
            Dive into a curated collection of resources to help you learn, grow, and make an impact.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{resource.title}</h2>
                <p className="text-gray-600 mb-6">{resource.description}</p>
              </div>
              <button
                onClick={() => navigate(resource.link)}
                className="mt-auto px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full text-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Learn More
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;