'use client';

import dynamic from 'next/dynamic';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CountUp from 'react-countup';
import { useProvince, useCity, useDistrict } from '@/frontend/hooks/region';
import { LOCATION_DATA } from '@/bin/location-data';
import { COMPLAINT_DATA, COMPLAINT_HEADER_DATA } from '@/bin/complaint-data';
import Image from 'next/image';

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

  const handleChangeProvince = (e: any) => {
    setSelectedProvince(e.target.value);
  };

  const handleChangeCity = (e: any) => {
    setSelectedCity(e.target.value);
  };

  const handleChangeDistrict = (e: any) => {
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
      value: '149225',
    },
    {
      id: 2,
      title: 'Sekolah Menengah Pertama',
      value: '42907',
    },
    {
      id: 3,
      title: 'Sekolah Menengah Atas',
      value: '14573',
    },
  ];

  const studentsData = [
    {
      id: 1,
      title: 'Sekolah Dasar',
      value: '24004000',
    },
    {
      id: 2,
      title: 'Sekolah Menengah Pertama',
      value: '9970000',
    },
    {
      id: 3,
      title: 'Sekolah Menengah Atas',
      value: '5008000',
    },
  ];

  const submit = () => {
    const data = LOCATION_DATA.filter(
      (e) => e.district_id === selectedDistrict
    );
    console.log('selectedDistrict', selectedDistrict);

    setLocationData(data as any);
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
              <CountUp
                end={item.value}
                className="mb-2 text-2xl font-bold tracking-tight text-gray-900"
                duration={5}
              />
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
          <div className="flex flex-wrap gap-3 py-4">
            <div className="flex flex-row gap-1 items-center">
              <Image src="/militer.png" width={20} height={20} />
              <p className="text-sm font-medium">Koramil</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <Image src="/tk.png" width={20} height={20} />
              <p className="text-sm font-medium">TK/KB/PAUD/PKBM/SPS</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <Image src="/sd.png" width={20} height={20} />
              <p className="text-sm font-medium">SD</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <Image src="/smp.png" width={20} height={20} />
              <p className="text-sm font-medium">SMP</p>
            </div>
          </div>
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
              <CountUp
                end={item.value}
                className="mb-2 text-2xl font-bold tracking-tight text-gray-900"
                duration={5}
              />
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
                  {COMPLAINT_HEADER_DATA.map((item) => (
                    <th key={item.id} scope="col" className="px-6 py-3">
                      {item.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPLAINT_DATA.map((data) => (
                  <tr key={data.no} className="bg-white border-b ">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {data.no}
                    </td>
                    <td className="px-6 py-4">{data.tanggal}</td>
                    <td className="px-6 py-4">{data.nama_pelapor}</td>
                    <td className="px-6 py-4">{data.provinsi}</td>
                    <td className="px-6 py-4">{data.sekolah}</td>
                    <td className="px-6 py-4">{data.deskripsi_masalah}</td>
                  </tr>
                ))}
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
                        ? province.map((item: any) => (
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
                        ? city.map((item: any) => (
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
                        ? district.map((item: any) => (
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
                      Submit
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
