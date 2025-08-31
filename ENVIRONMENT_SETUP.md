# 🌍 Environment Setup Guide

## 📋 Overview
This guide will help you set up environment variables for the BursaryHub project.

## 🚀 Quick Setup

### 1. Backend Environment (.env)
Copy the content from `environment.txt` to create a `.env` file in the project root:

```bash
cp environment.txt .env
```

### 2. Frontend Environment (.env)
Copy the content from `frontend-env.txt` to create a `.env` file in the frontend directory:

```bash
cp frontend-env.txt frontend/.env
```

## 🔧 Environment Variables Explained

### Backend Variables (.env)

#### Flask Configuration
- `FLASK_ENV`: Environment mode (development/production)
- `FLASK_DEBUG`: Enable debug mode (true/false)
- `SECRET_KEY`: Flask secret key for sessions

#### Database Configuration
- `DATABASE_PATH`: SQLite database file path

#### JWT Configuration
- `JWT_SECRET_KEY`: Secret key for JWT token signing
- `JWT_ACCESS_TOKEN_EXPIRES`: Token expiration time in seconds

#### Email Configuration
- `EMAIL_SERVER`: SMTP server (Gmail: smtp.gmail.com)
- `EMAIL_PORT`: SMTP port (Gmail: 587)
- `EMAIL_USERNAME`: Gmail address
- `EMAIL_PASSWORD`: Gmail app password

#### Upload Configuration
- `UPLOAD_FOLDER`: Directory for file uploads
- `MAX_CONTENT_LENGTH`: Maximum file size in bytes
- `ALLOWED_EXTENSIONS`: Comma-separated list of allowed file extensions

#### Admin Configuration
- `ADMIN_EMAIL`: Default admin email
- `ADMIN_PASSWORD`: Default admin password

#### CORS Configuration
- `CORS_ORIGINS`: Comma-separated list of allowed origins

### Frontend Variables (frontend/.env)

#### API Configuration
- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_APP_NAME`: Application name

#### Development Settings
- `VITE_DEV_MODE`: Development mode flag
- `VITE_ENABLE_LOGGING`: Enable console logging

#### Feature Flags
- `VITE_ENABLE_DARK_MODE`: Enable dark mode feature
- `VITE_ENABLE_ANALYTICS`: Enable analytics tracking

## 🔐 Security Notes

### ⚠️ Important Security Considerations

1. **Never commit .env files** to version control
2. **Use strong, unique passwords** for production
3. **Rotate JWT secrets** regularly
4. **Use environment-specific configurations**

### 🔑 Gmail App Password Setup

To use Gmail SMTP, you need an App Password:

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings → Security
3. Generate an App Password for "Mail"
4. Use the generated password in `EMAIL_PASSWORD`

## 🛠️ Production Setup

### Environment Variables for Production

```bash
# Production Backend (.env)
FLASK_ENV=production
FLASK_DEBUG=false
SECRET_KEY=your-super-secure-production-secret-key
JWT_SECRET_KEY=your-super-secure-jwt-secret-key
DATABASE_PATH=/path/to/production/database.db
EMAIL_USERNAME=your-production-email@gmail.com
EMAIL_PASSWORD=your-production-app-password
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

```bash
# Production Frontend (frontend/.env)
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_NAME=BursaryHub
VITE_DEV_MODE=false
VITE_ENABLE_LOGGING=false
VITE_ENABLE_ANALYTICS=true
```

## 🔄 Environment Management

### Development vs Production

| Variable | Development | Production |
|----------|-------------|------------|
| `FLASK_ENV` | `development` | `production` |
| `FLASK_DEBUG` | `true` | `false` |
| `SECRET_KEY` | Simple key | Strong, unique key |
| `CORS_ORIGINS` | `http://localhost:5173` | `https://yourdomain.com` |
| `VITE_API_BASE_URL` | `http://localhost:5001` | `https://api.yourdomain.com` |

### Environment-Specific Files

You can create multiple environment files:
- `.env.development` - Development settings
- `.env.production` - Production settings
- `.env.local` - Local overrides (gitignored)

## 🚨 Troubleshooting

### Common Issues

1. **Email not sending**: Check Gmail app password and 2FA settings
2. **CORS errors**: Verify `CORS_ORIGINS` includes your frontend URL
3. **JWT token issues**: Ensure `JWT_SECRET_KEY` is consistent
4. **Database errors**: Check `DATABASE_PATH` permissions

### Validation Commands

```bash
# Test backend environment
cd bursary-backend
python -c "from config import Config; print('✅ Backend config loaded')"

# Test frontend environment
cd frontend
npm run dev
```

## 📝 Next Steps

1. ✅ Copy environment files
2. ✅ Update sensitive values (passwords, keys)
3. ✅ Test email functionality
4. ✅ Verify CORS settings
5. ✅ Test JWT authentication

## 🔗 Related Files

- `environment.txt` - Backend environment template
- `frontend-env.txt` - Frontend environment template
- `bursary-backend/config.py` - Backend configuration loader
- `.gitignore` - Environment files are ignored
