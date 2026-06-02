from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.config_db import Base

class SektorPelayanan(Base):
    __tablename__ = "sektor_pelayanan"

    id_sektor = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nama_sektor = Column(String, nullable=False)
    keluarga = relationship("Keluarga", back_populates="sektor_pelayanan_relations")
