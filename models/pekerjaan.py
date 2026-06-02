from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.config_db import Base

class Pekerjaan(Base):
    __tablename__ = "pekerjaan"

    id_pekerjaan = Column(Integer, primary_key=True, index=True, autoincrement=True)
    pekerjaan = Column(String, nullable=False)

    anggota_jemaat = relationship("AnggotaJemaat", back_populates="pekerjaan_relations")