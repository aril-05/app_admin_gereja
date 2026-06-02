import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Import alat pembantu API kita

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // OAuth2 Password Request Form butuh format FormData, bukan JSON
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await api.post("/auth/", formData);
      
      // Simpan token ke localStorage browser
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", username); // Simpan nama untuk sambutan
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("id_anggota", response.data.id_anggota);
      localStorage.setItem("id_keluarga", response.data.id_keluarga);


      // Pindah ke halaman dashboard dengan efek mulus
      navigate("/dashboard");
    } catch (err) {
      setError("Username atau Password salah. Silakan coba lagi.");
      console.error("Login error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Container Utama (Background Full Screen, Centered)
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      
      {/* Kartu Login dengan efek Shadow Mulus */}
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/70 w-full max-w-md transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-slate-300/50">
        
        {/* Logo/Judul Modern */}
        <div className="text-center mb-10">
          <div className="inline-flex bg-blue-10 text-blue-60 rounded-full p-4 mb-4 shadow-inner">
            {/* Icon Gereja Sederhana */}
            <img
            src = "https://gpib.or.id/wp-content/uploads/2020/04/Logo-GPIB.png"
            alt = "Logo GPIB"
            className="w-20 h-20 object-contain mx-auto drop-shadow-md"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">GPIB Pondok Ungu</h1>
          <p className="text-slate-600 mt-2">Sistem Informasi Anggota Jemaat</p>
        </div>

        {/* Notifikasi Error jika gagal */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-200 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Input Username */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-lg"
              placeholder="Contoh: budisantoso"
              required
            />
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password (Tahun/Bulan/Tanggal)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all text-lg"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Tombol Login Mulus */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-600/40 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? "Mencoba Masuk..." : "Masuk ke Sistem"}
          </button>
        </form>
      </div>

      <p className="text-sm text-slate-500 mt-8 text-center">GPIB PONDOK UNGU</p>
    </div>
  );
}

export default LoginPage;