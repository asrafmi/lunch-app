'use client';

import { useEffect, useRef, useState } from 'react';
import { Marker, Popup, TileLayer, MapContainer, useMap } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const SchoolDistributionMap = ({ data }: any) => {
  const [center, setCenter] = useState<any>({
    lat: -6.175344732256595,
    lng: 106.82712185518545,
  });

  const mapRef = useRef();

  const SdIcon = L.icon({
    iconUrl: '/sd.png',
    shadowUrl: iconShadow as any,
    iconSize: [30, 30],
  });

  const SmpIcon = L.icon({
    iconUrl: '/smp.png',
    shadowUrl: iconShadow as any,
    iconSize: [30, 30],
  });

  const TkIcon = L.icon({
    iconUrl: '/tk.png',
    shadowUrl: iconShadow as any,
    iconSize: [30, 30],
  });

  const MiliterIcon = L.icon({
    iconUrl: '/militer.png',
    shadowUrl: iconShadow as any,
    iconSize: [30, 30],
  });

  function determineIcon(bentukPendidikan) {
    switch (bentukPendidikan) {
      case 'TK':
        return TkIcon;
      case 'SD':
        return SdIcon;
      case 'SMP':
        return SmpIcon;
      default:
        return TkIcon;
    }
  }

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMap();
    useEffect(() => {
      setPosition({ lat: data[0].lat, lng: data[0].lng } as any);
      map.flyTo({ lat: data[0].lat, lng: data[0].lng }, map.getZoom());
    }, [data]);

    return position === null && data.length === null
      ? null
      : data.map((item: any) =>
          item.sekolah_id ? (
            <Marker
              key={item.sekolah_id}
              icon={determineIcon(item.bentuk_pendidikan)}
              position={{ lat: item.lat, lng: item.lng } as any}
            >
              <div className="shadow-md sm:rounded-lg">
                <Popup>
                  <table>
                    {[
                      { id: 1, label: 'Nama Sekolah:', value: item.nama },
                      {
                        id: 2,
                        label: 'Bentuk Pendidikan:',
                        value: item.bentuk_pendidikan,
                      },
                      { id: 3, label: 'NPSN Sekolah:', value: item.npsn },
                      { id: 4, label: 'Jumlah Pegawai:', value: item.pegawai },
                      { id: 5, label: 'Jumlah Guru:', value: item.ptk },
                      { id: 6, label: 'Jumlah Siswa:', value: item.pd },
                      {
                        id: 7,
                        label: 'Jumlah Ruang Kelas:',
                        value: item.jml_rk,
                      },
                    ].map((data: any) => (
                      <tbody key={data.id}>
                        <tr className="border-b-2 border-gray-300">
                          <td className="text-xs text-gray-700">
                            {data.label}
                          </td>
                          <td className="text-end uppercase font-semibold">
                            {data.value}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </Popup>
              </div>
            </Marker>
          ) : (
            <Marker
              key={item.koramil_id}
              icon={MiliterIcon}
              position={{ lat: item.lat, lng: item.lng } as any}
            >
              <div className="shadow-md sm:rounded-lg">
                <Popup>
                  <table>
                    {[
                      { id: 1, label: 'Nama Koramil:', value: item.nama },
                      {
                        id: 2,
                        label: 'Jumlah Anggota:',
                        value: item.jumlah_anggota,
                      },
                      { id: 3, label: 'Luas Lahan:', value: item.luas },
                    ].map((data: any) => (
                      <tbody key={data.id}>
                        <tr className="border-b-2 border-gray-300">
                          <td className="text-xs text-gray-700">
                            {data.label}
                          </td>
                          <td className="text-end uppercase font-semibold">
                            {data.value}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </Popup>
              </div>
            </Marker>
          )
        );
  }

  return (
    <MapContainer center={center as any} zoom={12} ref={mapRef as any}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data && data.length ? (
        <LocationMarker />
      ) : (
        <Marker icon={TkIcon} position={center as any}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default SchoolDistributionMap;
