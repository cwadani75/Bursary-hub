# 🎓 Bursary Hub

A comprehensive bursary management system built with React frontend and Flask backend.

## 🚀 Quick Start

### For New Laptops (After Cloning)

If you're setting up this project on a new laptop after cloning, run the automated setup script:

```bash
./setup_new_laptop.sh
```

This script will:
- ✅ Check prerequisites (Python, Node.js, npm)
- ✅ Set up the backend with virtual environment
- ✅ Initialize the database with tables and admin user
- ✅ Install frontend dependencies
- ✅ Provide next steps

### Manual Setup

If you prefer manual setup, follow the detailed guide in [SETUP_GUIDE.md](SETUP_GUIDE.md).

## 🔧 Backend Setup

```bash
cd bursary-backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python init_database.py  # Initialize database
python app.py
```

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🔐 Default Admin Credentials

- **Email**: `admin@bursaryhub.com`
- **Password**: `Admin123`

## 🚨 Common Issues

### "Failed to load dashboard data"

This error occurs when the database is not properly initialized on a new laptop. **Solution:**

1. Run the database initialization script:
   ```bash
   cd bursary-backend
   python init_database.py
   ```

2. Restart the backend server:
   ```bash
   python app.py
   ```

3. Refresh the frontend dashboard

### Port 5001 Already in Use

```bash
# Find the process
lsof -i :5001

# Kill the process
kill -9 <PID>
```

## 📁 Project Structure

```
Bursary-hub-main/
├── bursary-backend/          # Flask backend
│   ├── app.py               # Main application
│   ├── init_database.py     # Database initialization
│   ├── database.py          # Database setup
│   ├── models.py            # Database models
│   ├── auth.py              # Authentication
│   └── requirements.txt     # Python dependencies
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   └── services/        # API services
│   └── package.json         # Node.js dependencies
├── setup_new_laptop.sh      # Automated setup script
├── SETUP_GUIDE.md           # Detailed setup guide
└── README.md                # This file
```

## 🎯 Features

- **User Management**: Register, login, profile management
- **Admin Dashboard**: Comprehensive admin interface
- **Bursary Applications**: Submit and manage applications
- **Reports System**: Submit and track reports
- **Contact Management**: Handle contact form submissions
- **Email Notifications**: Automated email updates
- **File Upload**: Profile picture uploads
- **Role-based Access**: Admin, moderator, and student roles

## 🛠️ Technology Stack

- **Backend**: Flask, SQLite, JWT Authentication
- **Frontend**: React, Vite, Tailwind CSS
- **Database**: SQLite with SQLAlchemy ORM
- **Authentication**: JWT tokens
- **Email**: SMTP with Gmail

## 📞 Support

For setup issues or questions:
1. Check [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. Run the automated setup script: `./setup_new_laptop.sh`
3. Verify database initialization: `python init_database.py`

---

**Happy coding! 🚀**
