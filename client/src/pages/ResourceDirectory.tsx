import React, { useState } from 'react';
import { Search, Filter, MapPin, Phone, Clock, ExternalLink, BookOpen, Heart, Users } from 'lucide-react';

const ResourceDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'medical', name: 'Medical Care' },
    { id: 'food', name: 'Food Assistance' },
    { id: 'housing', name: 'Housing' },
    { id: 'education', name: 'Education' },
    { id: 'mental-health', name: 'Mental Health' },
  ];

  const resources = [
    {
      id: 1,
      name: 'City General Hospital',
      category: 'medical',
      description: '24/7 emergency medical services and general healthcare',
      address: '123 Healthcare Ave, City, State',
      phone: '(555) 123-4567',
      hours: '24/7',
      website: 'https://cityhospital.org',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      name: 'Community Food Bank',
      category: 'food',
      description: 'Free food distribution and meal programs',
      address: '456 Help Street, City, State',
      phone: '(555) 234-5678',
      hours: 'Mon-Sat 9AM-5PM',
      website: 'https://communityfoodbank.org',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      name: 'Housing Assistance Program',
      category: 'housing',
      description: 'Emergency shelter and housing support services',
      address: '789 Shelter Road, City, State',
      phone: '(555) 345-6789',
      hours: 'Mon-Fri 8AM-6PM',
      website: 'https://housinghelp.org',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filteredResources = resources.filter(resource => 
    (selectedCategory === 'all' || resource.category === selectedCategory) &&
    (resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     resource.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Resource Directory</h1>
        <p className="mt-4 text-xl text-gray-600">Find the support and services you need in your community</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={resource.image}
              alt={resource.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{resource.name}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{resource.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>{resource.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{resource.hours}</span>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href={resource.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
                >
                  Visit Website
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <BookOpen className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">100+</h4>
          <p className="text-gray-600">Available Resources</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <Heart className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">24/7</h4>
          <p className="text-gray-600">Support Available</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <Users className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">10,000+</h4>
          <p className="text-gray-600">People Helped</p>
        </div>
      </div>
    </div>
  );
};

export default ResourceDirectory;