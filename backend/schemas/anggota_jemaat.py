from alembic.environment import Optional
from pydantic import BaseModel
from datetime import date

class ResponseAnggota(BaseModel):
    id_anggota_jemaat : int
    id_keluarga : int| None = None
    nama : str 
    id_jenis_kelamin : int | None = None
    id_hubungan_keluarga : int | None = None
    id_status_perkawinan : int | None = None
    tanggal_lahir : date
    tanggal_baptis : Optional[date] = None
    tanggal_sidi : Optional[date] = None
    tanggal_pernikahan : Optional[date] = None
    id_pendidikan : int | None = None
    id_pekerjaan : int | None = None
    id_status_jemaat : int | None = None
    no_telepon : Optional[str] = None

    class Config:
        from_attributes = True

class CreateAnggota(BaseModel):
    nama : str
    id_jenis_kelamin : int
    id_keluarga : int
    id_hubungan_keluarga : int
    id_status_perkawinan : int
    tanggal_lahir : Optional[date] = None
    tanggal_baptis : Optional[date] = None
    tanggal_sidi : Optional[date] = None
    tanggal_pernikahan : Optional[date] = None
    id_pendidikan: int
    id_pekerjaan : int
    id_status_jemaat : int
    no_telepon : Optional[str] = None

class EditAnggota(BaseModel):
    nama : Optional[str] = None
    id_jenis_kelamin : Optional[int] = None
    id_keluarga : Optional[int] = None
    id_hubungan_keluarga : Optional[int] = None
    id_status_perkawinan : Optional[int] = None
    tanggal_lahir : Optional[date] = None
    tanggal_baptis : Optional[date] = None
    tanggal_sidi : Optional[date] = None
    tanggal_pernikahan : Optional[date] = None
    id_pendidikan: Optional[int] = None
    id_pekerjaan : Optional[int] = None
    id_status_jemaat : Optional[int] = None
    no_telepon : Optional[str] = None

