import React from 'react';
import { Calendar, Users, Award, BookOpen } from 'lucide-react';

const VolunteerHub = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Volunteer Hub</h1>
        <p className="mt-4 text-xl text-gray-600">Join our community of changemakers and make a difference</p>
      </div>

      {/* Opportunities Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Medical Assistance"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Medical Assistance</h3>
          <p className="text-gray-600 mb-4">Support healthcare initiatives and provide medical assistance to those in need.</p>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
            Apply Now
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Food Distribution"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Food Distribution</h3>
          <p className="text-gray-600 mb-4">Help distribute food and essential supplies to vulnerable communities.</p>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
            Apply Now
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <img
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Education Support"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Education Support</h3>
          <p className="text-gray-600 mb-4">Provide tutoring and educational support to students in need.</p>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
            Apply Now
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <Users className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">5,000+</h4>
          <p className="text-gray-600">Active Volunteers</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <Calendar className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">10,000+</h4>
          <p className="text-gray-600">Hours Contributed</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <Award className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">500+</h4>
          <p className="text-gray-600">Projects Completed</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <BookOpen className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">50+</h4>
          <p className="text-gray-600">Training Programs</p>
        </div>
      </div>

      {/* Training Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Volunteer Training Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Crisis Response Training</h3>
            <p className="text-gray-600 mb-4">Learn essential skills for emergency response and crisis management.</p>
            <button className="text-indigo-600 font-medium hover:text-indigo-700">
              Learn More →
            </button>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Community Outreach</h3>
            <p className="text-gray-600 mb-4">Develop skills for effective community engagement and support.</p>
            <button className="text-indigo-600 font-medium hover:text-indigo-700">
              Learn More →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerHub;