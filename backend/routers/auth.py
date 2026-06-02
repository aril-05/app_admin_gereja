from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app import config_db
from models.anggota_jemaat import AnggotaJemaat
from models.users import Users
from app.security import verify_password, create_access_token, get_password_hash

router = APIRouter(
    tags=["auth"],
)

@router.post("/")
async def login(from_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(config_db.get_db)):
    statement = select(Users).where(Users.username == from_data.username)
    result = await db.execute(statement)
    user = result.scalars().first()
    if not user or not verify_password(from_data.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="username atau password salah", headers={"WWW-Authenticate": "Bearer"})

    access_token = create_access_token(data={"sub": user.username,"role": user.role})
    id_keluarga = None
    if user.id_anggota_jemaat:
        pencarian_anggota = select(AnggotaJemaat).filter(AnggotaJemaat.id_anggota_jemaat == user.id_anggota_jemaat)
        result = await db.execute(pencarian_anggota)
        anggota = result.scalar_one_or_none()
        if anggota:
            id_keluarga = anggota.id_keluarga
    return {"access_token" : access_token, 
            "token_type" : "bearer",
            "role": user.role,
            "id_anggota": user.id_anggota_jemaat,
            "id_keluarga": id_keluarga,
            }