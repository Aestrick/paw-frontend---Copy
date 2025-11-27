import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiBackend = 'http://localhost:3001/api/auth/login';

    try {
      const response = await axios.post(apiBackend, { email, password });
      const { token } = response.data;
      
      // Simpan token
      localStorage.setItem('token', token);
      console.log('Login berhasil, token disimpan:', token);
      
      // Pindah ke dashboard
      navigate('/dashboard');

    } catch (error) {
      console.error('Login Error:', error);
      
      // --- PERBAIKAN ERROR HANDLING DI SINI ---
      // Cek apakah ada respon dari server atau tidak
      let errorMessage = "Gagal menghubungi server. Pastikan backend sudah jalan!";
      
      if (error.response && error.response.data && error.response.data.message) {
        // Jika server merespon (misal: password salah), pakai pesan dari server
        errorMessage = error.response.data.message;
      }
      
      alert(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-white">Login</h1>
        <p className="text-center text-gray-200">Selamat datang kembali!</p>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Alamat Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-gray-900 bg-white bg-opacity-70 border border-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="email@contoh.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-gray-900 bg-white bg-opacity-70 border border-transparent rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="••••••••"
            />
          </div>

          <div>
            <button 
              type="submit"
              className="w-full px-4 py-3 font-bold text-blue-600 bg-white rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-300"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-200">
          Belum punya akun?{' '}
          <Link to="/register" className="font-medium text-white hover:underline">
            Registrasi di sini
          </Link>
        </p>
      </div>
    </div>
  );
}