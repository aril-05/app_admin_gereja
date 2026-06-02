from pydantic import BaseModel
from datetime import date

class ResponsePekerjaan(BaseModel):
    id_pekerjaan: int
    pekerjaan: str

    class Config:
        from_attributes = True

