import React from 'react';

const Recycling = () => {
  return (
    <section className="pt-20 pb-20 px-4 md:pt-28 md:pb-28 bg-gray-50">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Recycling Best Practices
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Discover effective ways to recycle and reduce waste in your daily life. Learn how to sort, clean, and dispose of materials responsibly to minimize environmental impact.
        </p>
        <div className="text-gray-600">
          <p>1. Separate recyclables from non-recyclables.</p>
          <p>2. Clean and dry materials before recycling.</p>
          <p>3. Avoid contamination by keeping food waste out of recycling bins.</p>
          <p>4. Know your local recycling guidelines.</p>
        </div>
      </div>
    </section>
  );
};

export default Recycling;