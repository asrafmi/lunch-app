'use client';

import { useRef, useState } from 'react';
import { Marker, Popup, TileLayer, MapContainer } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { LOCATION_DATA } from '@/bin/location-data';

const SchoolDistributionMap = ({ data }: any) => {
  const [center, setCenter] = useState<any>({
    lat: -0.9183037743350194,
    lng: 100.39200272690312,
  });

  const mapRef = useRef();

  const DefaultIcon = L.icon({
    iconUrl: '/map-marker.png',
    shadowUrl: iconShadow as any,
    iconSize: [45, 45],
  });

  return (
    <MapContainer center={center as any} zoom={12} ref={mapRef as any}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data && data.length ? (
        data.map((item) => (
          <Marker
            key={item.sekolah_id}
            icon={DefaultIcon}
            position={{ lat: item.lat, lng: item.lng } as any}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))
      ) : (
        <Marker icon={DefaultIcon} position={center as any}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default SchoolDistributionMap;
