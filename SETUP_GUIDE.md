# 🚀 Bursary Hub Setup Guide for New Laptops

This guide will help you set up the Bursary Hub project on a new laptop after cloning the repository.

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn package manager

## 🔧 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd bursary-backend
```

### 2. Create Virtual Environment
```bash
python -m venv venv
```

### 3. Activate Virtual Environment
**On Windows:**
```bash
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
source venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

### 5. Initialize Database
```bash
python init_database.py
```

This script will:
- ✅ Create all necessary database tables
- ✅ Seed the admin user
- ✅ Verify database setup
- ✅ Show database statistics

### 6. Start Backend Server
```bash
python app.py
```

The backend will start on `http://localhost:5001`

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Frontend Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔐 Default Admin Credentials

After running the database initialization script, you can login with:

- **Email**: `admin@bursaryhub.com`
- **Password**: `Admin123`

## 🧪 Testing the Setup

### 1. Test Backend API
```bash
curl http://localhost:5001/
```
Should return: `{"message": "Bursary Hub API is running!"}`

### 2. Test Database Connection
```bash
curl http://localhost:5001/users
```
Should return a list of users (may be empty initially)

### 3. Test Frontend
Open `http://localhost:5173` in your browser
- Should see the Bursary Hub homepage
- Should be able to register/login
- Admin dashboard should load without errors

## 🚨 Troubleshooting

### Issue: "Failed to load dashboard data"
**Solution:**
1. Make sure the database is initialized:
   ```bash
   cd bursary-backend
   python init_database.py
   ```

2. Check if backend is running:
   ```bash
   curl http://localhost:5001/
   ```

3. Check database tables:
   ```bash
   sqlite3 instance/bursary.db ".tables"
   ```

### Issue: "Port 5001 is already in use"
**Solution:**
1. Find the process using port 5001:
   ```bash
   lsof -i :5001
   ```

2. Kill the process:
   ```bash
   kill -9 <PID>
   ```

### Issue: "Module not found" errors
**Solution:**
1. Make sure virtual environment is activated
2. Reinstall dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Issue: Frontend shows white page
**Solution:**
1. Check browser console for errors
2. Make sure backend is running
3. Check if CORS is properly configured
4. Verify API_BASE_URL in `frontend/src/services/api.js`

## 📁 Project Structure

```
Bursary-hub-main/
├── bursary-backend/
│   ├── app.py              # Main Flask application
│   ├── init_database.py    # Database initialization script
│   ├── database.py         # Database setup
│   ├── models.py           # Database models
│   ├── auth.py             # Authentication logic
│   ├── config.py           # Configuration
│   ├── requirements.txt    # Python dependencies
│   └── instance/
│       └── bursary.db      # SQLite database
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main app component
│   ├── package.json        # Node.js dependencies
│   └── vite.config.js      # Vite configuration
└── SETUP_GUIDE.md          # This file
```

## 🔄 Quick Setup Commands

For a quick setup, run these commands in sequence:

```bash
# Backend setup
cd bursary-backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python init_database.py
python app.py

# In a new terminal, frontend setup
cd frontend
npm install
npm run dev
```

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Make sure both backend and frontend are running
4. Check browser console and terminal logs for errors
5. Ensure database is properly initialized

## 🎉 Success Indicators

You know everything is working when:

- ✅ Backend API responds on `http://localhost:5001`
- ✅ Frontend loads on `http://localhost:5173`
- ✅ You can register a new user
- ✅ You can login with admin credentials
- ✅ Admin dashboard loads without "Failed to load dashboard data" errors
- ✅ All dashboard sections (Users, Reports, Applications, Contacts) display data

---

**Happy coding! 🚀**
