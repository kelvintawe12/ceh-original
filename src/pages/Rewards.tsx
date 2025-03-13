import React from 'react';
import { motion } from 'framer-motion';
import { Star, Award, Zap, Gift, ChevronRight } from 'react-feather';

const Rewards = () => {
  const badges = [
    { id: 1, name: 'Eco Novice', icon: <Star />, progress: 100, unlocked: true },
    { id: 2, name: 'Plastic Free', icon: <Award />, progress: 75, unlocked: false },
    { id: 3, name: 'Upcycle Master', icon: <Award />, progress: 30, unlocked: false },
  ];

  const challenges = [
    { title: '30-Day Green Streak', progress: 15/30, points: 500 },
    { title: 'Recycle 50 Items', progress: 32/50, points: 300 },
    { title: 'Zero Waste Week', progress: 3/7, points: 200 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent"
          >
            Earn Green Glory
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Turn sustainable actions into meaningful rewards and recognition
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-emerald-100 dark:bg-emerald-900 rounded-xl">
                <Zap className="text-emerald-600 dark:text-emerald-400" size={32} />
              </div>
              <div className="text-left">
                <div className="text-sm text-gray-500">Current Level</div>
                <div className="text-3xl font-bold">Eco Warrior</div>
                <div className="text-emerald-600">1,200/2,000 XP</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Progress Ring */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="relative w-64 h-64 mx-auto"
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 dark:text-gray-700"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-emerald-600"
                strokeWidth="8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                strokeDasharray="251.2"
                strokeDashoffset="100.48" // 60% progress
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold">60%</div>
              <div className="text-sm">to Next Level</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Badges Grid */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">Earn Badges</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg text-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-emerald-100 dark:bg-emerald-900 rounded-2xl flex items-center justify-center">
                  {React.cloneElement(badge.icon, { 
                    className: `w-12 h-12 ${badge.unlocked ? 'text-emerald-600' : 'text-gray-400'}`
                  })}
                </div>
                <h3 className="text-xl font-semibold mb-2">{badge.name}</h3>
                {badge.unlocked ? (
                  <div className="text-emerald-600">Unlocked!</div>
                ) : (
                  <div className="text-gray-500">
                    {badge.progress}% Complete
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">Active Challenges</h2>
          <div className="space-y-6">
            {challenges.map((challenge) => (
              <motion.div
                key={challenge.title}
                whileHover={{ x: 10 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{challenge.title}</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(challenge.progress * 100).toFixed(0)}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-6 text-right">
                    <div className="text-2xl font-bold text-emerald-600">
                      {challenge.points}
                    </div>
                    <div className="text-sm">XP</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Redemption Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">Redeem Points</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
                <h3 className="text-lg font-semibold mb-2">Sustainable Swag Pack</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="text-emerald-600 font-bold">500 XP</div>
                </div>
                <button className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                  Redeem
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-emerald-600 to-teal-500">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Start Earning Today</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            View All Challenges
          </motion.button>
        </div>
      </section>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center"
      >
        <Gift size={24} />
      </motion.button>
    </div>
  );
};

export default Rewards;