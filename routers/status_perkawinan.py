from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session  
from sqlalchemy import select
from app import config_db
from models.status_perkawinan import StatusPerkawinan
from schemas.status_perkawinan import ResponseStatusPerkawinan


router = APIRouter(
    tags=["status_perkawinan"]
)

@router.get("/", response_model=list[ResponseStatusPerkawinan])
async def get_all_status_perkawinan(db: Session = Depends(config_db.get_db)):
    statement = select(StatusPerkawinan)
    result = await db.execute(statement)
    data = result.scalars().all()
    return data