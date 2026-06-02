from pydantic import BaseModel
from datetime import date

class ResponseStatusJemaat(BaseModel):
    id_status: int
    status_jemaat: str

    class Config:
        from_attributes = True

