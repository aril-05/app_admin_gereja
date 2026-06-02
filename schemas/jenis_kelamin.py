from pydantic import BaseModel
from datetime import date

class ResponseJenisKelamin(BaseModel):
    id_jenis_kelamin: int
    nama_jenis_kelamin: str

    class Config:
        from_attributes = True

