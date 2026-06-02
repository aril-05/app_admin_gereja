from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session  
from sqlalchemy import select
from app import config_db
from models.status_jemaat import StatusJemaat
from schemas.status_jemaat import ResponseStatusJemaat

router = APIRouter(
    tags=["status_jemaat"]
)

@router.get("/", response_model=list[ResponseStatusJemaat])
async def get_all_status_jemaat(db: Session = Depends(config_db.get_db)):
    statement = select(StatusJemaat)
    result = await db.execute(statement)
    data = result.scalars().all()
    return data