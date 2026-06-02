from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select
from app import config_db
from app.security import get_password_hash
from models.anggota_jemaat import AnggotaJemaat
from schemas.anggota_jemaat import CreateAnggota, EditAnggota, ResponseAnggota
from models.users import Users
from models.keluarga import Keluarga
from app.security import get_current_user


router = APIRouter(
    tags=["anggota"]
)


@router.get("/", response_model=list[ResponseAnggota])
async def get_all_anggota_jemaat(db: Session = Depends(config_db.get_db), current_user: Users = Depends(get_current_user)):
    statement = select(AnggotaJemaat).options(
        joinedload(AnggotaJemaat.keluarga_relations).joinedload(Keluarga.sektor_pelayanan_relations)
    )
    result = await db.execute(statement)
    data = result.scalars().all()
    print(f"DEBUG DATA: {data}")  # Cetak di terminal untuk melihat isinya
    print (f"DEBUG JUMLAH DATA: {len(data)}")  # Cetak jumlah data yang diambil
    return data

@router.get("/{id_anggota}", response_model=ResponseAnggota)
async def get_anggota_by_id(id_anggota: int, db: Session = Depends(config_db.get_db)):
    statement = select(AnggotaJemaat).where(AnggotaJemaat.id_anggota_jemaat == id_anggota)
    result = await db.execute(statement)
    anggota = result.scalar_one_or_none()
    if anggota is None:
        return HTTPException(status_code=404, detail="Anggota tidak ditemukan")
    return anggota

@router.post("/", response_model=ResponseAnggota)
async def create_anggota(data: CreateAnggota, db: Session = Depends(config_db.get_db)):
    username_baru = data.nama.replace(" ", "_").lower()
    password_mentah = data.tanggal_lahir.strftime("%Y%m%d")
    password_aman = get_password_hash(password_mentah)
    new_user = Users(
        username=username_baru,
        password=password_aman,
        role="jemaat",
    )
    new_anggota = AnggotaJemaat(
        nama=data.nama,
        id_keluarga=data.id_keluarga,
        id_jenis_kelamin=data.id_jenis_kelamin,
        id_hubungan_keluarga=data.id_hubungan_keluarga,
        id_status_perkawinan=data.id_status_perkawinan,
        tanggal_lahir=data.tanggal_lahir,
        tanggal_baptis=data.tanggal_baptis,
        tanggal_sidi=data.tanggal_sidi,
        tanggal_pernikahan=data.tanggal_pernikahan,
        id_pendidikan=data.id_pendidikan,
        id_pekerjaan=data.id_pekerjaan,
        id_status_jemaat=data.id_status_jemaat,
        no_telepon=data.no_telepon
    )
    new_anggota.users = new_user
    db.add(new_anggota)
    await db.commit()
    await db.refresh(new_anggota)
    return new_anggota

@router.delete("/delete/{id_anggota}")
async def delete_anggota(id_anggota: int, db : Session = Depends(config_db.get_db)):
    statement = select(AnggotaJemaat).where(AnggotaJemaat.id_anggota_jemaat==id_anggota)
    result = await db.execute(statement)
    anggota = result.scalar_one_or_none()
    if anggota is None:
        return {"message": "Anggota tkda ditemukan"}
    await db.delete(anggota)
    await db.commit()
    return 

@router.put("/{id_anggota}",response_model=ResponseAnggota)
async def update_anggota(id_anggota:int, data: EditAnggota, db: Session = Depends(config_db.get_db)):
    statement = select(AnggotaJemaat).where(AnggotaJemaat.id_anggota_jemaat==id_anggota)
    result = await db.execute(statement)
    anggota = result.scalar_one_or_none()
    if anggota is None:
        return {"message": "anggota tidak ditemukan"}
    anggota.nama = data.nama
    anggota.id_keluarga = data.id_keluarga
    anggota.id_jenis_kelamin = data.id_jenis_kelamin
    anggota.id_hubugan_keluarga = data.id_hubungan_keluarga
    anggota.id_status_perkawinan = data.id_status_perkawinan
    anggota.tanggal_lahir = data.tanggal_lahir
    anggota.tangal_baptis = data.tanggal_baptis
    anggota.tanggal_sidi = data.tanggal_sidi
    anggota.tanggal_pernikahan = data.tanggal_pernikahan
    anggota.id_pendidikan = data.id_pendidikan
    anggota.id_pekerjaan = data.id_pekerjaan
    anggota.id_status_jemaat = data.id_status_jemaat
    anggota.no_telepon = data.no_telepon
    await db.commit()
    await db.refresh(anggota)
    return anggota
