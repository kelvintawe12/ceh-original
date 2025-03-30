import { motion } from 'framer-motion';
import { BookOpen, Video, Link, FileText, ArrowRight } from 'lucide-react';
import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";


export const Learn = () => {
  const [resources, setResourceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const resourceIcons = {
    document: <BookOpen className="w-6 h-6 text-white" />,
    video: <Video className="w-6 h-6 text-white" />,
    link: <Link className="w-6 h-6 text-white" />,
    other: <FileText className="w-6 h-6 text-white" />,
  };

  useEffect(() => {

    const fetchResourceData = async () => {
      try {
        const response = await api.get(`/resources`);
        setResourceData(response.data.data);
      } catch (err) {
        setError("Failed to load resource data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchResourceData();
  }, []);
  

  if (loading) {
    return <div className="text-center">Loading resource...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

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
                  src={resource.file} 
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
                  <a
                    href={resource.link || `/resources/${resource.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <span className="font-medium">Explore Resource</span>
                    <ArrowRight className="w-4 h-4 mt-0.5 transform group-hover:translate-x-1 transition-transform" />
                  </a>
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