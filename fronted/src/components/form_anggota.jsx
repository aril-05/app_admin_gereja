import { useState, useEffect } from "react";
import api from "../api";
import ModalTambahKeluarga from "./tambah_keluarga.jsx";

function FormAnggota({ isOpen, onClose, onSubmit, initialData, isEditMode, role }) {
  // 1. STATE FORM UTAMA
  const [formData, setFormData] = useState({
    nama: "", no_telepon: "", tanggal_lahir: "", tanggal_baptis: "", 
    tanggal_sidi: "", tanggal_pernikahan: "", 
    id_keluarga: "", id_jenis_kelamin: "", id_hubungan_keluarga: "", 
    id_status_perkawinan: "", id_pendidikan: "", id_pekerjaan: "", id_status_jemaat: ""
  });

  // 2. STATE UNTUK SEMUA DROPDOWN
  const [listJenisKelamin, setListJenisKelamin] = useState([]);
  const [listPendidikan, setListPendidikan] = useState([]);
  const [listPekerjaan, setListPekerjaan] = useState([]);
  const [listStatusJemaat, setListStatusJemaat] = useState([]);
  const [listStatusPerkawinan, setListStatusPerkawinan] = useState([]);
  const [listKeluarga, setListKeluarga] = useState([]);
  const [listHubunganKeluarga, setListHubunganKeluarga] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isKeluargaModalOpen, setIsKeluargaModalOpen] = useState(false);

  // 3. AMBIL SEMUA DATA REFERENSI SAAT FORM DIBUKA
  useEffect(() => {
    const fetchSemuaReferensi = async () => {
      setIsLoadingData(true);
      try {
        // Promise.all membuat React mengambil semua data berbarengan! (Super Cepat)
        const [resJK, resPend, resPek, resSJ, resSP, resKel, resHK] = await Promise.all([
          api.get("/jenis_kelamin"),
          api.get("/pendidikan"),
          api.get("/pekerjaan"),
          api.get("/status_jemaat"),
          api.get("/status_perkawinan"),
          api.get("/keluarga"),
          api.get("/hubungan_keluarga")
        ]);

        setListJenisKelamin(resJK.data);
        setListPendidikan(resPend.data);
        setListPekerjaan(resPek.data);
        setListStatusJemaat(resSJ.data);
        setListStatusPerkawinan(resSP.data);
        setListKeluarga(resKel.data);
        setListHubunganKeluarga(resHK.data);
      } catch (error) {
        console.error("Gagal mengambil data dropdown:", error);
        alert("Gagal memuat beberapa pilihan data. Cek koneksi backend.");
      } finally {
        setIsLoadingData(false);
      }
    };

    if (isOpen) {
      fetchSemuaReferensi();
    }
  }, [isOpen]);

  // 4. ISI DATA JIKA SEDANG MODE EDIT
  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.nama || "",
        no_telepon: initialData.no_telepon || "",
        tanggal_lahir: initialData.tanggal_lahir || "", 
        tanggal_baptis: initialData.tanggal_baptis || "",
        tanggal_sidi: initialData.tanggal_sidi || "",
        tanggal_pernikahan: initialData.tanggal_pernikahan || "",
        id_keluarga: initialData.id_keluarga || "",
        id_jenis_kelamin: initialData.id_jenis_kelamin || "",
        id_hubungan_keluarga: initialData.id_hubungan_keluarga || "",
        id_status_perkawinan: initialData.id_status_perkawinan || "",
        id_pendidikan: initialData.id_pendidikan || "",
        id_pekerjaan: initialData.id_pekerjaan || "",
        id_status_jemaat: initialData.id_status_jemaat || ""
      });
    } else {
      setFormData({
        nama: "", no_telepon: "", tanggal_lahir: "", tanggal_baptis: "", 
        tanggal_sidi: "", tanggal_pernikahan: "", id_keluarga: "", 
        id_jenis_kelamin: "", id_hubungan_keluarga: "", id_status_perkawinan: "", 
        id_pendidikan: "", id_pekerjaan: "", id_status_jemaat: ""
      });
    }
  }, [initialData]);

