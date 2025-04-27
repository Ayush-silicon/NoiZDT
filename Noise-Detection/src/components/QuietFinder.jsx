import React, { useState } from 'react';
import { Search, MapPin, Clock, Star, ExternalLink, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Sample quiet spot data (would come from API in real implementation)
const sampleQuietSpots = [
  {
    id: 1,
    name: "Riverside Park",
    type: "Park",
    averageDecibels: 42,
    distance: 0.8,
    openHours: "6:00 AM - 10:00 PM",
    rating: 4.7,
    reviews: 128,
    description: "A peaceful riverside park with walking trails and open green spaces, perfect for relaxation away from city noise.",
    amenities: ["Walking Paths", "Benches", "Water Fountains", "Shaded Areas"],
    imageUrl: "https://images.unsplash.com/photo-1563599175592-c58dc214deff?q=80&w=2070&auto=format&fit=crop",
    lat: 40.801,
    lng: -73.972
  },
  {
    id: 2,
    name: "Central Library Reading Room",
    type: "Indoor",
    averageDecibels: 35,
    distance: 1.2,
    openHours: "9:00 AM - 8:00 PM",
    rating: 4.8,
    reviews: 94,
    description: "The library's grand reading room offers a sanctuary of silence with comfortable seating and natural light.",
    amenities: ["Wi-Fi", "Power Outlets", "Comfortable Seating", "Air Conditioning"],
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop",
    lat: 40.753,
    lng: -73.982
  },
  {
    id: 3,
    name: "Serenity Garden",
    type: "Garden",
    averageDecibels: 45,
    distance: 0.5,
    openHours: "8:00 AM - 6:00 PM",
    rating: 4.5,
    reviews: 67,
    description: "A hidden gem nestled between buildings, featuring a small fountain and abundant plantings that absorb city noise.",
    amenities: ["Fountain", "Meditation Area", "Botanical Collection", "Secluded Spots"],
    imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2069&auto=format&fit=crop",
    lat: 40.742,
    lng: -73.988
  },
  {
    id: 4,
    name: "Echo Art Gallery",
    type: "Indoor",
    averageDecibels: 38,
    distance: 1.7,
    openHours: "10:00 AM - 5:00 PM",
    rating: 4.6,
    reviews: 52,
    description: "A modern art gallery with sound-absorbing design and hushed atmosphere, providing a cultural respite from urban noise.",
    amenities: ["Art Exhibits", "Guided Headphones", "Café", "Gift Shop"],
    imageUrl: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=2070&auto=format&fit=crop",
    lat: 40.722,
    lng: -74.001
  },
  {
    id: 5,
    name: "Hillside Meditation Center",
    type: "Indoor",
    averageDecibels: 32,
    distance: 2.3,
    openHours: "7:00 AM - 9:00 PM",
    rating: 4.9,
    reviews: 201,
    description: "A purpose-built center for meditation and mindfulness with soundproofed rooms and peaceful gardens.",
    amenities: ["Meditation Cushions", "Guided Sessions", "Tea Room", "Bookstore"],
    imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=2070&auto=format&fit=crop",
    lat: 40.798,
    lng: -73.960
  }
];

const NoiseTag = ({ level }) => {
  let color, text;
  
  if (level < 35) {
    color = "bg-green-100 text-green-800";
    text = "Whisper Quiet";
  } else if (level < 45) {
    color = "bg-green-50 text-green-600";
    text = "Very Quiet";
  } else if (level < 55) {
    color = "bg-yellow-50 text-yellow-700";
    text = "Moderate";
  } else {
    color = "bg-orange-50 text-orange-700";
    text = "Somewhat Noisy";
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {level} dB • {text}
    </span>
  );
};

const QuietSpotCard = ({ spot, onViewOnMap }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={spot.imageUrl} 
          alt={spot.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <NoiseTag level={spot.averageDecibels} />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{spot.name}</h3>
          <span className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current mr-1" />
            <span className="text-sm font-medium text-gray-900">{spot.rating}</span>
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mt-1">{spot.type}</p>
        
        <div className="flex items-center mt-2 text-xs text-gray-500">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{spot.distance} miles away</span>
        </div>
        
        <div className="flex items-center mt-1 text-xs text-gray-500">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>{spot.openHours}</span>
        </div>
        
        <div className="mt-3">
          <p className="text-sm text-gray-600 line-clamp-2">{spot.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {spot.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-noise-50 text-noise-600"
            >
              <Leaf className="h-3 w-3 mr-1" />
              {amenity}
            </span>
          ))}
          {spot.amenities.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
              +{spot.amenities.length - 3} more
            </span>
          )}
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs"
            onClick={() => onViewOnMap({ lat: spot.lat, lng: spot.lng })}
          >
            <MapPin className="h-3.5 w-3.5 mr-1" />
            View on Map
          </Button>
          
          <Button 
            size="sm" 
            className="flex-1 text-xs bg-noise-500 hover:bg-noise-600"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-1" />
            Directions
          </Button>
        </div>
      </div>
    </Card>
  );
};

const QuietFinder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [maxDistance, setMaxDistance] = useState(5);
  const [spots, setSpots] = useState(sampleQuietSpots);
  
  // Filter spots based on search and filters
  const filteredSpots = spots.filter(spot => {
    // Search term filter
    if (
      searchTerm && 
      !spot.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !spot.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Type filter
    if (filterType !== 'All' && spot.type !== filterType) {
      return false;
    }
    
    // Distance filter
    if (spot.distance > maxDistance) {
      return false;
    }
    
    return true;
  });
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleTypeFilter = (type) => {
    setFilterType(type);
  };
  
  const handleDistanceChange = (e) => {
    setMaxDistance(parseInt(e.target.value));
  };

  const handleViewOnMap = (location) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    window.open(url, "_blank");
  };
  
  return (
    <div className="py-6">
      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6">Find Quiet Spots</h2>
        
        <Button
          className="mb-4 bg-noise-500 hover:bg-noise-600 text-white"
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const lat = position.coords.latitude;
                  const lng = position.coords.longitude;
                  const url = `https://www.google.com/maps/search/quiet+places/@${lat},${lng},14z`;
                  window.open(url, "_blank");
                },
                (error) => {
                  alert("Could not get your location. Please allow location access.");
                }
              );
            } else {
              alert("Geolocation is not supported by your browser.");
            }
          }}
        >
          Show Quiet Places Near Me (Google Maps)
        </Button>
        
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-noise-500 focus:border-noise-500"
              placeholder="Search quiet locations..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type of Place
              </label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Park', 'Garden', 'Indoor'].map(type => (
                  <button
                    key={type}
                    className={`px-3 py-1 text-sm rounded-full ${
                      filterType === type
                        ? 'bg-noise-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => handleTypeFilter(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Distance: {maxDistance} miles
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={maxDistance}
                onChange={handleDistanceChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </Card>
      
      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpots.length > 0 ? (
          filteredSpots.map(spot => (
            <QuietSpotCard key={spot.id} spot={spot} onViewOnMap={handleViewOnMap} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-500">No quiet spots found matching your criteria.</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuietFinder;