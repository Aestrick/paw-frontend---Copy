import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AttendancePage from "./pages/AttendancePage"; // Import halaman absen
import ReportPage from "./pages/ReportPage"; // Import halaman laporan

function App() {
  return (
    <Routes>
      {/* Rute Awal (Login) */}
      <Route path="/" element={<LoginPage />} />
      
      {/* Rute Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Rute Dashboard */}
      <Route path="/dashboard" element={<DashboardPage />} />
      
      {/* Rute Baru UCP */}
      <Route path="/presensi" element={<AttendancePage />} />
      <Route path="/reports" element={<ReportPage />} />
    </Routes>
  );
}

export default App;