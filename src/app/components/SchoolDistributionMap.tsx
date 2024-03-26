'use client';

import { useRef, useState } from 'react';
import { Marker, Popup, TileLayer, MapContainer } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const SchoolDistributionMap = () => {
  const [center, setCenter] = useState<Object>({
    lat: -6.175344732256595,
    lng: 106.82712185518545,
  });

  const mapRef = useRef();

  const DefaultIcon = L.icon({
    iconUrl: '/map-marker.png',
    shadowUrl: iconShadow,
    iconSize: [45, 45],
  });

  return (
    <MapContainer center={center} zoom={13} ref={mapRef}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={DefaultIcon} position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default SchoolDistributionMap;
