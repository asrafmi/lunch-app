'use client';

import { useRef, useState } from 'react';
import { Marker, Popup, TileLayer, MapContainer } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const SchoolDistributionMap = ({ data }: any) => {
  console.log(
    'data aaaa',
    data.map((item: any) =>
      console.log('item.lat', { lat: item.lat, lng: item.lng })
    )
  );

  const [center, setCenter] = useState<Object>({
    lat: -0.850236957887286,
    lng: 10033633826227400,
  });

  const mapRef = useRef();

  const DefaultIcon = L.icon({
    iconUrl: '/map-marker.png',
    shadowUrl: iconShadow as any,
    iconSize: [45, 45],
  });

  return (
    <MapContainer center={center as any} zoom={13} ref={mapRef as any}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker icon={DefaultIcon} position={center as any}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      {data && data.length
        ? data.map((item: any) => (
            <Marker
              icon={DefaultIcon}
              position={{ lat: item.lat, lng: item.lng } as any}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          ))
        : null}
    </MapContainer>
  );
};

export default SchoolDistributionMap;
