import React, { useState, useEffect, useRef } from "react";
import { MapPin, Brain, MessageSquare } from "lucide-react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoicmlzaGlkaGFhIiwiYSI6ImNtNjM0NzJhNjBuNWgyaXB1bGk5dGphNWEifQ.sHmjzCBx8cr6CbUW85K7iQ";

interface Resource {
  id: number;
  type: string;
  name: string;
  description: string;
  provider: string;
  location: string;
  coordinates: [number, number];
  availability: string;
  capacity: number;
  tags: string[];
  matchScore?: number;
}

interface GeocodingResult {
  latitude: number;
  longitude: number;
}

const ResourceMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const geocoder = useRef<MapboxGeocoder | null>(null);
  const [naturalQuery, setNaturalQuery] = useState("");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [apiResources, setApiResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocationFetched, setUserLocationFetched] = useState(false);

  // Sample initial resources
  const resources: Resource[] = [
    {
      id: 1,
      type: "Medical",
      name: "City General Hospital",
      description: "Emergency medical services and general healthcare",
      provider: "Healthcare Services Inc",
      location: "Downtown",
      coordinates: [-74.006, 40.7128],
      availability: "24/7",
      capacity: 500,
      tags: ["emergency", "healthcare", "medical", "ngo"],
      matchScore: 98,
    },
  ];

  const reverseGeocode = async (
    longitude: number,
    latitude: number
  ): Promise<string> => {
    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`;
      
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Reverse geocoding failed");
      
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const place = data.features[0];
        return place.place_name || place.text || `${latitude},${longitude}`;
      }
      return `${latitude},${longitude}`;
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return `${latitude},${longitude}`;
    }
  };

  const fetchNGOs = async (
    latitude: number,
    longitude: number
  ): Promise<Resource[]> => {
    try {
      if (!latitude || !longitude) {
        throw new Error("Invalid coordinates provided");
      }

      // Get location name from coordinates
      const locationName = await reverseGeocode(longitude, latitude);

      const requestBody = {
        location: locationName,
        latitude: latitude,
        longitude: longitude,
      };

      const response = await fetch("http://localhost:3000/api/search-ngos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch NGOs");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch NGOs");
      }

      return data.data.map((ngo: any, index: number) => ({
        id: index + 1,
        type: "NGO",
        name: ngo.name || "Unknown NGO",
        description: ngo.description || "No description available",
        provider: ngo.name || "Unknown Provider",
        location: ngo.location || locationName,
        coordinates: [ngo.longitude || longitude, ngo.latitude || latitude],
        availability: ngo.availability || "Unknown",
        capacity: ngo.capacity || 0,
        tags: ngo.tags || ["ngo"],
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch NGOs";
      setError(errorMessage);
      return [];
    }
  };

  // Get user location
  useEffect(() => {
    const getUserLocation = () => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setUserLocation([longitude, latitude]);
          setUserLocationFetched(true);
          
          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 12
            });

            // Add a marker for user location
            const markerElement = document.createElement("div");
            markerElement.className = "marker";
            markerElement.style.cssText = `
              width: 30px;
              height: 30px;
              background-image: url(https://cdn.mapmarker.io/api/v1/pin?size=50&background=%23DC2626&icon=fa-user&color=%23FFFFFF);
              background-size: 100%;
              cursor: pointer;
            `;

            new mapboxgl.Marker(markerElement)
              .setLngLat([longitude, latitude])
              .setPopup(new mapboxgl.Popup().setHTML("<strong>Your Location</strong>"))
              .addTo(map.current);
          }
        },
        (error) => {
          setError(`Error getting location: ${error.message}`);
          setUserLocationFetched(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    };

    getUserLocation();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current || !userLocationFetched) return;

    const initialCenter = userLocation || [-74.006, 40.7128]; // Default to NYC

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: initialCenter,
      zoom: 12,
    });

    geocoder.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: "Enter a location...",
    });

    map.current.addControl(geocoder.current);

    map.current.on('moveend', () => {
      if (map.current) {
        const center = map.current.getCenter();
        // Optional: Update location state or fetch new data
        // processNaturalQuery("");
      }
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [userLocationFetched, userLocation]);

  // Update markers
  useEffect(() => {
    if (!map.current) return;

    const allResources = [...resources, ...apiResources];

    // Remove existing markers
    const markers = document.getElementsByClassName("mapboxgl-marker");
    while (markers[0]) {
      markers[0].remove();
    }

    // Add user location marker
    if (userLocation) {
      const userMarkerElement = document.createElement("div");
      userMarkerElement.className = "marker";
      userMarkerElement.style.cssText = `
        width: 30px;
        height: 30px;
        background-image: url(https://cdn.mapmarker.io/api/v1/pin?size=50&background=%23DC2626&icon=fa-user&color=%23FFFFFF);
        background-size: 100%;
        cursor: pointer;
      `;

      new mapboxgl.Marker(userMarkerElement)
        .setLngLat(userLocation)
        .setPopup(new mapboxgl.Popup().setHTML("<strong>Your Location</strong>"))
        .addTo(map.current);
    }

    // Add resource markers
    allResources.forEach((resource) => {
      const markerElement = document.createElement("div");
      markerElement.className = "marker";
      markerElement.style.cssText = `
        width: 30px;
        height: 30px;
        background-image: url(https://cdn.mapmarker.io/api/v1/pin?size=50&background=%234F46E5&icon=fa-building&color=%23FFFFFF);
        background-size: 100%;
        cursor: pointer;
      `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-bold">${resource.name}</h3>
          <p class="text-sm">${resource.description}</p>
          <p class="text-sm mt-1"><strong>Location:</strong> ${resource.location}</p>
        </div>
      `);

      new mapboxgl.Marker(markerElement)
        .setLngLat(resource.coordinates)
        .setPopup(popup)
        .addTo(map.current);
    });
  }, [resources, apiResources, userLocation]);

  const processNaturalQuery = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!map.current) {
        throw new Error("Map not initialized");
      }

      // Get current map center coordinates
      const center = map.current.getCenter();
      const latitude = center.lat;
      const longitude = center.lng;

      const ngos = await fetchNGOs(latitude, longitude);

      if (ngos.length === 0) {
        setError("No resources found in this location");
        return;
      }

      setApiResources(ngos);

      const bounds = new mapboxgl.LngLatBounds();
      ngos.forEach((resource) => bounds.extend(resource.coordinates));
      map.current.fitBounds(bounds, { padding: 50 });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Search failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNaturalQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processNaturalQuery();
  };

  return (
    <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold'>Smart Resource Mapping</h2>
        <div className='flex items-center space-x-2'>
          <Brain className='h-6 w-6 text-indigo-600' />
          <span className='text-indigo-600 font-semibold'>
            AI-Powered Search
          </span>
        </div>
      </div>

      {error && (
        <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-lg'>
          {error}
        </div>
      )}

      <form onSubmit={handleNaturalQuerySubmit} className='mb-6'>
        <div className='relative'>
          <input
            type='text'
            value={naturalQuery}
            onChange={(e) => setNaturalQuery(e.target.value)}
            placeholder="Search for resources in the current map area"
            className='w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
            disabled={isLoading}
          />
          <MessageSquare className='absolute left-3 top-3.5 h-5 w-5 text-gray-400' />
          <button
            type='submit'
            className='absolute right-2 top-2 px-4 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300'
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search Here"}
          </button>
        </div>
      </form>

      <div ref={mapContainer} className='w-full h-[500px] rounded-lg mb-6' />

      <ResourceList
        resources={resources}
        apiResources={apiResources}
        onResourceClick={(coordinates) => {
          map.current?.flyTo({
            center: coordinates,
            zoom: 14,
          });
        }}
      />
    </div>
  );
};

