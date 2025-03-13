import  ReactDOM  from 'react-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Plus } from 'react-feather';

const Collaborate = () => {
  const discussions = [
    { 
      id: 1, 
      title: 'Campus Upcycling Challenge', 
      comments: 45, 
      author: 'EcoTeam',
      tags: ['#WasteReduction', '#DIY']
    },
    { 
      id: 2, 
      title: 'Zero-Waste Dorm Solutions', 
      comments: 28, 
      author: 'GreenLiving',
      tags: ['#StudentLife', '#Sustainability']
    },
    { 
      id: 3, 
      title: 'Renewable Energy Hackathon', 
      comments: 63, 
      author: 'PowerSaviors',
      tags: ['#CleanEnergy', '#Innovation']
    },
  ];

  const projects = [
    { 
      id: 1, 
      name: 'Plastic Recycling Initiative', 
      progress: 75, 
      members: 12,
      description: 'Transforming campus plastic waste into useful products'
    },
    { 
      id: 2, 
      name: 'Compost Network Expansion', 
      progress: 40, 
      members: 8,
      description: 'Creating community composting stations across campus'
    },
    { 
      id: 3, 
      name: 'E-Waste Collection Drive', 
      progress: 90, 
      members: 15,
      description: 'Proper disposal and recycling of electronic waste'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent">
            Collective Impact Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Join forces with eco-innovators, sustainability experts, and green thinkers to co-create impactful environmental solutions
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 text-white px-8 py-4 rounded-2xl flex items-center gap-2 mx-auto hover:bg-emerald-700 transition-all"
          >
            <Plus size={20} />
            Launch Your Eco-Initiative
          </motion.button>
        </motion.div>
      </section>

      {/* Live Activity Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white text-center">
            Active Sustainability Collaborations
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Discussion Forum Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="text-emerald-600" />
                <h3 className="text-xl font-semibold">Eco-Discussions Live</h3>
              </div>
              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <motion.div
                    key={discussion.id}
                    whileHover={{ x: 5 }}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer"
                  >
                    <h4 className="font-medium mb-2">{discussion.title}</h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {discussion.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>💬 {discussion.comments} comments</span>
                      <span>👤 @{discussion.author}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Collaboration Channels */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-emerald-600" />
                <h3 className="text-xl font-semibold">Eco-Channels</h3>
              </div>
              <div className="space-y-4">
                {['Upcycling', 'Renewables', 'Zero-Waste'].map((channel, index) => (
                  <motion.div
                    key={channel}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span>🌱 {channel}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{1.2 + index * 0.4}k members</span>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Idea Submission */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 opacity-10 dark:opacity-5" />
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Innovation Incubator</h3>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="space-y-4"
              >
                <textarea
                  placeholder="Share your green innovation..."
                  className="w-full p-4 bg-gray-50 dark:bg-gray-700 rounded-lg min-h-[120px] focus:ring-2 ring-emerald-500 placeholder-gray-400 dark:placeholder-gray-500"
                />
                <div className="flex gap-2 flex-wrap">
                  {['Upcycling', 'Energy', 'Food-Waste', 'Biodiversity'].map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 rounded-full text-sm"
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
                <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                  <Rocket size={18} />
                  Launch Idea
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white text-center">
            Impact Projects in Motion
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity dark:opacity-20" />
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-4">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="ml-4 text-emerald-600">{project.progress}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[...Array(project.members)].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-700"
                        />
                      ))}
                    </div>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center gap-2">
                      <Users size={16} />
                      Join
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Finder */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white text-center">
            Meet Eco-Collaborators
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: item * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl text-center shadow-lg"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 animate-pulse" />
                <h3 className="text-lg font-semibold mb-2">Eco-Team Member</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Skills: {['Upcycling', 'Renewables', 'Community Organizing'][item % 3]}
                </p>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center justify-center gap-2 w-full">
                  <Users size={16} />
                  Connect
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center"
      >
        <Plus size={24} />
      </motion.button>
    </div>
  );
};

export default Collaborate;