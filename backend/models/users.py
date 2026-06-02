from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.config_db import Base

class Users(Base):
    __tablename__ = "users"

    id_user = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)
    id_anggota_jemaat = Column(Integer, ForeignKey("anggota_jemaat.id_anggota_jemaat", ondelete="CASCADE"), nullable=True, unique=True)

    anggota_jemaat_relations = relationship("AnggotaJemaat", back_populates="users", uselist=False)
