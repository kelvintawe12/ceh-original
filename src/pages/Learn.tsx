import React from 'react';

export const Learn = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-teal-100 to-white">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6 text-teal-700">Learning Resources</h1>
        <p className="text-xl text-gray-600 mb-12">
          Discover educational content about circular economy.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src="path/to/image1.jpg" alt="Resource 1" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Beginner’s Guide to Circular Economy</h2>
              <p className="text-gray-700 mb-4">Learn the basics of circular economy principles and practices.</p>
              <a href="#" className="text-teal-500 hover:text-teal-700">Read More</a>
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src="path/to/image2.jpg" alt="Resource 2" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Latest Research Reports</h2>
              <p className="text-gray-700 mb-4">Stay updated with the latest research and findings in the field.</p>
              <a href="#" className="text-teal-500 hover:text-teal-700">Read More</a>
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img src="path/to/image3.jpg" alt="Resource 3" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Case Study: Campus Zero-Waste Initiative</h2>
              <p className="text-gray-700 mb-4">Explore how campuses are implementing zero-waste initiatives.</p>
              <a href="#" className="text-teal-500 hover:text-teal-700">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};