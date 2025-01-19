import React, { useState } from 'react';
import { AlertTriangle, Phone, Bot, Brain, Heart, ChevronFirst as FirstAid, Home, Clock, ThumbsUp } from 'lucide-react';

const CrisisReporting = () => {
  const [selectedAssistant, setSelectedAssistant] = useState(null);

  const virtualAssistants = [
    {
      id: 1,
      name: "General Crisis AI",
      icon: Bot,
      description: "General emergency support and resource connection",
      number: "+1 (628) 209-6401",
      responseTime: "< 45 seconds",
      available: true,
      specialization: "General crisis support, resource coordination, emergency services",
      languages: ["English", "Spanish", "French", "Mandarin"],
    },
    {
      id: 2,
      name: "MentalHealth AI",
      icon: Brain,
      description: "24/7 mental health support and crisis counseling",
      number: "1-800-MENTAL-AI",
      responseTime: "< 30 seconds",
      available: true,
      specialization: "Mental health, anxiety, depression, crisis intervention",
      languages: ["English", "Spanish", "French"],
    },
    {
      id: 3,
      name: "MediCare AI",
      icon: FirstAid,
      description: "Medical emergency triage and guidance",
      number: "1-800-MEDI-AI",
      responseTime: "< 15 seconds",
      available: true,
      specialization: "Medical emergencies, first aid guidance, symptom assessment",
      languages: ["English", "Spanish", "Mandarin"],
    },
    {
      id: 4,
      name: "Housing Support AI",
      icon: Home,
      description: "Emergency shelter and housing assistance",
      number: "1-800-HOUSE-AI",
      responseTime: "< 1 minute",
      available: true,
      specialization: "Emergency shelter, housing resources, temporary accommodation",
      languages: ["English", "Spanish"],
    },
    
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Crisis Support Center</h2>
        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-red-600" />
          <span className="text-red-600 font-semibold">24/7 Support Available</span>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
        <div className="flex items-center">
          <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
          <div>
            <h3 className="text-lg font-semibold text-red-600">For Immediate Emergency</h3>
            <p className="text-red-700">If you're experiencing a life-threatening emergency, call 911 immediately</p>
          </div>
        </div>
      </div>

      {/* Virtual AI Assistants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {virtualAssistants.map((assistant) => {
          const Icon = assistant.icon;
          return (
            <div
              key={assistant.id}
              className={`border rounded-lg p-6 cursor-pointer transition-all ${
                selectedAssistant?.id === assistant.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'hover:border-indigo-300'
              }`}
              onClick={() => setSelectedAssistant(assistant)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Icon className="h-8 w-8 text-indigo-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold">{assistant.name}</h3>
                    <p className="text-sm text-gray-600">{assistant.description}</p>
                  </div>
                </div>
                <div className={`flex items-center ${
                  assistant.available ? 'text-green-600' : 'text-red-600'
                }`}>
                  <div className={`h-2 w-2 rounded-full mr-2 ${
                    assistant.available ? 'bg-green-600' : 'bg-red-600'
                  }`} />
                  {assistant.available ? 'Available' : 'Busy'}
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{assistant.number}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Response Time: {assistant.responseTime}</span>
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  <span>Languages: {assistant.languages.join(', ')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Assistant Details */}
      {selectedAssistant && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Connect with {selectedAssistant.name}</h3>
          <p className="text-gray-600 mb-4">Specializes in: {selectedAssistant.specialization}</p>
          <div className="space-y-4">
            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center"
              onClick={() => window.location.href = `tel:${selectedAssistant.number.replace(/-/g, '')}`}
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </button>
            <div className="text-sm text-gray-500 text-center">
              Your call will be answered by an AI assistant trained to provide immediate support and guidance.
              All calls are confidential and encrypted.
            </div>
          </div>
        </div>
      )}

      {/* Report Form */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Submit a Detailed Report</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Type of Emergency</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>Medical Emergency</option>
              <option>Mental Health Crisis</option>
              <option>Housing Emergency</option>
              <option>Food Shortage</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter address or location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe the situation..."
            />
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrisisReporting;