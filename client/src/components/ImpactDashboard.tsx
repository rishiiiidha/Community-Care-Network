import React from 'react';
import { LineChart, Users, Heart, Trophy } from 'lucide-react';

const ImpactDashboard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Impact Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Users className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-sm text-gray-600">People Helped</span>
          </div>
          <p className="mt-2 text-2xl font-bold">12,458</p>
          <span className="text-sm text-green-600">↑ 12% this month</span>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-sm text-gray-600">Active Volunteers</span>
          </div>
          <p className="mt-2 text-2xl font-bold">1,234</p>
          <span className="text-sm text-green-600">↑ 8% this month</span>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Trophy className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-sm text-gray-600">Resources Distributed</span>
          </div>
          <p className="mt-2 text-2xl font-bold">45,789</p>
          <span className="text-sm text-green-600">↑ 15% this month</span>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center">
            <LineChart className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-sm text-gray-600">Success Rate</span>
          </div>
          <p className="mt-2 text-2xl font-bold">94%</p>
          <span className="text-sm text-green-600">↑ 3% this month</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Impact</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-indigo-500 pl-4">
              <p className="font-medium">Medical Assistance Program</p>
              <p className="text-sm text-gray-600">Provided healthcare access to 500+ families</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-medium">Education Initiative</p>
              <p className="text-sm text-gray-600">Distributed learning materials to 1000 students</p>
              <p className="text-xs text-gray-500">5 days ago</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <p className="font-medium">Food Security Program</p>
              <p className="text-sm text-gray-600">Delivered 2000+ meals to families in need</p>
              <p className="text-xs text-gray-500">1 week ago</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Resource Distribution</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Food Security Program</p>
                <p className="font-semibold">Delivered 2000+ meals to families in need</p>
              </div>
              <span className="text-xs text-gray-500">1 week ago</span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-sm text-gray-600">Education Initiative</p>
                <p className="font-semibold">Distributed learning materials to 1000 students</p>
              </div>
              <span className="text-xs text-gray-500">5 days ago</span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-sm text-gray-600">Medical Assistance Program</p>
                <p className="font-semibold">Provided healthcare access to 500+ families</p>
              </div>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboard;