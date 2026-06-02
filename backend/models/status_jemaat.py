from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.config_db import Base

class StatusJemaat(Base):
    __tablename__ = "status_jemaat"

    id_status = Column(Integer, primary_key=True, index=True, autoincrement=True)
    status_jemaat = Column(String, nullable=False)

    anggota_jemaat = relationship("AnggotaJemaat", back_populates="status_jemaat_relations")