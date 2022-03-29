import React, { useState } from 'react';
// import ContextAvaliz from '../context/contextAvaliz'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

export default function GoogleMapsContainer() {
  const containerStyle = {
    width: '72.8%',
    height: '300px',
    // 'max-height': '300px'
  };
  const center = {
    lat: -15.7801,
    lng: -47.9292,
  };

  const [libraries] = useState(['places, geometry']);
  const [markerPosition] = useState(center);
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_API_KEY}
      libraries={libraries}
    >
      <GoogleMap
        id="map"
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={15}
      />
    </LoadScript>
  );
}
