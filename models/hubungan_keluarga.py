from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.config_db import Base

class HubunganKeluarga(Base):
    __tablename__ = "hubungan_keluarga"

    id_hubungan_keluarga = Column(Integer, primary_key=True, index=True, autoincrement=True)
    hubungan_keluarga = Column(String, nullable=False)

    anggota_jemaat = relationship("AnggotaJemaat", back_populates="hubungan_keluarga_relations")