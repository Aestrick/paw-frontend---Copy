import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion'; // Animasi
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'; // Ikon

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const apiBackend = 'http://localhost:3001/api/auth/login';
    try {
      const response = await axios.post(apiBackend, { email, password });
      localStorage.setItem('token', response.data.token);
      // Simulasi loading biar keren dikit
      setTimeout(() => {
          navigate('/dashboard');
      }, 800);
    } catch (error) {
      alert(error.response?.data?.message || "Login Gagal");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Element */}
      <div className="animated-bg"></div>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"></div>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-gray-300">Masuk untuk melanjutkan presensi Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiMail className="text-gray-400 group-focus-within:text-cyan-400 transition-colors" size={20} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all duration-300 hover:bg-black/30"
                placeholder="name@company.com"
              />
            </div>

            {/* Input Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-gray-400 group-focus-within:text-pink-400 transition-colors" size={20} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-transparent transition-all duration-300 hover:bg-black/30"
                placeholder="••••••••"
              />
            </div>

            {/* Tombol Login Super Keren */}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all relative overflow-hidden group"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <span>MASUK</span>
                  <FiLogIn className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Belum punya akun?{' '}
              <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors hover:underline">
                Buat Akun Sekarang
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}