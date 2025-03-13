import { motion } from 'framer-motion';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Globe, Factory, Leaf, Zap, Joystick } from 'lucide-react';

const Map = () => {
  // Mock data for circular economy statistics
  const countryStats = [
    { 
      id: 1,
      name: 'Germany',
      coordinates: [10.4515, 51.1657],
      recyclingRate: 68,
      renewableEnergy: 46,
      circularScore: 82,
      color: '#3B82F6'
    },
    {
      id: 2,
      name: 'Netherlands',
      coordinates: [5.2913, 52.1326],
      recyclingRate: 81,
      renewableEnergy: 34,
      circularScore: 88,
      color: '#10B981'
    },
    {
      id: 3,
      name: 'Sweden',
      coordinates: [18.6435, 60.1282],
      recyclingRate: 99,
      renewableEnergy: 60,
      circularScore: 95,
      color: '#8B5CF6'
    }
  ];

  // World map topology
  const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-emerald-400 bg-clip-text text-transparent">
            Global Circular Economy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore worldwide sustainability metrics and circular economy adoption
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Interactive Map */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6"
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 120,
                center: [10, 50]
              }}
              className="w-full h-[500px]"
            >
              <Geographies geography={geoUrl}>
                {({ geographies }: { geographies: any[] }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#E5E7EB"
                      stroke="#6B7280"
                      strokeWidth={0.5}
                      className="outline-none hover:fill-blue-100 transition-colors dark:fill-gray-700 dark:stroke-gray-600"
                    />
                  ))
                }
              </Geographies>

              {countryStats.map(({ id, coordinates, color, name }) => (
                <Marker key={id} coordinates={coordinates}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 rounded-full shadow-lg border-2 border-white"
                    style={{ backgroundColor: color }}
                    title={name}
                  />
                </Marker>
              ))}
            </ComposableMap>
          </motion.div>

          {/* Statistics Panel */}
          <div className="grid gap-6">
            {countryStats.map((country, index) => (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: country.color }}
                  >
                    <Globe className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {country.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Joystick className="w-6 h-6 text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-500">Recycling Rate</p>
                          <p className="text-xl font-bold">{country.recyclingRate}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Zap className="w-6 h-6 text-green-500" />
                        <div>
                          <p className="text-sm text-gray-500">Renewable Energy</p>
                          <p className="text-xl font-bold">{country.renewableEnergy}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Leaf className="w-6 h-6 text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-500">Circular Score</p>
                          <p className="text-xl font-bold">{country.circularScore}/100</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Factory className="w-6 h-6 text-orange-500" />
                        <div>
                          <p className="text-sm text-gray-500">CO₂ Reduction</p>
                          <p className="text-xl font-bold">24%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap gap-6 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500" />
            <span className="text-gray-600 dark:text-gray-300">Recycling Facilities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-gray-600 dark:text-gray-300">Renewable Energy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500" />
            <span className="text-gray-600 dark:text-gray-300">Circular Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Map;