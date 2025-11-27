import React from 'react';
import Navbar from '../components/Navbar'; // <-- 1. Impor Navbar

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 2. Pasang Navbar di paling atas */}
      <Navbar /> 

      <div className="container mx-auto mt-10 p-8 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Dashboard Utama
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Selamat datang di Sistem Presensi Mahasiswa & Admin.
          </p>
          <p className="text-sm text-gray-500">
            Silakan gunakan menu navigasi di atas (Navbar) untuk melakukan Absensi atau melihat Laporan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;