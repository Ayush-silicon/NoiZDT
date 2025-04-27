import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AlertTriangle, Volume1, Volume2, Volume, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';


const sampleNoiseData = [
  { id: 1, lat: 40.7128, lng: -74.006, level: 85, source: 'Traffic', timestamp: new Date().toISOString() },
  { id: 2, lat: 40.7148, lng: -74.013, level: 65, source: 'Construction', timestamp: new Date().toISOString() },
  { id: 3, lat: 40.7218, lng: -74.001, level: 45, source: 'Ambient', timestamp: new Date().toISOString() },
  { id: 4, lat: 40.7098, lng: -74.016, level: 75, source: 'Restaurant', timestamp: new Date().toISOString() },
];

const NoiseMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapboxToken, setMapboxToken] = useState(localStorage.getItem('mapbox_token') || '');
  const [isRecording, setIsRecording] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  
  // Handle token input
  const handleTokenChange = (e) => {
    setMapboxToken(e.target.value);
  };

  const saveToken = () => {
    localStorage.setItem('mapbox_token', mapboxToken);
    initializeMap();
    toast({
      title: "Token saved",
      description: "Your Mapbox token has been saved. The map will now load.",
    });
  };

  const initializeMap = () => {
    if (mapboxToken && !mapInitialized) {
      mapboxgl.accessToken = mapboxToken;
      
      if (map.current) return;
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-74.006, 40.7128], // NYC default
        zoom: 12,
        pitch: 30,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.current.addControl(new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      }));

      map.current.on('load', () => {
        // Add heatmap layer for noise intensity
        map.current.addSource('noise-data', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: sampleNoiseData.map(point => ({
              type: 'Feature',
              properties: {
                level: point.level,
                source: point.source,
                color: getNoiseLevelColor(point.level),
                timestamp: point.timestamp
              },
              geometry: {
                type: 'Point',
                coordinates: [point.lng, point.lat]
              }
            }))
          }
        });

        map.current.addLayer({
          id: 'noise-heat',
          type: 'heatmap',
          source: 'noise-data',
          paint: {
            'heatmap-weight': [
              'interpolate', ['linear'], ['get', 'level'],
              40, 0.1,
              70, 0.5,
              90, 1
            ],
            'heatmap-intensity': 1,
            'heatmap-color': [
              'interpolate', ['linear'], ['heatmap-density'],
              0, 'rgba(33,102,172,0)',
              0.2, 'rgb(103,169,207)',
              0.4, 'rgb(209,229,240)',
              0.6, 'rgb(253,219,199)',
              0.8, 'rgb(239,138,98)',
              1, 'rgb(178,24,43)'
            ],
            'heatmap-radius': 20,
            'heatmap-opacity': 0.8
          }
        });

        map.current.addLayer({
          id: 'noise-points',
          type: 'circle',
          source: 'noise-data',
          paint: {
            'circle-radius': 8,
            'circle-color': ['get', 'color'],
            'circle-opacity': 0.8,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        });

        // Add click event for points
        map.current.on('click', 'noise-points', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const { level, source, timestamp } = e.features[0].properties;
          
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          
          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`
              <div>
                <h3 class="font-bold text-gray-900 mb-1">Noise Level: ${level} dB</h3>
                <p class="text-sm text-gray-600">Source: ${source}</p>
                <p class="text-xs text-gray-500 mt-1">Reported: ${new Date(timestamp).toLocaleString()}</p>
                <div class="mt-2 mb-1">
                  <div class="noise-level-indicator ${getNoiseLevelClass(level)}"></div>
                </div>
              </div>
            `)
            .addTo(map.current);
        });

        // Change cursor on hover
        map.current.on('mouseenter', 'noise-points', () => {
          map.current.getCanvas().style.cursor = 'pointer';
        });
        
        map.current.on('mouseleave', 'noise-points', () => {
          map.current.getCanvas().style.cursor = '';
        });

        setMapInitialized(true);
      });
    }
  };

  // Simulate recording noise with microphone
  const toggleRecording = () => {
    if (isRecording) {
      // Simulate stopping the recording
      setIsRecording(false);
      
      // Simulate a noise level result
      const simulatedLevel = Math.floor(Math.random() * 50) + 40;
      setNoiseLevel(simulatedLevel);
      
      toast({
        title: `Noise level detected: ${simulatedLevel} dB`,
        description: `${getNoiseLevelDescription(simulatedLevel)}`,
      });
      
      // In a real app, you would use the Web Audio API to record and analyze 
      // the audio, then send the data to your backend
    } else {
      // Simulate starting the recording
      setIsRecording(true);
      setNoiseLevel(null);
      
      // Simulate a recording process
      setTimeout(() => {
        if (isRecording) {
          toggleRecording();
        }
      }, 3000);
    }
  };

  // Helper functions for noise levels
  const getNoiseLevelColor = (level) => {
    if (level < 50) return '#4ade80'; // green
    if (level < 65) return '#facc15'; // yellow
    if (level < 80) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const getNoiseLevelClass = (level) => {
    if (level < 50) return 'noise-level-low';
    if (level < 65) return 'noise-level-medium';
    if (level < 80) return 'noise-level-high';
    return 'noise-level-extreme';
  };

  const getNoiseLevelDescription = (level) => {
    if (level < 50) return 'Quiet environment, suitable for relaxation';
    if (level < 65) return 'Moderate noise level, comparable to normal conversation';
    if (level < 80) return 'High noise level, could cause stress over time';
    return 'Extreme noise level, potential hearing damage with prolonged exposure';
  };

  useEffect(() => {
    // Initialize map if token exists
    if (mapboxToken) {
      initializeMap();
    }
    
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  const getNoiseLevelIcon = () => {
    if (!noiseLevel) return <Volume className="h-5 w-5" />;
    if (noiseLevel < 50) return <Volume1 className="h-5 w-5 text-green-500" />;
    if (noiseLevel < 80) return <Volume2 className="h-5 w-5 text-yellow-500" />;
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {!mapboxToken ? (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-4">
          <h2 className="text-xl font-bold mb-4">Mapbox Token Required</h2>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            To use the noise map, please enter your Mapbox access token. 
            You can get one for free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-noise-600 underline">mapbox.com</a>.
          </p>
          <div className="w-full max-w-md">
            <input
              type="text"
              value={mapboxToken}
              onChange={handleTokenChange}
              placeholder="Enter your Mapbox token"
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <Button 
              onClick={saveToken} 
              className="w-full bg-noise-500 hover:bg-noise-600"
            >
              Save Token & Load Map
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="absolute inset-0" />
          
          {/* Recording controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex flex-col items-center">
              <Button
                className={`rounded-full w-14 h-14 ${isRecording ? 'bg-red-500 hover:bg-red-600 recording-pulse' : 'bg-noise-500 hover:bg-noise-600'}`}
                onClick={toggleRecording}
              >
                <Mic className="h-6 w-6" />
              </Button>
              <span className="mt-2 bg-white py-1 px-3 rounded-full text-sm shadow-md">
                {isRecording ? 'Recording...' : 'Record Noise'}
              </span>
            </div>
          </div>
          
          {/* Noise level indicator */}
          {noiseLevel && (
            <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 z-10">
              <div className="flex items-center">
                {getNoiseLevelIcon()}
                <span className="ml-2 font-medium">{noiseLevel} dB</span>
              </div>
              <div className="mt-1">
                <div className={`noise-level-indicator ${getNoiseLevelClass(noiseLevel)}`}></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {getNoiseLevelDescription(noiseLevel)}
              </p>
            </div>
          )}
          
          {/* Legend */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3 z-10">
            <h3 className="font-medium text-sm mb-2">Noise Levels</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="noise-level-indicator noise-level-low w-8"></div>
                <span className="ml-2 text-xs">Low (&lt;50dB)</span>
              </div>
              <div className="flex items-center">
                <div className="noise-level-indicator noise-level-medium w-8"></div>
                <span className="ml-2 text-xs">Medium (50-65dB)</span>
              </div>
              <div className="flex items-center">
                <div className="noise-level-indicator noise-level-high w-8"></div>
                <span className="ml-2 text-xs">High (65-80dB)</span>
              </div>
              <div className="flex items-center">
                <div className="noise-level-indicator noise-level-extreme w-8"></div>
                <span className="ml-2 text-xs">Extreme (&gt;80dB)</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NoiseMap;