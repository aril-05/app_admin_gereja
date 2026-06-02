from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select

from app import config_db
from schemas.pekerjaan import ResponsePekerjaan
from models.pekerjaan import Pekerjaan


router = APIRouter(
    tags=["pekerjaan"]
)

@router.get("/", response_model=list[ResponsePekerjaan])
async def get_all_pekerjaan(db: Session = Depends(config_db.get_db)):
    # Mengambil semua data dari tabel pekerjaan lewat ORM
    statement = select(Pekerjaan)
    result = await db.execute(statement)
    data = result.scalars().all()
    return data