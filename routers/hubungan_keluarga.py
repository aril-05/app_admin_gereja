

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app import config_db
from models.hubungan_keluarga import HubunganKeluarga
from schemas.hubugnan_keluarga import ResponseHubunganKeluarga


router = APIRouter(
    tags=["hubungan_keluarga"]
)

@router.get("/", response_model=list[ResponseHubunganKeluarga])
async def get_all_hubungan_keluarga(db: Session = Depends(config_db.get_db)):
    # Mengambil semua data dari tabel hubungan_keluarga lewat ORM
    statement = select(HubunganKeluarga)
    result = await db.execute(statement)
    data = result.scalars().all()
    return data