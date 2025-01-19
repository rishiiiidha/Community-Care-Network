import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, Flag, Search, Filter, Users } from 'lucide-react';

const CommunityForum = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'support', name: 'Support' },
    { id: 'resources', name: 'Resources' },
    { id: 'events', name: 'Events' },
    { id: 'success', name: 'Success Stories' },
  ];

  const posts = [
    {
      id: 1,
      category: 'support',
      title: 'Looking for mental health resources',
      content: 'Can anyone recommend affordable mental health services in the downtown area?',
      author: {
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      },
      timestamp: '2 hours ago',
      likes: 15,
      comments: 8,
    },
    {
      id: 2,
      category: 'success',
      title: 'How I found housing through CCN',
      content: 'I wanted to share my success story of finding permanent housing through the Community Care Network...',
      author: {
        name: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      },
      timestamp: '1 day ago',
      likes: 42,
      comments: 12,
    },
    {
      id: 3,
      category: 'events',
      title: 'Community Food Drive This Weekend',
      content: 'Join us this Saturday for our monthly community food drive. We need volunteers and donations!',
      author: {
        name: 'Community Organizer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      },
      timestamp: '3 days ago',
      likes: 28,
      comments: 15,
    },
  ];

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Community Forum</h1>
        <p className="mt-4 text-xl text-gray-600">Connect, share, and support one another</p>
      </div>

      {/* Search and Categories */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search discussions..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            New Post
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-10 w-10 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{post.author.name}</h3>
                <p className="text-sm text-gray-500">{post.timestamp}</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-600 hover:text-indigo-600">
                  <ThumbsUp className="h-5 w-5 mr-1" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-indigo-600">
                  <MessageSquare className="h-5 w-5 mr-1" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-indigo-600">
                  <Share2 className="h-5 w-5 mr-1" />
                  <span>Share</span>
                </button>
              </div>
              <button className="text-gray-400 hover:text-red-500">
                <Flag className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Community Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <Users className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">5,000+</h4>
          <p className="text-gray-600">Community Members</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <MessageSquare className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">10,000+</h4>
          <p className="text-gray-600">Discussions</p>
        </div>
        <div className="bg-indigo-50 rounded-lg p-6 text-center">
          <ThumbsUp className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
          <h4 className="text-2xl font-bold">50,000+</h4>
          <p className="text-gray-600">Helpful Responses</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;