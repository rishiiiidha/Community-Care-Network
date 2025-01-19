import React, { useState } from 'react';
import { BookOpen, Clock, Star, Award, Users, Play, Download, CheckCircle } from 'lucide-react';

const TrainingCenter = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const courses = [
    {
      id: 1,
      title: 'Crisis Response Fundamentals',
      description: 'Learn essential skills for handling emergency situations and crisis management.',
      duration: '4 hours',
      level: 'Beginner',
      enrolled: 1234,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      progress: 0,
    },
    {
      id: 2,
      title: 'Community Outreach Strategies',
      description: 'Master effective techniques for community engagement and support.',
      duration: '6 hours',
      level: 'Intermediate',
      enrolled: 856,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      progress: 45,
    },
    {
      id: 3,
      title: 'Mental Health First Aid',
      description: 'Essential training for recognizing and supporting mental health challenges.',
      duration: '8 hours',
      level: 'Advanced',
      enrolled: 2156,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      progress: 100,
    },
  ];

  const certificates = [
    {
      id: 1,
      title: 'Crisis Response Certification',
      issueDate: 'March 15, 2024',
      image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Community Leadership',
      issueDate: 'February 1, 2024',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Training Center</h1>
        <p className="mt-4 text-xl text-gray-600">Develop your skills to better serve the community</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <BookOpen className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">50+</h4>
          <p className="text-gray-600">Courses</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <Users className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">10,000+</h4>
          <p className="text-gray-600">Learners</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <Award className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">5,000+</h4>
          <p className="text-gray-600">Certificates Issued</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <Star className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">4.8</h4>
          <p className="text-gray-600">Average Rating</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-8">
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-6 py-3 text-lg font-medium ${
            activeTab === 'courses'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Courses
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-6 py-3 text-lg font-medium ${
            activeTab === 'certificates'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Certificates
        </button>
      </div>

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="h-5 w-5 mr-1 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                {course.progress > 0 && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{course.progress}% Complete</p>
                  </div>
                )}
                <button className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  {course.progress === 0 ? (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Start Course
                    </>
                  ) : course.progress === 100 ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Continue
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificates Tab */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map(certificate => (
            <div key={certificate.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{certificate.title}</h3>
                <p className="text-gray-600 mb-4">Issued on {certificate.issueDate}</p>
                <button className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  <Download className="h-5 w-5 mr-2" />
                  Download Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrainingCenter;