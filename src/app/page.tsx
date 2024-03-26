'use client';

import dynamic from 'next/dynamic';
import { useState, Fragment, use, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useProvince, useCity, useDistrict } from '@/frontend/hooks/region';
import { LOCATION_DATA } from '@/bin/location-data';

const DynamicSchoolDistributionMap = dynamic(
  () => import('./components/SchoolDistributionMap'),
  {
    ssr: false,
  }
);

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [locationData, setLocationData] = useState([]);
  const { province } = useProvince();
  const { city } = useCity(selectedProvince);
  const { district } = useDistrict(selectedCity);

  const handleChangeProvince = (e) => {
    setSelectedProvince(e.target.value);
  };

  const handleChangeCity = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleChangeDistrict = (e) => {
    setSelectedDistrict(e.target.value);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const registeredSchoolData = [
    {
      id: 1,
      title: 'Sekolah Dasar',
      value: '15.000',
    },
    {
      id: 2,
      title: 'Sekolah Menengah Pertama',
      value: '15.000',
    },
    {
      id: 3,
      title: 'Sekolah Menengah Atas',
      value: '15.000',
    },
  ];

  const studentsData = [
    {
      id: 1,
      title: 'Sekolah Dasar',
      value: '10.115.000',
    },
    {
      id: 2,
      title: 'Sekolah Menengah Pertama',
      value: '5.000.000',
    },
    {
      id: 3,
      title: 'Sekolah Menengah Atas',
      value: '1.500.000',
    },
  ];

  const submit = () => {
    const data = LOCATION_DATA.filter(
      (e) => e.district_id === selectedDistrict
    );

    console.log('selectedDistrict', selectedDistrict);
    console.log('data', data);
    setLocationData(data);
    setIsOpen(false);
  };

  return (
    <main className="p-4 md:p-10 flex flex-col gap-2 mx-auto max-w-7xl">
      <div className="flex flex-row gap-2">
        <div className="basis-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Sekolah Terdaftar
            </h5>
          </a>

          {registeredSchoolData.map((item) => (
            <div
              key={item.id}
              className="block max-w-sm p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
            >
              <h6 className="mb-2 text-md font-normal tracking-tight text-gray-900">
                {item.title}
              </h6>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {item.value}
              </h5>
            </div>
          ))}
        </div>
        <div className="basis-2/3 p-6 bg-white border border-gray-200 rounded-lg shadow">
          <div className="flex justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Peta Persebaran Sekolah
            </h5>
            <button
              onClick={openModal}
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Cari Sekolah
            </button>
          </div>

          <DynamicSchoolDistributionMap data={locationData} />
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="basis-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Siswa Penerima Manfaat
            </h5>
          </a>

          {studentsData.map((item) => (
            <div
              key={item.id}
              className="block max-w-sm p-6 mb-2 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100"
            >
              <h6 className="mb-2 text-md font-normal tracking-tight text-gray-900">
                {item.title}
              </h6>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {item.value}
              </h5>
            </div>
          ))}
        </div>
        <div className="basis-2/3 p-6 bg-white border border-gray-200 rounded-lg shadow">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Aduan Masyarakat
            </h5>
          </a>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama Pelapor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Provinsi
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sekolah
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Deskripsi Masalah
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    1
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                </tr>
                <tr className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    2
                  </th>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                  <td className="px-6 py-4">$1999</td>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                </tr>
                <tr className="bg-white ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    3
                  </th>
                  <td className="px-6 py-4">Black</td>
                  <td className="px-6 py-4">Accessories</td>
                  <td className="px-6 py-4">$99</td>
                  <td className="px-6 py-4">Black</td>
                  <td className="px-6 py-4">Accessories</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Cari Sekolah
                  </Dialog.Title>
                  <form className="max-w-sm mx-auto mt-2">
                    <label
                      htmlFor="countries"
                      className="block mt-2 mb-2 text-sm font-medium text-gray-900"
                    >
                      Pilih Provinsi
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={handleChangeProvince}
                      value={selectedProvince}
                    >
                      {province && province.length
                        ? province.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))
                        : null}
                    </select>
                    <label
                      htmlFor="city"
                      className="block mt-2 mb-2 text-sm font-medium text-gray-900"
                    >
                      Pilih Kota/Kabupaten
                    </label>
                    <select
                      id="city"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={handleChangeCity}
                      value={selectedCity}
                    >
                      {selectedProvince && city.length
                        ? city.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))
                        : null}
                    </select>
                    <label
                      htmlFor="district"
                      className="block mt-2 mb-2 text-sm font-medium text-gray-900"
                    >
                      Pilih Kecamatan
                    </label>
                    <select
                      id="district"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={handleChangeDistrict}
                      value={selectedDistrict}
                    >
                      {selectedCity && district.length
                        ? district.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </form>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={submit}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}
