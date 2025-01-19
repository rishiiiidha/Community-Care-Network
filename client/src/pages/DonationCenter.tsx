import React from 'react';
import { DollarSign, Gift, Heart, Repeat } from 'lucide-react';

const DonationCenter = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Make a Difference</h1>
        <p className="mt-4 text-xl text-gray-600">Your support helps us create lasting impact in communities</p>
      </div>

      {/* Donation Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <DollarSign className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">One-Time Donation</h3>
            <p className="text-gray-600 mt-2">Make an immediate impact with a single contribution</p>
          </div>
          <div className="space-y-4">
            <button className="w-full py-2 bg-gray-100 rounded-lg hover:bg-gray-200">$10</button>
            <button className="w-full py-2 bg-gray-100 rounded-lg hover:bg-gray-200">$25</button>
            <button className="w-full py-2 bg-gray-100 rounded-lg hover:bg-gray-200">$50</button>
            <button className="w-full py-2 bg-gray-100 rounded-lg hover:bg-gray-200">$100</button>
            <input
              type="number"
              placeholder="Custom Amount"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
            Donate Now
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <Repeat className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Monthly Giving</h3>
            <p className="text-gray-600 mt-2">Create sustainable impact with recurring donations</p>
          </div>
          <div className="space-y-4">
            <button className="w-full py-2 bg-gray-100 rounded-lg hover:bg-gray-200">$10/month</button>
            <button className="w-full py-2 bg-gray-100 rounded-lg hover:bg-gray-200">$25/month</button>
            <button className="w-full py-2 bg-gray-100 rounded-lg hover:bg-gray-200">$50/month</button>
            <button className="w-full py-2 bg-gray-100 rounded-lg hover:bg-gray-200">$100/month</button>
            <input
              type="number"
              placeholder="Custom Monthly Amount"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
            Start Monthly Giving
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-6">
            <Gift className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">In-Kind Donations</h3>
            <p className="text-gray-600 mt-2">Donate supplies and resources directly</p>
          </div>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Most Needed Items</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• Non-perishable food</li>
                <li>• Medical supplies</li>
                <li>• Educational materials</li>
                <li>• Hygiene products</li>
              </ul>
            </div>
          </div>
          <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
            Learn More
          </button>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-indigo-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Your Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Heart className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">1,000+</h4>
            <p className="text-gray-600">Families Supported</p>
          </div>
          <div className="text-center">
            <Gift className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">50,000+</h4>
            <p className="text-gray-600">Meals Distributed</p>
          </div>
          <div className="text-center">
            <DollarSign className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">$500,000+</h4>
            <p className="text-gray-600">Funds Raised</p>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-gray-600 italic mb-4">
            "Thanks to the generous donations, we've been able to provide essential support to hundreds of families in our community during their time of need."
          </p>
          <div className="mt-4">
            <p className="font-semibold">Sarah Johnson</p>
            <p className="text-gray-600">Community Program Director</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCenter;