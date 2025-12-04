import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.log("Token invalid", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
      <div className="font-bold text-xl">App Presensi</div>
      
      <div className="space-x-4 flex items-center">
        {/* Menu User */}
        {user && (
          <>
            <Link to="/dashboard" className="hover:text-blue-200">Home</Link>
            <Link to="/presensi" className="hover:text-blue-200">Absen</Link>
          </>
        )}

        {/* Menu Admin */}
        {user && user.role === 'admin' && (
          <Link to="/reports" className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition">
            Laporan
          </Link>
        )}

        {/* Info User & Logout */}
        {user ? (
          <div className="flex items-center gap-4 border-l pl-4 ml-2">
            {/* PENGAMAN: Pakai user?.nama agar tidak error jika nama kosong */}
            <span>Hai, <strong>{user?.nama || 'User'}</strong></span>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm font-bold"
            >
              Keluar
            </button>
          </div>
        ) : (
          <Link to="/login">Login dulu</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;