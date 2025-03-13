import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Globe, ArrowRight } from 'lucide-react';

export const Learn = () => {
  const resources = [
    {
      title: "Beginner’s Guide to Circular Economy",
      description: "Master the fundamentals of circular economy principles and sustainable practices.",
      icon: <BookOpen className="w-6 h-6" />,
      image: "path/to/image1.jpg"
    },
    {
      title: "Latest Research Reports",
      description: "Access cutting-edge research and global findings in sustainability.",
      icon: <GraduationCap className="w-6 h-6" />,
      image: "path/to/image2.jpg"
    },
    {
      title: "Campus Zero-Waste Initiatives",
      description: "Discover successful campus sustainability programs worldwide.",
      icon: <Globe className="w-6 h-6" />,
      image: "path/to/image3.jpg"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-emerald-400 bg-clip-text text-transparent">
            Sustainable Learning Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dive into curated resources that empower your journey towards a circular future
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={resource.image} 
                  alt={resource.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                <div className="absolute top-4 right-4 p-3 bg-teal-500/90 rounded-xl backdrop-blur-sm">
                  {resource.icon}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                  {resource.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {resource.description}
                </p>
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
                  <span className="font-medium">Explore Resource</span>
                  <ArrowRight className="w-4 h-4 mt-0.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Want to contribute your own resources?
          </p>
          <button className="bg-teal-600 text-white px-8 py-3 rounded-xl hover:bg-teal-700 transition-all flex items-center gap-2 mx-auto shadow-lg hover:shadow-teal-200/40 dark:hover:shadow-teal-700/20">
            <BookOpen className="w-5 h-5" />
            Submit Content
          </button>
        </motion.div>
      </div>
    </div>
  );
};