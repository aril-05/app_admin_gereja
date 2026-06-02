from pydantic import BaseModel
from datetime import date
from alembic.environment import Optional

class ResponseKeluarga(BaseModel):
    id_keluarga: int
    nomor_kartu:  Optional[str] = None
    nama_keluarga: Optional[str] = None
    alamat: Optional[str] = None
    tanggal_daftar: Optional[date] = None
    id_sektor: int

    class Config:
        from_attributes = True

class CreateKeluarga(BaseModel):
    nomor_kartu: str
    nama_keluarga: str
    alamat:Optional[str] = None
    tanggal_daftar: Optional[date] = None
    id_sektor: int

class EditKeluarga(BaseModel):
    nomor_kartu: Optional[str] = None
    nama_keluarga: Optional[str] = None
    alamat: Optional[str] = None
    tanggal_daftar: Optional[date] = None
    id_sektor: Optional[int] = None