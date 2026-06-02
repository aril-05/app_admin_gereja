from pydantic import BaseModel
from datetime import date

class ResponseHubunganKeluarga(BaseModel):
    id_hubungan_keluarga: int
    hubungan_keluarga: str

    class Config:
        from_attributes = True

