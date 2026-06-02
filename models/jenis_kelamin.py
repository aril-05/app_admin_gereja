from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.config_db import Base

class JenisKelamin(Base):
    __tablename__ = "jenis_kelamin"

    id_jenis_kelamin = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nama_jenis_kelamin = Column(String, nullable=False)

    anggota_jemaat = relationship("AnggotaJemaat", back_populates="jenis_kelamin_relations")