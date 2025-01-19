import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Heart, MapPin, Globe2, LineChart, AlertTriangle, Search, Menu, X } from 'lucide-react';
import ResourceMap from './components/ResourceMap';
import CrisisReporting from './components/CrisisReporting';
import ImpactDashboard from './components/ImpactDashboard';
import LanguageSelector from './components/LanguageSelector';
import VolunteerHub from './pages/VolunteerHub';
import DonationCenter from './pages/DonationCenter';
import ResourceDirectory from './pages/ResourceDirectory';
import CommunityForum from './pages/CommunityForum';
import TrainingCenter from './pages/TrainingCenter';
import UserProfile from './pages/UserProfile';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Navigation */}
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <Heart className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-gray-800">Community Care Network</span>
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/volunteer" className="text-gray-600 hover:text-indigo-600">Volunteer</Link>
                <Link to="/donate" className="text-gray-600 hover:text-indigo-600">Donate</Link>
                <Link to="/resources" className="text-gray-600 hover:text-indigo-600">Resources</Link>
                <Link to="/forum" className="text-gray-600 hover:text-indigo-600">Community</Link>
                <Link to="/training" className="text-gray-600 hover:text-indigo-600">Training</Link>
                <LanguageSelector />
                <Link to="/crisis" className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition">
                  Report Crisis
                </Link>
                <Link to="/profile" className="p-2 rounded-full bg-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                  />
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/volunteer" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Volunteer</Link>
                <Link to="/donate" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Donate</Link>
                <Link to="/resources" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Resources</Link>
                <Link to="/forum" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Community</Link>
                <Link to="/training" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Training</Link>
                <Link to="/crisis" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700">Report Crisis</Link>
              </div>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/volunteer" element={<VolunteerHub />} />
          <Route path="/donate" element={<DonationCenter />} />
          <Route path="/resources" element={<ResourceDirectory />} />
          <Route path="/forum" element={<CommunityForum />} />
          <Route path="/training" element={<TrainingCenter />} />
          <Route path="/crisis" element={<CrisisReporting />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">About Us</h4>
                <p className="text-gray-400">Empowering communities through technology and compassion.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/resources">Find Help</Link></li>
                  <li><Link to="/volunteer">Volunteer</Link></li>
                  <li><Link to="/donate">Donate</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>Emergency: 911</li>
                  <li>Support: help@ccn.org</li>
                  <li>Partner: partner@ccn.org</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {/* Social media icons would go here */}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Connecting Communities with Care
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Bridging the gap between resources and those who need them most. Together, we can make a difference.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link to="/resources" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Find Resources
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link to="/crisis" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Report Crisis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <MapPin className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-lg font-semibold">Smart Resource Mapping</h3>
            </div>
            <p className="mt-4 text-gray-600">AI-powered matching of community needs with available resources and support services.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-lg font-semibold">Crisis Reporting</h3>
            </div>
            <p className="mt-4 text-gray-600">Real-time reporting system for immediate assistance during emergencies.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <Globe2 className="h-6 w-6 text-indigo-600" />
              <h3 className="ml-2 text-lg font-semibold">Language Inclusivity</h3>
            </div>
            <p className="mt-4 text-gray-600">Multi-language support to ensure accessibility for all community members.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ResourceMap />
        
        <ImpactDashboard />
      </main>
    </>
  );
}

export default App;