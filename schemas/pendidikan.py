from pydantic import BaseModel
from datetime import date

class ResponsePendidikan(BaseModel):
    id_pendidikan: int
    jenjang_pendidikan: str

    class Config:
        from_attributes = True

