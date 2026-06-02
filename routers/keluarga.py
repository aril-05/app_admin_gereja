
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select
from app import config_db
from models.keluarga import Keluarga
from schemas.keluarga import ResponseKeluarga, CreateKeluarga, EditKeluarga


router = APIRouter(
    tags=["keluarga"]
)

@router.get("/", response_model=list[ResponseKeluarga])
async def get_all_keluarga(db: Session = Depends(config_db.get_db)):
    # Mengambil semua data dari tabel keluarga lewat ORM
    statement = select(Keluarga)
    result = await db.execute(statement)
    data = result.scalars().all()
    return data

@router.get("/{id_keluarga}", response_model=ResponseKeluarga)
async def get_keluarga_by_id(id_keluarga: int, db: Session = Depends(config_db.get_db)):
    statement = select(Keluarga).where(Keluarga.id_keluarga == id_keluarga)
    result = await db.execute(statement)
    keluarga = result.scalar_one_or_none()
    if keluarga is None:
        return HTTPException(status_code=404, detail="Keluarga tidak ditemukan")
    return keluarga

@router.post("/", response_model=CreateKeluarga)
async def create_keluarga(keluarga: CreateKeluarga, db: Session = Depends(config_db.get_db)):
    # Membuat objek Keluarga baru
    new_keluarga = Keluarga(
        nomor_kartu=keluarga.nomor_kartu,
        nama_keluarga=keluarga.nama_keluarga,
        alamat=keluarga.alamat,
        tanggal_daftar=keluarga.tanggal_daftar,
        id_sektor=keluarga.id_sektor
    )
    # Menyimpan ke database
    db.add(new_keluarga)
    await db.commit()
    await db.refresh(new_keluarga)
    return new_keluarga

@router.put("/{id_keluarga}", response_model=EditKeluarga)
async def update_keluarga(id_keluarga: int, keluarga: EditKeluarga, db: Session = Depends(config_db.get_db)):
    statement = select(Keluarga).where(Keluarga.id_keluarga == id_keluarga)
    result = await db.execute(statement)
    existing_keluarga = result.scalar_one_or_none()
    if existing_keluarga is None:
        return HTTPException(status_code=404, detail="Keluarga tidak ditemukan")
    existing_keluarga.nomor_kartu = keluarga.nomor_kartu
    existing_keluarga.nama_keluarga = keluarga.nama_keluarga
    existing_keluarga.alamat = keluarga.alamat
    existing_keluarga.tanggal_daftar = keluarga.tanggal_daftar
    existing_keluarga.id_sektor = keluarga.id_sektor

    await db.commit()
    await db.refresh(existing_keluarga)
    return existing_keluarga

@router.delete("/delete/{id_keluarga}")
async def delete_keluarga(id_keluarga: int, db: Session = Depends(config_db.get_db)):
    statement = select(Keluarga).where(Keluarga.id_keluarga == id_keluarga)
    result = await db.execute(statement)
    keluarga = result.scalar_one_or_none()
    if keluarga is None:
        return {"message": "Keluarga tidak ditemukan"}
    await db.delete(keluarga)
    await db.commit()
    return {"message": "Keluarga berhasil dihapus"}