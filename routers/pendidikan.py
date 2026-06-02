from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from app import config_db
from models.pendidikan import Pendidikan
from schemas.pendidikan import ResponsePendidikan

router = APIRouter(
    tags=["pendidikan"]
)
@router.get("/", response_model=list[ResponsePendidikan])
async def get_all_pendidikan(db: Session = Depends(config_db.get_db)):
    statement = select(Pendidikan)
    result = await db.execute(statement)
    data = result.scalars().all()
    if data is None:
        return ("Data tidak ditemukan")
    return data