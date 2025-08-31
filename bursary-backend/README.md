# Bursary Reporting System - Backend API

A Flask-based REST API for managing bursary reports with user authentication and role-based access control.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access
- **User Management**: Admin can manage users and their roles
- **Report Management**: Create, read, update, and delete reports
- **Profile Management**: Upload profile pictures
- **Role-Based Access**: Admin, Moderator, and User roles
- **SQLite Database**: Lightweight database for development

## 🛠️ Tech Stack

- **Python 3.8+**
- **Flask 3.0.0**
- **SQLite3** (Database)
- **Flask-JWT-Extended** (Authentication)
- **Flask-CORS** (Cross-Origin Resource Sharing)
- **Werkzeug** (Password hashing)
- **Pillow** (Image processing)

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

## 🔧 Installation & Setup

### 1. Clone and Navigate
```bash
cd bursary-backend
```

### 2. Create Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Application
```bash
python app.py
```

The server will start on `http://localhost:5000`

## 👤 Default Admin Account

- **Email**: `mainbursery@gmail.com`
- **Password**: `Admin123`

## 📚 API Endpoints

### Authentication

#### POST `/signup`
Register a new user
```bash
curl -X POST http://localhost:5000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### POST `/login`
Login and get JWT token
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### GET `/profile`
Get current user profile (requires JWT token)
```bash
curl -X GET http://localhost:5000/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### User Management (Admin Only)

#### GET `/users`
Get all users
```bash
curl -X GET http://localhost:5000/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### PUT `/users/<user_id>`
Update user role
```bash
curl -X PUT http://localhost:5000/users/2 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role": "moderator"}'
```

#### DELETE `/users/<user_id>`
Delete user
```bash
curl -X DELETE http://localhost:5000/users/2 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Report Management

#### POST `/reports`
Create a new report
```bash
curl -X POST http://localhost:5000/reports \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Bursary Application Issue",
    "description": "I am having trouble submitting my bursary application form."
  }'
```

#### GET `/reports`
Get all reports (Admin/Moderator only)
```bash
curl -X GET http://localhost:5000/reports \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### GET `/reports/my`
Get current user's reports
```bash
curl -X GET http://localhost:5000/reports/my \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### GET `/reports/<report_id>`
Get specific report
```bash
curl -X GET http://localhost:5000/reports/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### PUT `/reports/<report_id>`
Update report status (Admin/Moderator only)
```bash
curl -X PUT http://localhost:5000/reports/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "resolved"}'
```

#### DELETE `/reports/<report_id>`
Delete report (Admin only)
```bash
curl -X DELETE http://localhost:5000/reports/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Profile Picture Upload

#### POST `/upload-profile-picture`
Upload profile picture
```bash
curl -X POST http://localhost:5000/upload-profile-picture \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/your/image.jpg"
```

## 🔐 Role-Based Access Control

### User Roles
- **user**: Can create reports and view their own reports
- **moderator**: Can view all reports and update report status
- **admin**: Full access to all features

### Access Levels
- **Public**: `/signup`, `/login`
- **User**: `/profile`, `/reports/my`, `/reports/<id>` (own reports)
- **Moderator**: All user access + `/reports` (all), `/reports/<id>` (all)
- **Admin**: All access + user management

## 📁 Project Structure

```
bursary-backend/
├── app.py              # Main Flask application
├── config.py           # Configuration settings
├── database.py         # Database connection & setup
├── models.py           # Database models & helper functions
├── auth.py             # Authentication functions
├── requirements.txt    # Python dependencies
├── README.md          # This file
├── instance/          # Database files
│   └── bursary.db
└── uploads/           # Profile pictures
```

## 🧪 Testing the API

### 1. Test the API is running
```bash
curl http://localhost:5000/
```

### 2. Create a test user
```bash
curl -X POST http://localhost:5000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }'
```

### 3. Login and get token
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### 4. Use the token for authenticated requests
```bash
# Replace YOUR_JWT_TOKEN with the token from step 3
curl -X GET http://localhost:5000/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔧 Configuration

Edit `config.py` to modify:
- Database path
- JWT settings
- Email settings (for Phase 2)
- Upload settings

## 🚨 Security Notes

- Change default secret keys in production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Implement rate limiting
- Add input validation and sanitization

## 📝 Response Format

All API responses follow this format:
```json
{
  "message": "Success message",
  "data": {...}
}
```

Error responses:
```json
{
  "error": "Error message"
}
```

## 🔄 Next Steps (Phase 2)

- Email functionality (forgot password)
- Advanced admin dashboard
- Report analytics
- File attachments for reports
- Email notifications
- Advanced search and filtering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
