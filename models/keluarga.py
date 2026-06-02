from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.config_db import Base

class Keluarga(Base):
    __tablename__ = "keluarga"

    id_keluarga = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nomor_kartu = Column(String, nullable=False)
    nama_keluarga = Column(String, nullable=False)
    alamat = Column(String, nullable=False)
    tanggal_daftar = Column(Date, nullable=False)
    id_sektor = Column(Integer, ForeignKey("sektor_pelayanan.id_sektor"), nullable=False)
    sektor_pelayanan_relations = relationship("SektorPelayanan", back_populates="keluarga")

    anggota_jemaat = relationship("AnggotaJemaat", back_populates="keluarga_relations")


