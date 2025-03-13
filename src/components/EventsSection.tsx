import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
export const EventsSection = () => {
  const events = [{
    title: 'Circular Design Workshop',
    date: 'Oct 15, 2023',
    time: '2:00 PM - 4:00 PM',
    location: 'Innovation Center',
    attendees: 45,
    image: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }, {
    title: 'Sustainability Hackathon',
    date: 'Nov 5-7, 2023',
    time: '9:00 AM - 5:00 PM',
    location: 'Main Campus',
    attendees: 120,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }, {
    title: 'Guest Lecture: Circular Economy in Africa',
    date: 'Oct 25, 2023',
    time: '3:30 PM - 5:00 PM',
    location: 'Auditorium B',
    attendees: 85,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }];
  return <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join workshops, hackathons, and lectures to enhance your knowledge
            and skills.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                <button className="mt-6 w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:shadow-md transition-shadow">
                  RSVP Now
                </button>
              </div>
            </div>)}
        </div>
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-white text-gray-800 rounded-full text-lg font-medium border border-gray-200 hover:border-green-500 hover:shadow-lg transition-all">
            View All Events
          </button>
        </div>
      </div>
    </section>;
};