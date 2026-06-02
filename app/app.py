from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import anggota_jemaat, hubungan_keluarga, jenis_kelamin, keluarga, pekerjaan, pendidikan, status_perkawinan, status_jemaat, auth, sektor_pelayanan
from app.config_db import engine, Base
import models

app = FastAPI()

origins = [ 
    "http://localhost:5173",
    "https://localhost:3000",
    "http://127.0.0.1:5173",
    "localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

app.include_router(anggota_jemaat.router, prefix="/anggota", tags=["anggota"])
app.include_router(jenis_kelamin.router, prefix="/jenis_kelamin", tags=["jenis_kelamin"])
app.include_router(hubungan_keluarga.router, prefix="/hubungan_keluarga", tags=["hubungan_keluarga"])
app.include_router(pendidikan.router, prefix="/pendidikan", tags=["pendidikan"])
app.include_router(pekerjaan.router, prefix="/pekerjaan", tags=["pekerjaan"])
app.include_router(status_perkawinan.router, prefix="/status_perkawinan", tags=["status_perkawinan"])
app.include_router(status_jemaat.router, prefix="/status_jemaat", tags=["status_jemaat"])
app.include_router(keluarga.router, prefix="/keluarga", tags=["keluarga"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(sektor_pelayanan.router, prefix="/sektor_pelayanan", tags=["sektor_pelayanan"])