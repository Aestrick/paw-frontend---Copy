import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiBriefcase, FiArrowRight } from 'react-icons/fi';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ nama: '', email: '', password: '', role: 'mahasiswa' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:3001/api/auth/register', formData);
      alert('Registrasi Berhasil!');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || "Registrasi Gagal");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="animated-bg"></div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-lg bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-10"
      >
         <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-2">
              Join Us
            </h1>
            <p className="text-gray-300">Mulai perjalanan karir Anda bersama kami.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
           {/* Nama */}
           <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiUser className="text-gray-400 group-focus-within:text-purple-400" />
              </div>
              <input
                type="text" required placeholder="Nama Lengkap"
                className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                onChange={(e) => setFormData({...formData, nama: e.target.value})}
              />
           </div>

           {/* Email */}
           <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className="text-gray-400 group-focus-within:text-purple-400" />
              </div>
              <input
                type="email" required placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
           </div>

           {/* Password */}
           <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-gray-400 group-focus-within:text-purple-400" />
              </div>
              <input
                type="password" required placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
           </div>

           {/* Role */}
           <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiBriefcase className="text-gray-400 group-focus-within:text-purple-400" />
              </div>
              <select 
                className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent appearance-none"
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="mahasiswa" className="text-black">Staff / Mahasiswa</option>
                <option value="admin" className="text-black">Administrator</option>
              </select>
           </div>

           <motion.button
              whileHover={{ scale: 1.02, backgroundImage: "linear-gradient(to right, #a855f7, #ec4899)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? 'Mendaftarkan...' : <><span>DAFTAR SEKARANG</span><FiArrowRight/></>}
            </motion.button>
        </form>
        
        <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition">
              Sudah punya akun? Login saja
            </Link>
        </div>
      </motion.div>
    </div>
  );
}