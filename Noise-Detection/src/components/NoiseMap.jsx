import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Hardcoded Mapbox token for local testing (replace with your token)
mapboxgl.accessToken = 'pk.eyJ1IjoieW91cm1hcGJveHVzZXJuYW1lIiwiYSI6ImNsbXJ2M2h2YzA5a3EzcG1zN3U3c3N3b2wifQ.ZqH0p5X8tR8uXb7aJ3oJ5g'; // Replace with your actual token

const NoiseMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.006, 40.7128], // Default: NYC
      zoom: 12,
    });

    // No dynamic markers since we're avoiding backend data for now
    // You can add static markers here if needed (e.g., mock data)

    return () => map.current.remove();
  }, []);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[500px] rounded-lg shadow-md border border-gray-200"
    />
  );
};

export default NoiseMap;