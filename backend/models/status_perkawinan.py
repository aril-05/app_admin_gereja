from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.config_db import Base

class StatusPerkawinan(Base):
    __tablename__ = "status_perkawinan"

    id_status_perkawinan = Column(Integer, primary_key=True, index=True, autoincrement=True)
    status_perkawinan = Column(String, nullable=False)

    anggota_jemaat=relationship("AnggotaJemaat", back_populates="status_perkawinan_relations")