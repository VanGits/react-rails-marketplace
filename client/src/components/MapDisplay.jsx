import React, { useEffect, useState } from 'react';
import "../styles/MapDisplay.css"
const MapDisplay = ({ item }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadGoogleMapsAPI = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      script.onload = handleScriptLoad;
      document.body.appendChild(script);
    };

    const handleScriptLoad = () => {
      if (window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: item?.location }, handleGeocodeResults);
      }
    };

    const handleGeocodeResults = (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const location = results[0].geometry.location;
        if (isValidCoordinates(location.lat(), location.lng())) {
          const mapOptions = {
            center: location,
            zoom: 12,
          };
          const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
          setMap(map);

          const circleOptions = {
            strokeColor: 'transparent',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'cyan',
            fillOpacity: 0.35,
            map,
            center: location,
            radius: 2000, 
          };
          new window.google.maps.Circle(circleOptions);
        } else {
          console.log('Invalid coordinates:', location);
        }
      } else {
        console.log('Geocoding failed:', status);
      }
    };

    const isValidCoordinates = (lat, lng) => {
      return isFinite(lat) && Math.abs(lat) <= 90 && isFinite(lng) && Math.abs(lng) <= 180;
    };

    loadGoogleMapsAPI();
  }, [item?.location]);

  console.log(item?.location);

  return <div id='map' ></div>;
};

export default MapDisplay;