import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AdminDashboard() {
  const [anggotaList, setAnggotaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    fetchSemuaAnggota();
  }, []);

  const fetchSemuaAnggota = async () => {
    try {
      const response = await api.get("/anggota"); 
      setAnggotaList(response.data);
    } catch (err) {
      console.error("Gagal mengambil data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // --- FUNGSI TOMBOL AKSI ---

  const handleBukaFormTambah = () => {
    navigate("/admin/tambah_anggota");
  };

  const handleBukaFormEdit = (anggota) => {
    navigate("/admin/edit_anggota", { state : {dataAnggota : anggota}});
  };

  const handleDelete = async (id) => {
    if(window.confirm("Yakin ingin menghapus anggota ini? Data yang terhapus tidak bisa dikembalikan!")) {
        try {
            await api.delete(`/anggota/${id}`);
            alert("Data berhasil dihapus!");
            fetchSemuaAnggota();
        } catch (err) {
            alert("Gagal menghapus data. Pastikan Backend sudah siap.");
            console.error(err);
        }
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 relative">
      <nav className="bg-slate-900 text-white border-b border-slate-800 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-extrabold tracking-tight">SIAK Gereja - Panel Admin</span>
          <button onClick={handleLogout} className="bg-red-500/10 text-red-400 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-red-500 hover:text-white transition-all">Keluar</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Direktori Jemaat</h2>
          <button onClick={handleBukaFormTambah} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all">
            + Tambah Anggota
          </button>
        </header>

        {loading ? (
           <p className="text-center py-10">Memuat data...</p>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Nama Lengkap</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">No. Telepon</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {anggotaList.map((anggota) => (
                  <tr key={anggota.id_anggota_jemaat} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{anggota.nama}</td>
                    <td className="px-6 py-4 text-slate-600">{anggota.no_telepon || "-"}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => handleBukaFormEdit(anggota)} className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md text-sm font-medium">Edit</button>
                      <button onClick={() => handleDelete(anggota.id_anggota_jemaat)} className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-md text-sm font-medium">Hapus</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;