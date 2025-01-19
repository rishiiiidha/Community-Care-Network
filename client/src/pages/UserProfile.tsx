import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Award, Clock, Heart } from 'lucide-react';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    volunteeredHours: 156,
    eventsAttended: 23,
    peopleHelped: 89,
    certificatesEarned: 5,
  };

  const recentActivities = [
    {
      id: 1,
      type: 'volunteer',
      title: 'Food Distribution Event',
      date: 'March 15, 2024',
      hours: 4,
    },
    {
      id: 2,
      type: 'training',
      title: 'Crisis Response Course Completed',
      date: 'March 10, 2024',
    },
    {
      id: 3,
      type: 'donation',
      title: 'Monthly Donation',
      date: 'March 1, 2024',
      amount: '$50',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Community Health Fair',
      date: 'March 25, 2024',
      location: 'Central Park',
      role: 'Medical Assistant',
    },
    {
      id: 2,
      title: 'Youth Mentoring Program',
      date: 'March 28, 2024',
      location: 'Community Center',
      role: 'Mentor',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
            <p className="text-gray-600">Community Volunteer since 2023</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <Clock className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">{userStats.volunteeredHours}</h4>
          <p className="text-gray-600">Hours Volunteered</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <Calendar className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">{userStats.eventsAttended}</h4>
          <p className="text-gray-600">Events Attended</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <Heart className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">{userStats.peopleHelped}</h4>
          <p className="text-gray-600">People Helped</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <Award className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">{userStats.certificatesEarned}</h4>
          <p className="text-gray-600">Certificates Earned</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-8">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 text-lg font-medium ${
            activeTab === 'overview'
              ? 'text-indigo-600 border-b- 2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('activities')}
          className={`px-6 py-3 text-lg font-medium ${
            activeTab === 'activities'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Activities
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 text-lg font-medium ${
            activeTab === 'settings'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Settings
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-gray-600">{activity.date}</p>
                  {activity.hours && (
                    <p className="text-sm text-gray-600">{activity.hours} hours</p>
                  )}
                  {activity.amount && (
                    <p className="text-sm text-gray-600">{activity.amount}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.date}</p>
                  <p className="text-sm text-gray-600">{event.location}</p>
                  <p className="text-sm text-gray-600">Role: {event.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Activities Tab */}
      {activeTab === 'activities' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Volunteer History</h2>
            <div className="space-y-4">
              {/* Add volunteer history items here */}
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Training Progress</h2>
            <div className="space-y-4">
              {/* Add training progress items here */}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Impact Summary</h2>
            <div className="space-y-4">
              {/* Add impact summary items here */}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <User className="h-full w-full text-gray-300" />
                </span>
                <button
                  type="button"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue="john.doe@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue="New York, NY"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;