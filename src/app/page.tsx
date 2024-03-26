import dynamic from 'next/dynamic';
const DynamicSchoolDistributionMap = dynamic(
  () => import('./components/SchoolDistributionMap'),
  {
    ssr: false,
  }
);

export default function Home() {
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
          <DynamicSchoolDistributionMap />
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
    </main>
  );
}
