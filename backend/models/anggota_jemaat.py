from sqlalchemy import Column, Integer, String, Date, ForeignKey
from app.config_db import Base
from sqlalchemy.orm import relationship

class AnggotaJemaat(Base):
    __tablename__ = "anggota_jemaat"

    id_anggota_jemaat = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nama = Column(String, nullable=False)

    keluarga_relations = relationship("Keluarga", back_populates="anggota_jemaat")
    id_keluarga = Column(Integer, ForeignKey("keluarga.id_keluarga"))

    jenis_kelamin_relations = relationship("JenisKelamin", back_populates="anggota_jemaat")
    id_jenis_kelamin = Column(Integer, ForeignKey("jenis_kelamin.id_jenis_kelamin"))
    
    hubungan_keluarga_relations = relationship("HubunganKeluarga", back_populates="anggota_jemaat")
    id_hubungan_keluarga = Column(Integer, ForeignKey("hubungan_keluarga.id_hubungan_keluarga"))
    
    status_perkawinan_relations = relationship("StatusPerkawinan", back_populates="anggota_jemaat")
    id_status_perkawinan = Column(Integer, ForeignKey("status_perkawinan.id_status_perkawinan"))
    
    tanggal_lahir = Column(Date, nullable=False)
    tanggal_baptis = Column(Date, nullable=True)
    tanggal_sidi = Column(Date, nullable=True)
    tanggal_pernikahan = Column(Date, nullable=True)
    
    pendidikan_relations = relationship("Pendidikan", back_populates="anggota_jemaat")
    id_pendidikan = Column(Integer, ForeignKey("pendidikan.id_pendidikan")) 
    
    pekerjaan_relations = relationship("Pekerjaan", back_populates="anggota_jemaat")  
    id_pekerjaan = Column(Integer, ForeignKey("pekerjaan.id_pekerjaan"))

    status_jemaat_relations = relationship("StatusJemaat", back_populates="anggota_jemaat")
    id_status_jemaat = Column(Integer, ForeignKey("status_jemaat.id_status"))

    no_telepon = Column(String, nullable=True)

    users = relationship("Users", back_populates="anggota_jemaat_relations", uselist=False, cascade="all, delete-orphan")
    