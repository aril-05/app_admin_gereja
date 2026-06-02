from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session  
from sqlalchemy import select
from app import config_db
from schemas.sektor_pelayanan import ResponseSektorPelayanan
from models.sektor_pelayanan import SektorPelayanan

router = APIRouter(
    tags=["sektor_pelayanan"]
)

@router.get("/", response_model=list[ResponseSektorPelayanan])
async def get_all_sektor_pelayanan(db: Session = Depends(config_db.get_db)):
    statement = select(SektorPelayanan)
    result = await db.execute(statement)
    data = result.scalars().all()
    return data