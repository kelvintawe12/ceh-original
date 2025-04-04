import React from 'react';

const SustainableLiving = () => {
  return (
    <section className="pt-20 pb-20 px-4 md:pt-28 md:pb-28 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Sustainable Living Guide
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Learn practical tips and strategies to live a more sustainable life. From reducing waste to adopting eco-friendly habits, this guide will help you make a positive impact on the planet.
        </p>
        <div className="text-gray-600">
          <p>1. Reduce, Reuse, Recycle.</p>
          <p>2. Conserve energy and water.</p>
          <p>3. Support sustainable brands.</p>
          <p>4. Grow your own food.</p>
        </div>
      </div>
    </section>
  );
};

export default SustainableLiving;