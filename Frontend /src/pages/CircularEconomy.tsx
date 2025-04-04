import React from 'react';

const CircularEconomy = () => {
  return (
    <section className="pt-20 pb-20 px-4 md:pt-28 md:pb-28 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Circular Economy 101
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Understand the basics of the circular economy and how it can transform industries. Learn how to design out waste, keep products in use, and regenerate natural systems.
        </p>
        <div className="text-gray-600">
          <p>1. Design for durability, reuse, and recycling.</p>
          <p>2. Shift to renewable energy sources.</p>
          <p>3. Promote sharing and collaborative consumption.</p>
          <p>4. Support policies that encourage circular practices.</p>
        </div>
      </div>
    </section>
  );
};

export default CircularEconomy;