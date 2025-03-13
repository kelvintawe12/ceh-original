import React, { useEffect, useRef } from 'react';
import { MapIcon, Layers, Navigation } from 'lucide-react';
export const InteractiveMap = () => {
  const mapContainerRef = useRef(null);
  useEffect(() => {
    // This would be where we initialize Leaflet map
    // For now, we'll just display a placeholder
  }, []);
  return <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Interactive Sustainability Map
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore waste collection points and sustainability initiatives
            across campus.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <div className="flex items-center">
              <MapIcon className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="font-medium">Campus Map</h3>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Layers className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Navigation className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div ref={mapContainerRef} className="h-96 bg-gray-100 relative">
            {/* This would be replaced with an actual Leaflet map */}
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80" alt="Campus map" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-sm">Recycling Bins</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
                    <span className="text-sm">Active Projects</span>
                  </div>
                  <div className="flex items-center">
                    <span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>
                    <span className="text-sm">Events</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};