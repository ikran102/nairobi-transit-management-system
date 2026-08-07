import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: -1.2921,
  lng: 36.8219
};

export default function MapView({ activeRoute, cbdCoordinates }) {
  console.log("API KEY:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const onLoad = useCallback(function callback(mapInstance) {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(function callback(mapInstance) {
    setMap(null);
  }, []);

  // Reset the route representation whenever a new route is selected
  useEffect(() => {
    setDirectionsResponse(null);

    if (map) {
      if (activeRoute?.center) {
        map.panTo(activeRoute.center);
        map.setZoom(activeRoute.zoom || 13);
      } else {
        map.panTo(defaultCenter);
        map.setZoom(13);
      }
    }
  }, [activeRoute, map]);

  const directionsCallback = (res) => {
    if (res !== null) {
      if (res.status === 'OK') {
        setDirectionsResponse(res);
      } else {
        console.error("Directions request failed: ", res.status);
      }
    }
  };

  if (!isLoaded) {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <div style={{ width: '32px', height: '32px', border: '4px solid blue', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px auto' }}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ fontSize: '13px', color: '#475569', fontWeight: '600', margin: 0 }}>Loading Nairobi Transit Map...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={activeRoute?.center || defaultCenter}
      zoom={activeRoute?.zoom || 13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {/* 1. Request the directions using CBD as starting point and activeRoute.center as destination */}
      {activeRoute && activeRoute.center && cbdCoordinates && directionsResponse === null && (
        <DirectionsService
          options={{
            origin: cbdCoordinates,
            destination: activeRoute.center,
            travelMode: 'DRIVING'
          }}
          callback={directionsCallback}
        />
      )}

      {/* 2. Render the actual road routes if found */}
      {directionsResponse !== null && (
        <DirectionsRenderer
          options={{
            directions: directionsResponse,
            polylineOptions: {
              strokeColor: activeRoute?.color || "#2563EB", 
              strokeOpacity: 0.8,
              strokeWeight: 6
            },
            suppressMarkers: false // Displays clean starting (A) and ending (B) markers automatically!
          }}
        />
      )}
    </GoogleMap>
  );
}