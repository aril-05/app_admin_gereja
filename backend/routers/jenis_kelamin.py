from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select

from app import config_db
from models.jenis_kelamin import JenisKelamin
from schemas.jenis_kelamin import ResponseJenisKelamin

router = APIRouter(
    tags=["jenis_kelamin"]
)

@router.get("/", response_model=list[ResponseJenisKelamin])
async def get_all_jenis_kelamin(db: Session = Depends(config_db.get_db)):
    # Mengambil semua data dari tabel jenis_kelamin lewat ORM
    statement = select(JenisKelamin)
    result = await db.execute(statement)
    data = result.scalars().all()
    return data