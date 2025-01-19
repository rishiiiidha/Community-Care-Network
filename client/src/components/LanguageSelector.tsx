import React from 'react';
import { Globe2 } from 'lucide-react';

const LanguageSelector = () => {
  return (
    <div className="relative inline-block text-left">
      <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <Globe2 className="h-4 w-4 mr-2" />
        English
      </button>
    </div>
  );
};

export default LanguageSelector;