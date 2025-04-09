import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'your_token_here'; 

const NoiseMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.006, 40.7128], // NYC
      zoom: 12,
    });

    // ✅ Optional: Add a mock marker
    new mapboxgl.Marker({ color: '#EF4444' })
      .setLngLat([-74.006, 40.7128])
      .setPopup(new mapboxgl.Popup().setHTML("<h4>Mock Noise Report</h4><p>80 dB</p>"))
      .addTo(map.current);

    return () => map.current.remove();
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          NoiseMap Live Preview
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Real-time noise mapping powered by Mapbox (mock data).
        </p>
      </div>

      <div
        ref={mapContainer}
        className="w-full h-[500px] rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600"
      />
    </section>
  );
};

export default NoiseMap;
