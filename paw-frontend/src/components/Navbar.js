import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Jangan lupa install ini dulu

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Pas navbar muncul, kita cek tokennya
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Baca isi token buat dapet nama & role
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.log("Tokennya ga valid nih", error);
      }
    }
  }, []);

  // Fungsi buat logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Hapus token dari saku
    navigate('/login'); // Balikin ke halaman login
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
      <div className="font-bold text-xl">App Presensi</div>
      
      <div className="space-x-4 flex items-center">
        {/* Menu ini muncul buat semua user yang login */}
        {user && (
          <>
            <Link to="/dashboard" className="hover:text-blue-200">Home</Link>
            <Link to="/presensi" className="hover:text-blue-200">Absen</Link>
          </>
        )}

        {/* Menu ini CUMA buat ADMIN */}
        {user && user.role === 'admin' && (
          <Link to="/reports" className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition">
            Laporan
          </Link>
        )}

        {/* Kalo user login, tampilin nama & tombol logout */}
        {user ? (
          <div className="flex items-center gap-4 border-l pl-4 ml-2">
            <span>Hai, <strong>{user.nama}</strong></span>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm font-bold"
            >
              Keluar
            </button>
          </div>
        ) : (
          // Kalo belum login
          <Link to="/login">Login dulu</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;