import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login_pages";
import DashboardPage from "./pages/dashboard";
import TambahAnggotaPage from "./pages/tambah_anggota";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/tambah_anggota" element={<TambahAnggotaPage />} />
        <Route path="/admin/edit_anggota" element={<TambahAnggotaPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;