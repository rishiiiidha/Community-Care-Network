import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Plus, Brain, ArrowRight, Clock, ThumbsUp, Users, Tag, Filter, MessageSquare } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

// Replace with your Mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoicmlzaGlkaGFhIiwiYSI6ImNtNjM0NzJhNjBuNWgyaXB1bGk5dGphNWEifQ.sHmjzCBx8cr6CbUW85K7iQ';

interface Resource {
  id: number;
  type: string;
  name: string;
  description: string;
  provider: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  availability: string;
  capacity: number;
  tags: string[];
  matchScore?: number;
}

interface Need {
  id: number;
  type: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  location: string;
  coordinates: [number, number];
  requiredBy: string;
  tags: string[];
}

const ResourceMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [naturalQuery, setNaturalQuery] = useState('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [view, setView] = useState<'map' | 'list' | 'add'>('map');
  const [resourceType, setResourceType] = useState<'offering' | 'seeking'>('seeking');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Sample data with coordinates
  const resources: Resource[] = [
    {
      id: 1,
      type: 'Medical',
      name: 'City General Hospital',
      description: 'Emergency medical services and general healthcare',
      provider: 'Healthcare Services Inc',
      location: 'Downtown',
      coordinates: [-74.006, 40.7128], // NYC coordinates
      availability: '24/7',
      capacity: 500,
      tags: ['emergency', 'healthcare', 'medical', 'ngo'],
      matchScore: 98,
    },
    {
      id: 2,
      type: 'Food',
      name: 'Community Food Bank',
      description: 'Free food distribution and meal programs',
      provider: 'Food for All Foundation',
      location: 'Westside',
      coordinates: [-74.009, 40.7138],
      availability: 'Mon-Sat 9AM-5PM',
      capacity: 1000,
      tags: ['food', 'groceries', 'nutrition', 'free', 'ngo'],
      matchScore: 85,
    },
    {
      id: 3,
      type: 'Housing',
      name: 'Emergency Shelter',
      description: 'Free temporary housing for those in need',
      provider: 'Shelter Now',
      location: 'Eastside',
      coordinates: [-74.004, 40.7118],
      availability: '24/7',
      capacity: 200,
      tags: ['housing', 'shelter', 'emergency', 'free', 'ngo'],
      matchScore: 92,
    },
  ];

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.006, 40.7128], // Default to NYC
      zoom: 12
    });

    // Add geocoder control
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: 'Enter your location...'
    });

    map.current.addControl(geocoder);

    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation([longitude, latitude]);
        map.current?.flyTo({
          center: [longitude, latitude],
          zoom: 12
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Add markers for resources
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    const markers = document.getElementsByClassName('mapboxgl-marker');
    while (markers[0]) {
      markers[0].remove();
    }

    // Add markers for resources
    resources.forEach(resource => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.backgroundImage = 'url(https://cdn.mapmarker.io/api/v1/pin?size=50&background=%234F46E5&icon=fa-building&color=%23FFFFFF)';
      el.style.backgroundSize = '100%';
      el.style.cursor = 'pointer';

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-bold">${resource.name}</h3>
          <p class="text-sm">${resource.description}</p>
          <p class="text-sm mt-1"><strong>Available:</strong> ${resource.availability}</p>
        </div>
      `);

      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat(resource.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [resources]);

  // Process natural language query
  const processNaturalQuery = (query: string) => {
    const queryLower = query.toLowerCase();
    
    // Extract location if mentioned
    const locationMatch = queryLower.match(/near\s+([^,\.]+)/i);
    const location = locationMatch ? locationMatch[1] : null;

    // Detect resource types
    const isNGO = queryLower.includes('ngo') || queryLower.includes('organization');
    const isFree = queryLower.includes('free') || queryLower.includes('no cost');
    const isFood = queryLower.includes('food') || queryLower.includes('meal');
    const isMedical = queryLower.includes('medical') || queryLower.includes('healthcare');
    const isHousing = queryLower.includes('housing') || queryLower.includes('shelter');

    // Filter resources based on query
    const filteredResources = resources.filter(resource => {
      if (isNGO && !resource.tags.includes('ngo')) return false;
      if (isFree && !resource.tags.includes('free')) return false;
      if (isFood && !resource.tags.includes('food')) return false;
      if (isMedical && !resource.tags.includes('medical')) return false;
      if (isHousing && !resource.tags.includes('housing')) return false;
      return true;
    });

    // Update map view if location found
    if (location && map.current) {
      // In a real app, use geocoding service to get coordinates
      map.current.flyTo({
        center: [-74.006, 40.7128], // Example: center on NYC
        zoom: 12
      });
    }

    return filteredResources;
  };

  const handleNaturalQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredResources = processNaturalQuery(naturalQuery);
    // Update map markers and zoom to show all results
    if (map.current && filteredResources.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredResources.forEach(resource => {
        bounds.extend(resource.coordinates);
      });
      map.current.fitBounds(bounds, { padding: 50 });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Smart Resource Mapping</h2>
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-indigo-600" />
          <span className="text-indigo-600 font-semibold">AI-Powered Search</span>
        </div>
      </div>

      {/* Natural Language Query Input */}
      <form onSubmit={handleNaturalQuerySubmit} className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={naturalQuery}
            onChange={(e) => setNaturalQuery(e.target.value)}
            placeholder="Try: 'Show me free food resources near downtown' or 'Find NGOs providing medical care'"
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <button
            type="submit"
            className="absolute right-2 top-2 px-4 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </form>

      {/* Map View */}
      <div 
        ref={mapContainer} 
        className="w-full h-[500px] rounded-lg mb-6"
      />

      {/* Resource List */}
      <div className="space-y-4">
        {resources.map((resource) => (
          <div 
            key={resource.id} 
            className="border rounded-lg p-4 hover:border-indigo-300 transition-colors"
            onClick={() => {
              map.current?.flyTo({
                center: resource.coordinates,
                zoom: 14
              });
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-indigo-600 mr-2" />
                <div>
                  <h3 className="font-semibold">{resource.name}</h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {resource.availability}
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {resource.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceMap;