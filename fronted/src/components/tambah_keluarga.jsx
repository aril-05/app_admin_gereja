import { useState, useEffect } from "react";
import api from "../api";

function ModalTambahKeluarga({ isOpen, onClose, onSuccess }) {
    const [newKeluarga, setNewKeluarga] = useState({
        nomor_kartu:"",
        nama_keluarga: "",
        alamat: "",
        tanggal_daftar:"",
        id_sektor: ""
    });
    
    // 1. STATE BARU UNTUK MENYIMPAN DAFTAR SEKTOR
    const [listSektor, setListSektor] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingSektor, setIsLoadingSektor] = useState(false);

    // 2. AMBIL DATA SEKTOR SAAT MODAL DIBUKA
    useEffect(() => {
        const fetchSektor = async () => {
            setIsLoadingSektor(true);
            try {
                const res = await api.get("/sektor_pelayanan"); // Pastikan endpoint ini benar!
                setListSektor(res.data);
            } catch (err) {
                console.error("Gagal mengambil data sektor:", err);
            } finally {
                setIsLoadingSektor(false);
            }
        };

        if (isOpen) {
            fetchSektor();
        }
    }, [isOpen]);

    // Jika isOpen false, jangan render apa-apa
    if (!isOpen) return null;

    const handleSimpan = async () => {
        try {
            setIsLoading(true);
            const res = await api.post("/keluarga", newKeluarga);
            alert("Keluarga berhasil ditambahkan!");
            
            setNewKeluarga({nomor_kartu: "", nama_keluarga: "", alamat: "", tanggal_daftar: "", id_sektor: "" }); 
            onSuccess(res.data.id_keluarga); 
        } catch (err) {
            alert("Gagal menambah keluarga. Cek inputan Anda.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
            <div className="bg-white p-6 rounded-3xl shadow-2xl w-full max-w-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Tambah Keluarga Baru</h3>
                <div className="space-y-4">
                    {/* Tambahkan ini di dalam <div className="space-y-4"> */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1.5">Nomor Keluarga / KK</label>
                        <input 
                            type="text" 
                            placeholder="Masukkan nomor keluarga"
                            className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 bg-slate-50"
                            value={newKeluarga.nomor_kartu}
                            onChange={(e) => setNewKeluarga({...newKeluarga, nomor_kartu: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Nama Keluarga</label>
                        <input 
                            type="text" 
                            placeholder="Masukkan nama keluarga"
                            className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                            value={newKeluarga.nama_keluarga}
                            onChange={(e) => setNewKeluarga({...newKeluarga, nama_keluarga: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Alamat</label>
                        <textarea 
                            className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                            value={newKeluarga.alamat}
                            onChange={(e) => setNewKeluarga({...newKeluarga, alamat: e.target.value})}
                        />
                    </div>

                    {/* Tambahkan ini di dalam grid atau tumpukan form Anda */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                            Tanggal Daftar / Masuk Jemaat
                        </label>
                        <input 
                            type="date" 
                            className="w-full px-4 py-2 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500 bg-slate-50 transition-all"
                            value={newKeluarga.tanggal_daftar}
                            onChange={(e) => setNewKeluarga({...newKeluarga, tanggal_daftar: e.target.value})}
                            required
                        />
                    </div>
                    
                    {/* 3. UBAH INPUT MENJADI DROPDOWN SEKTOR */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            Sektor Pelayanan {isLoadingSektor && <span className="text-xs text-blue-500 animate-pulse">(Memuat...)</span>}
                        </label>
                        <select 
                            className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-green-500 bg-white cursor-pointer"
                            value={newKeluarga.id_sektor}
                            onChange={(e) => setNewKeluarga({...newKeluarga, id_sektor: e.target.value})}
                            disabled={isLoadingSektor}
                        >
                            <option value="">-- Pilih Sektor --</option>
                            {listSektor.map(sektor => (
                                <option key={sektor.id_sektor} value={sektor.id_sektor}>
                                    {sektor.nama_sektor} {/* Sesuaikan dengan nama kolom di database Anda */}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
                <div className="mt-6 flex gap-3 justify-end">
                    <button 
                        type="button" 
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 text-slate-500 font-semibold hover:bg-slate-100 rounded-xl"
                    >
                        Batal
                    </button>
                    <button 
                        type="button" 
                        onClick={handleSimpan}
                        disabled={isLoading}
                        className="px-4 py-2 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 disabled:opacity-50"
                    >
                        {isLoading ? "Menyimpan..." : "Simpan Keluarga"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalTambahKeluarga;