import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Webcam from 'react-webcam';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { FiCamera, FiRefreshCw, FiMapPin, FiCheckCircle, FiLogOut } from 'react-icons/fi';

// Fix Icon Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

const AttendancePage = () => {
    const [coords, setCoords] = useState(null);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState("");
    const webcamRef = useRef(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                (err) => console.error(err)
            );
        }
    }, []);

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc);
        }
    }, [webcamRef]);

    const kirimAbsen = async (jenis) => {
        const token = localStorage.getItem('token');
        if (!token) return alert("Login dulu!");

        try {
            const url = `http://localhost:3001/api/presensi/${jenis}`;
            let dataKirim;
            let config = { headers: { Authorization: `Bearer ${token}` } };

            if (jenis === 'check-in') {
                if (!coords || !image) return alert("Wajib Foto & Lokasi!");
                const blob = await (await fetch(image)).blob();
                const formData = new FormData();
                formData.append('latitude', coords.lat);
                formData.append('longitude', coords.lng);
                formData.append('image', blob, 'selfie.jpg');
                dataKirim = formData;
            } else {
                dataKirim = {};
            }

            const response = await axios.post(url, dataKirim, config);
            setStatus(response.data.message);
            alert(`Sukses: ${response.data.message}`);
            if (jenis === 'check-in') setImage(null);
        } catch (error) {
            alert("Gagal: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans">
            <div className="sticky top-0 z-50"><Navbar /></div>
            
            <div className="container mx-auto py-10 px-4 flex justify-center items-center min-h-[80vh]">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-4xl bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-2xl overflow-hidden"
                >
                    <div className="p-8 md:p-10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Presensi Praktikum
                            </h2>
                            <p className="text-slate-400 mt-2">Verifikasi identitas dan lokasi Anda.</p>
                        </div>

                        {status && (
                            <motion.div 
                                initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center font-medium"
                            >
                                ✅ {status}
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* KOLOM KIRI: KAMERA */}
                            <div className="space-y-4">
                                <div className="relative rounded-2xl overflow-hidden border-2 border-slate-600 bg-black aspect-[4/3] shadow-lg group">
                                    {image ? (
                                        <img src={image} alt="Selfie" className="w-full h-full object-cover" />
                                    ) : (
                                        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full h-full object-cover" />
                                    )}
                                    
                                    <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {!image ? (
                                            <button onClick={capture} className="bg-white text-black px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-gray-200 shadow-lg transform hover:scale-105 transition">
                                                <FiCamera /> Jepret
                                            </button>
                                        ) : (
                                            <button onClick={() => setImage(null)} className="bg-red-500 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-red-600 shadow-lg transform hover:scale-105 transition">
                                                <FiRefreshCw /> Ulang
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <p className="text-center text-sm text-slate-500">Pastikan wajah terlihat jelas</p>
                            </div>

                            {/* KOLOM KANAN: PETA & TOMBOL */}
                            <div className="flex flex-col justify-between space-y-6">
                                {/* Peta */}
                                <div className="relative rounded-2xl overflow-hidden border border-slate-600 h-48 shadow-md">
                                    {coords ? (
                                        <MapContainer center={[coords.lat, coords.lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                            <Marker position={[coords.lat, coords.lng]}><Popup>Lokasi Anda</Popup></Marker>
                                        </MapContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-slate-700/50 text-slate-400 animate-pulse">
                                            <FiMapPin className="mr-2 animate-bounce" /> Mencari GPS...
                                        </div>
                                    )}
                                </div>

                                {/* Tombol Aksi (DIUBAH TEKSNYA) */}
                                <div className="space-y-3">
                                    <button 
                                        onClick={() => kirimAbsen('check-in')}
                                        className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg transform transition hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 text-lg"
                                    >
                                        <FiCheckCircle size={24}/> Check-In
                                    </button>
                                    
                                    <button 
                                        onClick={() => kirimAbsen('check-out')}
                                        className="w-full py-4 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white font-bold rounded-xl shadow-lg transform transition hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 text-lg"
                                    >
                                        <FiLogOut size={24}/> Check-Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AttendancePage;