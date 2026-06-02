import asyncio
from sqlalchemy import select
from app.config_db import SessionLocal
from models.users import Users
from app.security import get_password_hash

# Tambahkan kata 'async' di depan fungsi
async def buat_super_admin():
    db = SessionLocal()
    
    try:
        # 1. Cara baru mencari data di Async SQLAlchemy (pakai select dan await execute)
        pencarian = select(Users).filter(Users.username == "admin_gereja")
        hasil = await db.execute(pencarian)
        admin_ada = hasil.scalars().first()
        
        if admin_ada:
            print("Akun admin_gereja sudah ada di database!")
            return

        # 2. Buat Password yang Diacak (Hash)
        password_asli = "admin1234"
        password_acak = get_password_hash(password_asli)

        # 3. Masukkan ke tabel Users
        admin_baru = Users(
            username="admin_gpibpondokungu",
            password=password_acak,
            role="admin",
            id_anggota_jemaat=None
        )
        
        db.add(admin_baru)
        
        # 4. Wajib pakai 'await' untuk menyimpan
        await db.commit()
        
        print(f"BERHASIL! Akun Admin tercipta.")
        print(f"Username : admin_gereja")
        print(f"Password : {password_asli}")

    except Exception as e:
        print("Terjadi kesalahan:", e)
        # Wajib pakai 'await' untuk rollback
        await db.rollback()
    finally:
        # Wajib pakai 'await' untuk menutup koneksi
        await db.close()

if __name__ == "__main__":
    # Karena fungsinya async, kita harus menjalankannya lewat asyncio
    asyncio.run(buat_super_admin())