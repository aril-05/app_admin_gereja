from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.config_db import Base

class Pendidikan(Base):
    __tablename__ = "pendidikan"

    id_pendidikan = Column(Integer, primary_key=True, index=True, autoincrement=True)
    jenjang_pendidikan = Column(String, nullable=False)

    anggota_jemaat = relationship("AnggotaJemaat", back_populates="pendidikan_relations")