import React from 'react';

const CommunityProjects = () => {
  return (
    <section className="pt-20 pb-20 px-4 md:pt-28 md:pb-28 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Community Projects
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Explore inspiring projects led by communities around the world. Learn how people are coming together to create sustainable solutions and drive positive change.
        </p>
        <div className="text-gray-600">
          <p>1. Local recycling initiatives.</p>
          <p>2. Urban gardening and farming projects.</p>
          <p>3. Community clean-up drives.</p>
          <p>4. Renewable energy co-ops.</p>
        </div>
      </div>
    </section>
  );
};

export default CommunityProjects;