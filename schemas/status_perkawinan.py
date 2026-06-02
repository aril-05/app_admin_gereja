from pydantic import BaseModel
from datetime import date

class ResponseStatusPerkawinan(BaseModel):
    id_status_perkawinan: int
    status_perkawinan: str

    class Config:
        from__attributes = True

