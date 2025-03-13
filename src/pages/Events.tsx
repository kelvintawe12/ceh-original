import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowRight, Search } from 'react-feather';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';

const Events = () => {
  const events = [
    {
      id: 1,
      title: "Circular Design Workshop",
      date: "15 OCT",
      location: "Innovation Hub",
      time: "10:00 AM",
      attendees: 45,
      image: "url-to-workshop-image",
      type: "workshop"
    },
    {
      id: 2,
      title: "Zero Waste Hackathon",
      date: "20-22 OCT",
      location: "Virtual Event",
      time: "All Day",
      attendees: 120,
      image: "url-to-hackathon-image",
      type: "hackathon"
    },
    {
      id: 3,
      title: "Sustainable Tech Conference",
      date: "28 OCT",
      location: "Convention Center",
      time: "9:00 AM",
      attendees: 300,
      image: "url-to-conference-image",
      type: "conference"
    }
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
            Shape the Future
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Join transformative events that accelerate circular innovation
          </motion.p>
          
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="absolute inset-0 bg-emerald-500/10 blur-3xl" />
            <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl">
              <Search className="text-gray-400 mx-4" />
              <input 
                type="text" 
                placeholder="Search events by topic, date, or location..."
                className="flex-1 bg-transparent outline-none text-gray-600 dark:text-gray-300"
              />
              <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-all">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">Event Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Workshops', 'Conferences', 'Hackathons'].map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100 opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative">
                  <div className="w-16 h-16 mb-6 bg-emerald-600/10 rounded-2xl flex items-center justify-center">
                    <Calendar className="text-emerald-600" size={28} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{type}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {`Explore ${type.toLowerCase()} focused on circular solutions`}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-emerald-600">
                    <span>View All</span>
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Carousel */}
      <section className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">Featured Events</h2>
          <Swiper
            effect="cards"
            grabCursor={true}
            className="swiper-events"
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative bg-white dark:bg-gray-700 rounded-3xl overflow-hidden shadow-2xl"
                >
                  <div 
                    className="h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-emerald-600 text-white px-4 py-2 rounded-xl">
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Users size={16} />
                        {event.attendees} attending
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{event.title}</h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="text-emerald-400" />
                        <span className="text-gray-300">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-emerald-400" />
                        <span className="text-gray-300">{event.time}</span>
                      </div>
                    </div>
                    <button className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-all">
                      Register Now
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">Event Calendar</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-7 gap-4 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-gray-500 font-medium">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-4">
              {[...Array(31)].map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className={`p-4 text-center rounded-xl cursor-pointer ${
                    i === 14 ? 'bg-emerald-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {i + 1}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-gray-800 dark:text-white">Past Highlights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm">Sep 2023</div>
                    <h3 className="text-lg font-bold">Eco Innovation Summit</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Users size={16} />
                      250 participants
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-between group-hover:text-emerald-600 transition-colors">
                    <span>View Recap</span>
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-emerald-600 to-teal-500">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Host Your Sustainable Event</h2>
          <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto">
            Got a circular economy event idea? Let's make it happen together!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            Propose Event
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Events;