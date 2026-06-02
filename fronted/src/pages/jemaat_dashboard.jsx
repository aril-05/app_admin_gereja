import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function JemaatDashboard() {
  const [profilData, setProfilData] = useState(null);
  const [keluargaList, setKeluargaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Ambil memori dari login
  const idAnggota = localStorage.getItem("id_anggota");
  const idKeluarga = localStorage.getItem("id_keluarga");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // CATATAN: Pastikan 2 endpoint ini sudah Anda buat di FastAPI
        // 1. Ambil data dirinya sendiri
        if (idAnggota) {
            const resProfil = await api.get(`/anggota/${idAnggota}`);
            setProfilData(resProfil.data);
        }

        // 2. Ambil data keluarganya
        if (idKeluarga) {
            const resKeluarga = await api.get(`/keluarga/${idKeluarga}`);
            // Filter agar namanya sendiri tidak muncul dobel di list keluarga
            const daftarKeluarga = resKeluarga.data.filter(a => a.id_anggota_jemaat.toString() !== idAnggota);
            setKeluargaList(daftarKeluarga);
        }
      } catch (err) {
        console.error("Gagal mengambil data pribadi/keluarga", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idAnggota, idKeluarga]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleEditProfil = () => alert("Nanti akan membuka Form Edit untuk profil ini");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* NAVBAR JEMAAT */}
      <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-extrabold tracking-tight text-blue-700">SIAK Gereja</span>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">Halo, {username}</span>
            <button onClick={handleLogout} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all">Keluar</button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {loading ? (
            <p className="text-center">Memuat profil...</p>
        ) : (
            <>
                {/* KARTU PROFIL PRIBADI */}
                <section className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Profil Saya</h2>
                            <p className="text-slate-500">Informasi pribadi Anda di sistem gereja</p>
                        </div>
                        <button onClick={handleEditProfil} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-all">
                            Edit Profil
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-slate-500 mb-1">Nama Lengkap</p>
                            <p className="font-semibold text-lg">{profilData?.nama || "-"}</p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 mb-1">Nomor Telepon</p>
                            <p className="font-semibold text-lg">{profilData?.no_telepon || "-"}</p>
                        </div>
                    </div>
                </section>

                {/* KARTU ANGGOTA KELUARGA LAINNYA */}
                <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Anggota Keluarga Lainnya</h2>
                    {keluargaList.length === 0 ? (
                        <p className="text-slate-500 italic p-4 bg-slate-50 rounded-xl">Tidak ada data anggota keluarga lain.</p>
                    ) : (
                        <ul className="divide-y divide-slate-100">
                            {keluargaList.map((kel) => (
                                <li key={kel.id_anggota_jemaat} className="py-4 flex justify-between items-center">
                                    <span className="font-medium text-slate-800">{kel.nama}</span>
                                    {/* Jemaat tidak ada tombol edit/hapus untuk keluarga */}
                                    <span className="text-sm text-slate-500">{kel.no_telepon || "-"}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </>
        )}
      </main>
    </div>
  );
}

export default JemaatDashboard;