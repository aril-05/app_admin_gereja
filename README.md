# SIAJ Gereja - Sistem Informasi Anggota Jemaat

A full-stack **Church Member Information System** built for manage congregation data, family records, and financial transactions digitally.

> **⚠️ Status: In Active Development**
>
> This project is currently **still under active development** and will continue to be developed independently. Features, documentation, and code structure may change as the project evolves. Some planned features are not yet fully implemented.

---

## Features

- **Role-Based Access Control** — Two user roles: **Admin** (full management) and **Jemaat** (congregation member, view-only profile)
- **Member Management (CRUD)** — Add, edit, view, and delete congregation members with detailed personal, family, and church-related information
- **Family Card Management** — Group members under family units with family card numbers, addresses, and assigned ministry sectors
- **Financial Transaction System** — Record income and expense transactions with account-based balance tracking
- **JWT Authentication** — Secure login with token-based session management and bcrypt password hashing
- **Auto Account Creation** — New members automatically receive a login account (username from name, default password from birthdate)
- **Responsive UI** — Modern, clean interface built with Tailwind CSS, optimized for desktop and mobile

## Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| **Python 3.14** | Programming language |
| **FastAPI** | Async REST API framework |
| **SQLAlchemy 2.0** | ORM (async mode) |
| **PostgreSQL** | Relational database |
| **asyncpg** | Async PostgreSQL driver |
| **PyJWT** | JWT token creation & validation |
| **Passlib + bcrypt** | Password hashing |
| **Uvicorn** | ASGI server |
| **Pydantic** | Data validation & serialization |

### Frontend

| Technology | Purpose |
|---|---|
| **React 18** | UI library |
| **Vite** | Build tool & dev server |
| **React Router v6** | Client-side routing with protected routes |
| **Axios** | HTTP client with request interceptors |
| **Tailwind CSS** | Utility-first CSS framework |

## Project Structure

```
proyek_gereja/
├── backend/
│   ├── app/
│   │   ├── app.py              # FastAPI app initialization & router registration
│   │   ├── config_db.py        # Async database engine & session config
│   │   ├── security.py         # JWT auth, password hashing, OAuth2
│   │   └── services.py         # Business logic (transaction & balance calc)
│   ├── models/                 # SQLAlchemy ORM models
│   │   ├── anggota_jemaat.py   # Church member model
│   │   ├── keluarga.py         # Family card model
│   │   ├── users.py            # User account model
│   │   ├── transaksi.py        # Financial transaction model
│   │   ├── akun.py             # Financial account model
│   │   ├── kategori.py         # Transaction category model
│   │   ├── sektor_pelayanan.py # Ministry sector model
│   │   └── ...                 # Reference data models
│   ├── routers/                # FastAPI route handlers
│   │   ├── auth.py             # Login endpoint
│   │   ├── anggota_jemaat.py   # Member CRUD endpoints
│   │   ├── keluarga.py         # Family endpoints
│   │   ├── transaksi.py        # Transaction endpoints
│   │   └── ...                 # Reference data endpoints
│   ├── schemas/                # Pydantic request/response schemas
│   ├── main.py                 # Application entry point
│   ├── buat_admin.py           # Admin account seeder script
│   └── pyproject.toml          # Python dependencies (uv)
└── fronted/
    ├── src/
    │   ├── components/
    │   │   ├── form_anggota.jsx    # Reusable member form (add/edit)
    │   │   └── tambah_keluarga.jsx # Modal for adding new family
    │   ├── pages/
    │   │   ├── login_pages.jsx     # Login page
    │   │   ├── dashboard.jsx       # Role-based dashboard router
    │   │   ├── admin_dashboard.jsx # Admin panel with member table
    │   │   ├── jemaat_dashboard.jsx# Member profile & family view
    │   │   └── tambah_anggota.jsx  # Add/edit member page
    │   ├── api.js                  # Axios instance with auth interceptor
    │   ├── App.jsx                 # Root component & routing
    │   └── main.jsx                # React entry point
    ├── package.json
    └── vite.config.js
```

## Database Schema

The system uses a normalized relational schema centered around `anggota_jemaat` (church members):

```
users ──┐
        ├── anggota_jemaat ──┬── keluarga ──── sektor_pelayanan
        │   │                ├── jenis_kelamin
        │   │                ├── hubungan_keluarga
        │   │                ├── status_perkawinan
        │   │                ├── pendidikan
        │   │                ├── pekerjaan
        │   │                └── status_jemaat
        │   │
        │   └── (one-to-one with users)
        │
transaksi ──┬── kategori
            └── akun
```

## Getting Started

### Prerequisites

- **Python** 3.14+
- **Node.js** 18+
- **PostgreSQL** running locally
- **uv** (Python package manager)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies with uv
uv sync

# Create the PostgreSQL database
# (connect to psql and run)
CREATE DATABASE gereja_db;

# Start the server
python main.py
# Server runs at http://localhost:8000
```

### Create Admin Account

```bash
cd backend
python buat_admin.py
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd fronted

# Install dependencies
npm install

# Start the development server
npm run dev
# App runs at http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/` | Login (OAuth2 password flow) |
| `GET` | `/anggota/` | Get all members (auth required) |
| `GET` | `/anggota/{id}` | Get member by ID |
| `POST` | `/anggota/` | Create new member + user account |
| `PUT` | `/anggota/{id}` | Update member data |
| `DELETE` | `/anggota/delete/{id}` | Delete member |
| `GET` | `/keluarga/` | Get all families |
| `GET` | `/keluarga/{id}` | Get family members |
| `POST` | `/keluarga/` | Create new family card |
| `POST` | `/transaksi/transaksi/` | Create financial transaction |
| `GET` | `/transaksi/transaksi/saldo/{akun_id}` | Get account balance |
| `GET` | `/jenis_kelamin/` | Get gender options |
| `GET` | `/pendidikan/` | Get education levels |
| `GET` | `/pekerjaan/` | Get occupation list |
| `GET` | `/status_jemaat/` | Get member status options |
| `GET` | `/status_perkawinan/` | Get marital status options |
| `GET` | `/hubungan_keluarga/` | Get family relationship types |
| `GET` | `/sektor_pelayanan/` | Get ministry sectors |
| `GET` | `/akun/` | Get financial accounts |
| `GET` | `/kategori/` | Get transaction categories |

## Key Highlights

- **Async-first architecture** — Both database operations and API endpoints are fully asynchronous for optimal performance
- **Automatic user provisioning** — When an admin adds a new church member, a user account is automatically created with the member's name as username and birthdate as default password
- **Balance validation** — The transaction service prevents overdrafts by checking account balance before allowing expenses
- **Parallel data fetching** — The frontend uses `Promise.all` to load all dropdown reference data simultaneously for a fast form experience
- **Protected routes** — React Router guards ensure only authenticated users can access the dashboard

<img width="1588" height="766" alt="image" src="https://github.com/user-attachments/assets/4d940939-081e-4f73-a3c5-7a968fa88542" />
<img width="1597" height="770" alt="image" src="https://github.com/user-attachments/assets/4cb26fae-4296-4a8f-b1e3-67755a800942" />
<img width="1592" height="766" alt="image" src="https://github.com/user-attachments/assets/597bd05b-3a08-4676-83e7-8df7e5b7a9f7" />


This project was developed for GPIB Pondok Ungu church administration purposes.
