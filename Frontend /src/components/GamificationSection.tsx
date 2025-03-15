import React from 'react';
import { Award, Trophy, Zap } from 'lucide-react';
export const GamificationSection = () => {
  const challenges = [{
    title: '30-Day Plastic-Free Challenge',
    points: 200,
    participants: 156,
    deadline: 'Oct 30, 2023',
    color: 'from-green-500 to-green-300'
  }, {
    title: 'Campus Clean-Up Initiative',
    points: 150,
    participants: 89,
    deadline: 'Ongoing',
    color: 'from-blue-500 to-blue-300'
  }, {
    title: 'Upcycling Competition',
    points: 300,
    participants: 42,
    deadline: 'Nov 15, 2023',
    color: 'from-purple-500 to-purple-300'
  }];
  const leaderboard = [{
    name: 'Alex Johnson',
    points: 1250,
    badge: 'Eco Warrior'
  }, {
    name: 'Maria Garcia',
    points: 980,
    badge: 'Sustainability Champion'
  }, {
    name: 'David Ndlovu',
    points: 875,
    badge: 'Green Innovator'
  }, {
    name: 'Priya Patel',
    points: 820,
    badge: 'Waste Reducer'
  }, {
    name: 'Kwame Osei',
    points: 790,
    badge: 'Circular Designer'
  }];
  return <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Gamification & Rewards
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Earn points, complete challenges, and climb the sustainability
            leaderboard.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Active Challenges</h3>
              <button className="text-green-600 hover:text-green-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-6">
              {challenges.map((challenge, index) => <div key={index} className="bg-gray-50 rounded-lg p-5">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold">{challenge.title}</h4>
                    <div className="flex items-center bg-white px-3 py-1 rounded-full">
                      <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">
                        {challenge.points} pts
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{challenge.participants} participants</span>
                    <span>Deadline: {challenge.deadline}</span>
                  </div>
                  <button className="w-full py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:shadow-md transition-shadow">
                    Join Challenge
                  </button>
                </div>)}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
              <h3 className="text-xl font-bold">Leaderboard</h3>
            </div>
            <div className="space-y-4">
              {leaderboard.map((user, index) => <div key={index} className={`flex items-center p-3 rounded-lg ${index === 0 ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-200'} text-white font-bold`}>
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      {user.badge}
                    </div>
                  </div>
                  <div className="font-bold">{user.points}</div>
                </div>)}
            </div>
            <button className="w-full mt-6 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:shadow-md transition-shadow">
              View Full Leaderboard
            </button>
          </div>
        </div>
      </div>
    </section>;
};