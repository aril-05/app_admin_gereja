import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import FormAnggota from "../components/form_anggota.jsx";

function TambahAnggotaPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const dataBawaan = location.state?.dataAnggota || null; // Cek apakah ada data yang dibawa dari halaman sebelumnya
  const isEditMode = !!dataBawaan; // jika ada data langsung dalam mode edit


  const handleSimpanData = async (submittedData) => {
    try {
      if (isEditMode) {
        await api.put(`/anggota/${dataBawaan.id_anggota_jemaat}`, submittedData);
        alert ("Data berhasil diupdate!");
      } else {
      await api.post("/anggota", submittedData);
      alert("Anggota baru berhasil ditambahkan!");
    }
      navigate("/dashboard"); // Kembali ke dashboard setelah sukses
    } catch (err) {
      alert("Gagal menyimpan data. Pastikan Backend sudah menyala.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-2">
      <div className="max-w-5xl mx-auto px-1">
        
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-900 text-white">
            <h1 className="text-2xl font-bold">{isEditMode ? "Edit" : "Tambah"} Anggota Jemaat Baru</h1>
            <p className="text-slate-400 text-sm">Silakan lengkapi seluruh informasi jemaat di bawah ini.</p>
          </div>
          
          {/* Kita gunakan FormAnggota tapi tanpa modal (selalu terbuka) */}
          <div className="px-8 pt-0 pb-8">
             <FormAnggota 
                isOpen={true} 
                onClose={() => navigate("/dashboard")}
                onSubmit={handleSimpanData}
                initialData = {dataBawaan}
                isEditMode = {isEditMode}
                role="admin"
             />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TambahAnggotaPage;