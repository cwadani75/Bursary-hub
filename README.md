# 🎓 Bursary Hub – Fullstack Bursary Management System

![Python](https://img.shields.io/badge/Python-3.8%2B-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-3.0-black?logo=flask)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwind-css)
![SQLite](https://img.shields.io/badge/SQLite-DB-003B57?logo=sqlite)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A comprehensive bursary management platform with a **React frontend** and **Flask backend**.
It provides **user authentication, report management, bursary applications, admin dashboards, file uploads, and role-based access control**.

---

## 🚀 Features

### 🔐 Authentication & User Management

* JWT-based authentication
* Role-based access: **Admin**, **Moderator**, **Student/User**
* Profile management (with profile picture uploads)

### 📝 Report Management

* Create, read, update, delete bursary-related reports
* Track report status (open/resolved)

### 🎓 Bursary Applications

* Submit and manage bursary applications
* Admin and moderator tools to review applications

### 📊 Admin Dashboard

* Manage users and roles
* View and track reports
* Handle bursary applications

### 📧 Notifications

* Email notifications (planned in Phase 2)
* Contact form handling

### ⚡ Tech Highlights

* File uploads (profile pictures)
* Lightweight SQLite database
* Modern UI with React + Tailwind CSS

---

## 🛠️ Technology Stack

* **Backend**: Python 3.8+, Flask 3.0, SQLite, Flask-JWT-Extended, Flask-CORS, Werkzeug, Pillow
* **Frontend**: React (Vite), Tailwind CSS
* **Database**: SQLite (SQLAlchemy ORM)
* **Auth**: JWT Tokens
* **Email**: SMTP with Gmail (Phase 2)

---

## 📋 Prerequisites

* **Python 3.8+**
* **pip** (Python package manager)
* **Node.js & npm** (for frontend)

---

## ⚡ Quick Start

### 🖥️ Automated Setup (New Laptop)

Run:

```bash
./setup_new_laptop.sh
```

This will:

* ✅ Check prerequisites (Python, Node.js, npm)
* ✅ Set up backend virtual environment
* ✅ Initialize the database with tables and default admin user
* ✅ Install frontend dependencies
* ✅ Provide next steps

---

### 🔧 Manual Setup

#### Backend

```bash
cd bursary-backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python init_database.py    # Initialize database
python app.py
```

Backend runs on:
👉 `http://localhost:5000`

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
👉 `http://localhost:5173`

---

## 👤 Default Admin Accounts

* **Backend Demo Admin**

  * Email: `mainbursery@gmail.com`
  * Password: `Admin123`

* **Frontend Setup Admin**

  * Email: `admin@bursaryhub.com`
  * Password: `Admin123`

---

## 📚 API Endpoints (Backend)

### Authentication

* **POST** `/signup` → Register new user
* **POST** `/login` → Login and receive JWT
* **GET** `/profile` → Get current user profile

### User Management (Admin only)

* **GET** `/users` → List users
* **PUT** `/users/<id>` → Update user role
* **DELETE** `/users/<id>` → Delete user

### Reports

* **POST** `/reports` → Create report
* **GET** `/reports` → Get all reports (Admin/Moderator)
* **GET** `/reports/my` → Get current user’s reports
* **PUT** `/reports/<id>` → Update report status
* **DELETE** `/reports/<id>` → Delete report

### Profile Picture Upload

* **POST** `/upload-profile-picture` → Upload profile picture

---

## 📁 Project Structure

```
Bursary-hub-main/
├── bursary-backend/          # Flask backend
│   ├── app.py               # Main application
│   ├── init_database.py     # Database initialization
│   ├── database.py          # Database setup
│   ├── models.py            # Database models
│   ├── auth.py              # Authentication
│   ├── config.py            # Config (DB, JWT, etc.)
│   ├── requirements.txt     # Python dependencies
│   └── uploads/             # Profile pictures
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Pages
│   │   └── services/        # API services
│   └── package.json         # Node.js dependencies
├── setup_new_laptop.sh      # Automated setup script
├── SETUP_GUIDE.md           # Detailed manual setup
└── README.md                # This file
```

---

## 🚨 Common Issues & Fixes

### ❌ "Failed to load dashboard data"

* Run:

  ```bash
  cd bursary-backend
  python init_database.py
  python app.py
  ```

### ❌ Port Already in Use

```bash
lsof -i :5001
kill -9 <PID>
```

---

## 🔐 Role-Based Access

* **User** → Submit and view their own reports/applications
* **Moderator** → View all reports, update statuses
* **Admin** → Full access, manage users & roles

---

## 🔧 Configuration

Modify `config.py`:

* Database path
* JWT settings
* Email credentials (Phase 2)
* Upload limits

---

## 🚀 Next Steps (Phase 2)

* Email password reset
* Advanced admin dashboard
* Report analytics
* File attachments in reports
* Email notifications
* Search & filtering

---

## 🤝 Contributing

1. Fork repo
2. Create feature branch
3. Implement & test
4. Submit pull request

---

## 📄 License

Licensed under the MIT License.

---

