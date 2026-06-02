from pydantic import BaseModel
from datetime import date

class ResponseSektorPelayanan(BaseModel):
    id_sektor: int
    nama_sektor: str

    class Config:
        from_attributes = True

