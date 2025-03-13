import React from 'react';
import { motion } from 'framer-motion';
import { Globe, RefreshCw, Users } from 'react-feather';
import { UsersIcon } from 'lucide-react';

const About = () => {
  const teamMembers = [
    { name: 'Sarah Eco', role: 'Sustainability Lead', image: 'url-to-image' },
    { name: 'John Green', role: 'Tech Architect', image: 'url-to-image' },
    { name: 'Emma Circular', role: 'Community Manager', image: 'url-to-image' },
  ];

  const values = [
    { icon: <RefreshCw />, title: 'Circular Design', description: 'Promoting zero-waste solutions' },
    { icon: <Users />, title: 'Community', description: 'Connecting sustainability champions' },
    { icon: <UsersIcon />, title: 'Innovation', description: 'Pioneering green technologies' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent">
            Shaping Circular Futures
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Pioneering sustainable innovation through collaboration and technology
          </p>
        </motion.div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="animate-float w-24 h-24 bg-teal-200 rounded-full absolute top-20 left-20" />
          <div className="animate-float-delayed w-32 h-32 bg-emerald-200 rounded-full absolute bottom-20 right-20" />
        </div>
      </section>

      {/* Mission Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              To create a global network of sustainability innovators through education, 
              collaboration, and actionable technology solutions.
            </p>
            <div className="flex gap-4">
              <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all">
                Join Movement
              </button>
            </div>
          </div>
          <div className="relative h-96 bg-gray-100 dark:bg-gray-700 rounded-3xl overflow-hidden">
            <Globe className="w-full h-full p-12 text-teal-100 dark:text-teal-900" />
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Core Values
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-8 rounded-xl bg-teal-50 dark:bg-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 mb-6 text-emerald-600 dark:text-emerald-400">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Meet the Team
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="group text-center"
              >
                <div className="w-64 h-64 mx-auto mb-6 rounded-full bg-gray-200 overflow-hidden relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {member.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-teal-50 dark:bg-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-16 text-gray-800 dark:text-white">
            Trusted By
          </h3>
          <div className="flex flex-wrap justify-center gap-12 opacity-75">
            {['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4'].map((partner, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                className="text-2xl font-bold text-gray-600 dark:text-gray-300"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;