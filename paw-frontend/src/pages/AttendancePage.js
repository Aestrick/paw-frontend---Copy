import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

// Import komponen Peta dari React Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// --- FIX: Kode ini wajib ada agar ikon marker muncul dengan benar di React ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
// ---------------------------------------------------------------------------

const AttendancePage = () => {
    const [coords, setCoords] = useState(null); // Menyimpan { lat, lng }
    const [errorLoc, setErrorLoc] = useState(""); // Menyimpan pesan error lokasi
    const [status, setStatus] = useState(""); // Menyimpan pesan sukses/gagal dari server

    // 1. Ambil Lokasi GPS saat halaman pertama kali dibuka
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoords({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    console.log("Lokasi ditemukan:", position.coords);
                },
                (error) => {
                    setErrorLoc("Gagal mengambil lokasi: " + error.message);
                }
            );
        } else {
            setErrorLoc("Browser ini tidak mendukung Geolocation.");
        }
    }, []);

    // 2. Fungsi Kirim Absen ke Backend
    const kirimAbsen = async (jenis) => {
        const token = localStorage.getItem('token');
        if (!token) return alert("Silakan login dulu!");

        // Validasi: Jangan boleh Check-In kalau lokasi belum dapet
        if (jenis === 'check-in' && !coords) {
            alert("Lokasi belum ditemukan. Pastikan GPS aktif dan izinkan akses lokasi.");
            return;
        }

        try {
            const url = `http://localhost:3001/api/presensi/${jenis}`;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            // Payload: Kirim lat & lng kalau check-in
            const payload = (jenis === 'check-in') ? {
                latitude: coords.lat,
                longitude: coords.lng
            } : {};

            const response = await axios.post(url, payload, config);
            setStatus(response.data.message);
            alert(response.data.message);

        } catch (error) {
            const errMsg = error.response?.data?.message || "Gagal melakukan presensi";
            setStatus(errMsg);
            alert(errMsg);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            
            <div className="container mx-auto mt-10 p-5 flex justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Presensi & Lokasi</h2>

                    {/* Tampilkan Pesan Status API jika ada */}
                    {status && <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">{status}</div>}
                    
                    {/* Tampilkan Pesan Error Lokasi jika ada */}
                    {errorLoc && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{errorLoc}</div>}

                    {/* --- BAGIAN PETA (MAPS) --- */}
                    <div className="mb-6 border-2 border-blue-200 rounded-lg overflow-hidden h-64 relative bg-gray-200">
                        {coords ? (
                            // Tampilkan Peta jika koordinat sudah didapatkan
                            <MapContainer 
                                center={[coords.lat, coords.lng]} 
                                zoom={15} 
                                style={{ height: '100%', width: '100%' }}
                            >
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={[coords.lat, coords.lng]}>
                                    <Popup>
                                        Lokasi Kamu Saat Ini
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        ) : (
                            // Tampilkan Loading jika koordinat belum didapatkan
                            <div className="flex items-center justify-center h-full animate-pulse">
                                <p className="text-gray-500 font-semibold">📡 Sedang melacak lokasimu...</p>
                            </div>
                        )}
                    </div>
                    {/* -------------------------- */}

                    {/* Teks Info Koordinat */}
                    {coords && (
                        <p className="text-xs text-gray-500 mb-6 font-mono">
                            Lat: {coords.lat.toFixed(6)}, Lng: {coords.lng.toFixed(6)}
                        </p>
                    )}

                    {/* Tombol Aksi */}
                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={() => kirimAbsen('check-in')}
                            // Disable tombol jika lokasi belum ada
                            disabled={!coords}
                            className={`w-full py-3 rounded-lg font-bold text-white transition ${
                                coords ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                            }`}
                        >
                            MASUK (Check-In)
                        </button>
                        
                        <button 
                            onClick={() => kirimAbsen('check-out')}
                            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-bold transition"
                        >
                            PULANG (Check-Out)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendancePage;