import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';

export default function DashboardPage() {
  const stats = [
    { title: 'Total Hadir', value: '24', desc: 'Pertemuan', icon: <FiCheckCircle size={24} />, color: 'bg-emerald-500' },
    { title: 'Tepat Waktu', value: '98%', desc: 'Rata-rata', icon: <FiClock size={24} />, color: 'bg-blue-500' },
    { title: 'Terlambat', value: '1', desc: 'Perlu Perbaikan', icon: <FiAlertCircle size={24} />, color: 'bg-amber-500' },
    { title: 'Nilai Keaktifan', value: 'A', desc: 'Sangat Baik', icon: <FiTrendingUp size={24} />, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <div className="sticky top-0 z-50"><Navbar /></div>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header Welcome (REVISI JUDUL) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Praktikum Pengembangan Aplikasi Web 2025
            </h1>
            <p className="text-slate-400 text-lg">Sistem manajemen presensi mahasiswa Teknologi Informasi.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, borderColor: 'rgba(99, 102, 241, 0.5)' }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-20 text-white shadow-lg shadow-${stat.color}/20`}>
                  {stat.icon}
                </div>
                <span className="text-xs font-semibold text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700">
                    {stat.desc}
                </span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium">{stat.title}</h3>
              <p className="text-4xl font-bold mt-2 text-white tracking-tight">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Animasi Ilustrasi (GAMBAR ONLINE) */}
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center"
        >
             <div className="relative w-80 h-80 mb-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                {/* Menggunakan Gambar Online dari IconScout/CDN */}
                <img 
                    src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-2974925-2477356.png" 
                    alt="Web Dev Illustration" 
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-[bounce_4s_infinite]"
                />
             </div>
             <h3 className="text-2xl font-bold text-slate-200">Praktikum Pengembangan Aplikasi 2025</h3>
             <p className="text-slate-500 max-w-md mt-2">
                 Dibangun dengan React.js, Node.js, dan MySQL.
             </p>
        </motion.div>

      </main>
    </div>
  );
}