interface ResourceListProps {
  resources: Resource[];
  apiResources: Resource[];
  onResourceClick: (coordinates: [number, number]) => void;
}

const ResourceList: React.FC<ResourceListProps> = ({
  resources,
  apiResources,
  onResourceClick,
}) => (
  <div className='space-y-4'>
    {/* {resources.map((resource) => (
      <ResourceCard
        key={resource.id}
        resource={resource}
        onClick={() => onResourceClick(resource.coordinates)}
      />
    ))} */}

    {apiResources.length > 0 && (
      <div className='mt-6'>
        <h4 className='text-lg font-semibold mb-2'>Search Results:</h4>
        {apiResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            onClick={() => onResourceClick(resource.coordinates)}
          />
        ))}
      </div>
    )}
  </div>
);

interface ResourceCardProps {
  resource: Resource;
  onClick: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => (
  <div
    className='border rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer mb-3'
    onClick={onClick}
  >
    <div className='flex items-center justify-between'>
      <div className='flex items-center'>
        <MapPin className='h-5 w-5 text-indigo-600 mr-2' />
        <div>
          <h3 className='font-semibold'>{resource.name}</h3>
          <p className='text-sm text-gray-600'>{resource.description}</p>
        </div>
      </div>
      <div className='text-sm text-gray-500'>{resource.availability}</div>
    </div>
    {resource.tags && (
      <div className='mt-2 flex flex-wrap gap-2'>
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className='px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700'
          >
            {tag}
          </span>
				))}
			</div>
		)}
	</div>
);

export default ResourceMap;
