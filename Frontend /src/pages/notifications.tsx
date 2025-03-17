import React from 'react';

const Notifications = () => {
  const notifications = [
    { id: 1, message: 'You have a new message from John Doe', time: '2 minutes ago' },
    { id: 2, message: 'Your event "React Meetup" is starting soon', time: '1 hour ago' },
    { id: 3, message: 'New comment on your post', time: '3 hours ago' },
    // Add more notifications as needed
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <ul className="space-y-4">
        {notifications.map(notification => (
          <li key={notification.id} className="p-4 bg-white shadow rounded-lg">
            <p className="text-gray-700">{notification.message}</p>
            <p className="text-gray-500 text-sm">{notification.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;