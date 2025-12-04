import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ReportPage = () => {
  const [laporan, setLaporan] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [tglMulai, setTglMulai] = useState('');
  const [tglAkhir, setTglAkhir] = useState('');

  // Fungsi untuk mengambil data laporan dari API
  const ambilData = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert("Harap login sebagai admin");

    try {
      const response = await axios.get('http://localhost:3001/api/reports/daily', {
        headers: { Authorization: `Bearer ${token}` },
        params: { 
          nama: keyword, 
          tanggalMulai: tglMulai, 
          tanggalSelesai: tglAkhir 
        }
      });
      setLaporan(response.data.data);
    } catch (error) {
      console.error("Error fetch reports:", error);
    }
  };

  // Ambil data saat halaman pertama kali dibuka
  useEffect(() => {
    ambilData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Laporan Presensi (Admin)</h1>

        {/* --- BAGIAN FILTER --- */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Cari Nama</label>
            <input 
              type="text" 
              placeholder="Nama karyawan..." 
              className="border p-2 rounded"
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Dari Tanggal</label>
            <input 
              type="date" 
              className="border p-2 rounded"
              value={tglMulai} 
              onChange={(e) => setTglMulai(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Sampai Tanggal</label>
            <input 
              type="date" 
              className="border p-2 rounded"
              value={tglAkhir} 
              onChange={(e) => setTglAkhir(e.target.value)}
            />
          </div>
          <button 
            onClick={ambilData} 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 h-10"
          >
            Filter Data
          </button>
        </div>

        {/* --- BAGIAN TABEL --- */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">ID</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Nama</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Masuk</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600">Bukti Foto</th> {/* Header Kolom Foto */}
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Keluar</th>
              </tr>
            </thead>
            <tbody>
              {laporan.length > 0 ? (
                laporan.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{item.id}</td>
                    <td className="px-4 py-3 font-medium">{item.user?.nama || 'User dihapus'}</td>
                    <td className="px-4 py-3 text-green-600">
                      {new Date(item.checkIn).toLocaleString()}
                    </td>
                    
                    {/* --- KOLOM BUKTI FOTO (Kode yang kamu minta) --- */}
                    <td className="px-4 py-3 text-center">
                      {item.buktiFoto ? (
                        <a 
                          // Mengubah backslash Windows (\) menjadi slash URL (/)
                          href={`http://localhost:3001/${item.buktiFoto.replace(/\\/g, '/')}`} 
                          target="_blank" 
                          rel="noreferrer"
                        >
                           <img 
                             src={`http://localhost:3001/${item.buktiFoto.replace(/\\/g, '/')}`} 
                             alt="Bukti" 
                             className="h-12 w-12 object-cover rounded border mx-auto cursor-pointer hover:scale-110 transition shadow-sm"
                             onError={(e) => { e.target.src = 'https://via.placeholder.com/50?text=Err'; }} 
                           />
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs italic">No Photo</span>
                      )}
                    </td>
                    {/* ---------------------------------------------- */}

                    <td className="px-4 py-3 text-red-600">
                      {item.checkOut ? new Date(item.checkOut).toLocaleString() : '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    Tidak ada data laporan yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;