const handleKeluargaBerhasilDitambah = async (idKeluargaBaru) => {
      setIsKeluargaModalOpen(false); // Tutup modalnya
      
      // Refresh daftar dropdown keluarga
      try {
        const res = await api.get("/keluarga");
        setListKeluarga(res.data);
      } catch (err) {
        console.error("Gagal refresh data keluarga:", err);
      }
      
      // Otomatis pilih keluarga yang baru ditambahkan
      setFormData({ ...formData, id_keluarga: idKeluargaBaru });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataYangDikirim = { ...formData };
    Object.keys(dataYangDikirim).forEach(key => {
        if (dataYangDikirim[key] === "") {
            dataYangDikirim[key] = null;
        }
        else if (key.startsWith("id_") && dataYangDikirim[key] !== null) {
            dataYangDikirim[key] = parseInt(dataYangDikirim[key]);
        }
    });
    onSubmit(dataYangDikirim);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="w-full">
        
        {/* WADAH LOADING: Tingginya dikunci (h-14) agar form di bawahnya tidak melompat */}
        <div className=" mb-4"> 
          {isLoadingData && (
            <div className="p-4 bg-blue-50/50 border border-blue-100 text-blue-600 rounded-xl text-sm font-medium animate-pulse flex items-center gap-4">
              <svg className="animate-spin h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Sedang menyiapkan formulir...
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* --- SEKSI 1: DATA PRIBADI --- */}
              <div className="space-y-8">
                  <div>
                      <label className="block text-sm font-semibold text-slate-600 mb-1.5 ">Nama Lengkap *</label>
                      <input type="text" name="nama" value={formData.nama || ""} onChange={handleChange} required disabled={role === "jemaat"} className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${role === "jemaat" ? "bg-slate-100 text-slate-500 cursor-not-allowed" : ""}`} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-semibold text-slate-600 mb-1.5">No. Telepon</label>
                          <input type="text" name="no_telepon" value={formData.no_telepon || ""} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                      <div>
                          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Tanggal Lahir *</label>
                          <input type="date" name="tanggal_lahir" value={formData.tanggal_lahir || ""} onChange={handleChange} required className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                      </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Jenis Kelamin</label>
                          <select name="id_jenis_kelamin" value={formData.id_jenis_kelamin || ""} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer">
                              <option value="">-- Pilih --</option>
                              {listJenisKelamin.map(item => (
                                  <option key={item.id_jenis_kelamin} value={item.id_jenis_kelamin}>{item.nama_jenis_kelamin}</option>
                              ))}
                          </select>
                      </div>
                      <div>
                          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Pendidikan</label>
                          <select name="id_pendidikan" value={formData.id_pendidikan || ""} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer">
                              <option value="">-- Pilih --</option>
                              {listPendidikan.map(item => (
                                  <option key={item.id_pendidikan} value={item.id_pendidikan}>{item.jenjang_pendidikan}</option>
                              ))}
                          </select>
                      </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Pekerjaan</label>
                          <select name="id_pekerjaan" value={formData.id_pekerjaan || ""} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer">
                              <option value="">-- Pilih --</option>
                              {listPekerjaan.map(item => (
                                  <option key={item.id_pekerjaan} value={item.id_pekerjaan}>{item.pekerjaan}</option>
                              ))}
                          </select>
                      </div>
                      <div>
                          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Status Jemaat</label>
                          <select name="id_status_jemaat" value={formData.id_status_jemaat || ""} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white cursor-pointer">
                              <option value="">-- Pilih --</option>
                              {listStatusJemaat.map(item => (
                                  <option key={item.id_status} value={item.id_status}>{item.status_jemaat}</option>
                              ))}
                          </select>
                      </div>
                  </div>
              </div>

              {/* --- SEKSI 2: KELUARGA & GEREJAWI --- */}
              <div className="space-y-12">
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1.5">Keluarga (KK)</label>
                    <div className="flex gap-2">
                        <select 
                            name="id_keluarga" 
                            value={formData.id_keluarga || ""} 
                            onChange={handleChange} 
                            className="flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-white cursor-pointer"
                        >
                            <option value="">-- Pilih Keluarga --</option>
                            {listKeluarga.map(item => (
                                <option key={item.id_keluarga} value={item.id_keluarga}>Kel. {item.nama_keluarga}</option>
                            ))}
                        </select>
                        
                        {/* Tombol Tambah Cepat */}
                        <button 
                            type="button"
                            onClick={() => setIsKeluargaModalOpen(true)}
                            className="bg-green-100 text-green-700 px-3 rounded-xl hover:bg-green-200 transition-all font-bold text-xl"
                            title="Tambah Keluarga Baru"
                        >
                            +
                        </button>
                    </div>
                </div>

                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Status Perkawinan</label>
                          <select name="id_status_perkawinan" value={formData.id_status_perkawinan || ""} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-white cursor-pointer">
                              <option value="">-- Pilih --</option>
                              {listStatusPerkawinan.map(item => (
                                  <option key={item.id_status_perkawinan} value={item.id_status_perkawinan}>{item.status_perkawinan}</option>
                              ))}
                          </select>
                      </div>
                      <div>
                          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Hub. Keluarga</label>
                          <select name="id_hubungan_keluarga" value={formData.id_hubungan_keluarga || ""} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-white cursor-pointer">
                              <option value="">-- Pilih --</option>
                              {listHubunganKeluarga.map(item => (
                                  <option key={item.id_hubungan_keluarga} value={item.id_hubungan_keluarga}>{item.hubungan_keluarga}</option>
                              ))}
                          </select>
                      </div>
                  </div>

                  <div>
                      <label className="block text-sm font-semibold text-slate-600 mb-1.5">Tanggal Pernikahan</label>
                      <input type="date" name="tanggal_pernikahan" value={formData.tanggal_pernikahan || ""} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Tanggal Baptis</label>
                          <input type="date" name="tanggal_baptis" value={formData.tanggal_baptis || ""} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
                      </div>
                      <div>
                          <label className="block text-sm font-semibold text-slate-600 mb-1.5">Tanggal Sidi</label>
                          <input type="date" name="tanggal_sidi" value={formData.tanggal_sidi || ""} onChange={handleChange} className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none" />
                      </div>
                  </div>
              </div>

            </div>
            
            <div className="pt-6 mt-6 border-t border-slate-200 flex gap-3 justify-end">
              <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-all">
                Batal
              </button>
              <button type="submit" disabled={isLoadingData} className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {isEditMode ? "Simpan Perubahan" : "Tambahkan"}
              </button>
            </div>
          </form>
        </div>

        {/* MODAL DIPANGGIL DI LUAR DIV UTAMA FORM */}
        <ModalTambahKeluarga 
            isOpen={isKeluargaModalOpen}
            onClose={() => setIsKeluargaModalOpen(false)}
            onSuccess={handleKeluargaBerhasilDitambah}
        />
      </>
    );
  }

export default FormAnggota;