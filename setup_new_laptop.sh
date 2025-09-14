#!/bin/bash

# 🚀 Bursary Hub Quick Setup Script for New Laptops
# This script automates the setup process for new laptops

echo "🚀 Bursary Hub Quick Setup for New Laptop"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Python is installed
check_python() {
    print_status "Checking Python installation..."
    if command -v python3 &> /dev/null; then
        print_success "Python 3 is installed"
        PYTHON_CMD="python3"
    elif command -v python &> /dev/null; then
        print_success "Python is installed"
        PYTHON_CMD="python"
    else
        print_error "Python is not installed. Please install Python 3.8 or higher."
        exit 1
    fi
}

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    if command -v node &> /dev/null; then
        print_success "Node.js is installed"
    else
        print_error "Node.js is not installed. Please install Node.js 16 or higher."
        exit 1
    fi
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if command -v npm &> /dev/null; then
        print_success "npm is installed"
    else
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
}

# Check if git is installed
check_git() {
    print_status "Checking Git installation..."
    if command -v git &> /dev/null; then
        print_success "Git is installed"
    else
        print_warning "Git is not installed. Some features may not work properly."
    fi
}

# Setup backend
setup_backend() {
    print_status "Setting up backend..."
    
    cd bursary-backend
    
    # Check if requirements.txt exists
    if [ ! -f "requirements.txt" ]; then
        print_error "requirements.txt not found in bursary-backend directory"
        exit 1
    fi
    
    # Create virtual environment
    print_status "Creating virtual environment..."
    $PYTHON_CMD -m venv venv
    
    # Activate virtual environment
    print_status "Activating virtual environment..."
    source venv/bin/activate
    
    # Install dependencies
    print_status "Installing Python dependencies..."
    pip install -r requirements.txt
    
    # Initialize database
    print_status "Initializing database..."
    $PYTHON_CMD init_database.py
    
    # Verify admin user was created
    print_status "Verifying admin user creation..."
    $PYTHON_CMD -c "
import sys
sys.path.append('.')
from database import get_db_connection
from config import Config
conn = get_db_connection()
admin = conn.execute('SELECT email, role FROM users WHERE email = ?', (Config.ADMIN_EMAIL,)).fetchone()
conn.close()
if admin:
    print('✅ Admin user verified:', admin[0], '- Role:', admin[1])
else:
    print('❌ Admin user not found!')
    sys.exit(1)
"
    
    # Create environment file from template
    print_status "Creating environment configuration..."
    if [ -f "environment.txt" ]; then
        cp environment.txt .env
        print_success "Environment file created from template"
    else
        print_warning "environment.txt template not found, creating basic .env"
        cat > .env << EOF
# Flask Configuration
SECRET_KEY=your-super-secret-key-change-this-in-production
FLASK_ENV=development
FLASK_DEBUG=true

# Database Configuration
DATABASE_PATH=instance/bursary.db

# JWT Configuration
JWT_SECRET_KEY=dev-secret-key
JWT_ACCESS_TOKEN_EXPIRES=3600

# Admin Configuration
ADMIN_EMAIL=mainbursery@gmail.com
ADMIN_PASSWORD=Admin123

# Email Configuration
EMAIL_SERVER=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=mainbursery@gmail.com
EMAIL_PASSWORD=ltqi dinz mvcd aktl

# Upload Configuration
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
ALLOWED_EXTENSIONS=png,jpg,jpeg,gif,pdf

# CORS Configuration
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174,http://localhost:5175,http://127.0.0.1:5175
EOF
    fi
    
    # Test admin login functionality
    print_status "Testing admin login functionality..."
    $PYTHON_CMD -c "
import sys
sys.path.append('.')
from models import User
from config import Config
admin = User.get_user_by_email(Config.ADMIN_EMAIL)
if admin and User.verify_password(admin, Config.ADMIN_PASSWORD):
    print('✅ Admin login test passed!')
else:
    print('❌ Admin login test failed!')
    sys.exit(1)
"
    
    print_success "Backend setup completed!"
    cd ..
}

# Setup frontend
setup_frontend() {
    print_status "Setting up frontend..."
    
    cd frontend
    
    # Install dependencies
    print_status "Installing Node.js dependencies..."
    npm install
    
    # Create frontend environment file from template
    print_status "Creating frontend environment configuration..."
    if [ -f "frontend-env.txt" ]; then
        cp frontend-env.txt .env
        print_success "Frontend environment file created from template"
    else
        print_warning "frontend-env.txt template not found, creating basic .env"
        cat > .env << EOF
VITE_API_BASE_URL=http://localhost:5001
VITE_APP_NAME=BursaryHub
VITE_DEV_MODE=true
VITE_ENABLE_LOGGING=true
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_ANALYTICS=false
EOF
    fi
    
    print_success "Frontend setup completed!"
    cd ..
}

# Main setup function
main() {
    print_status "Starting Bursary Hub setup..."
    
    # Check prerequisites
    check_python
    check_node
    check_npm
    check_git
    
    # Setup backend
    setup_backend
    
    # Setup frontend
    setup_frontend
    
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Start the backend server:"
    echo "   cd bursary-backend"
    echo "   source venv/bin/activate"
    echo "   python3 app.py"
    echo ""
    echo "2. In a new terminal, start the frontend:"
    echo "   cd frontend"
    echo "   npm run dev"
    echo ""
    echo "3. Open the URL shown by npm run dev (usually http://localhost:5173 or http://localhost:5174)"
    echo ""
    echo "🔐 Admin Login Credentials:"
    echo "   Email: mainbursery@gmail.com"
    echo "   Password: Admin123"
    echo ""
    echo "   ⚠️  IMPORTANT: These credentials are automatically created during setup"
    echo "   ✅ Admin user has been verified and tested"
    echo ""
    echo "⚠️  Important Notes:"
    echo "   - Backend runs on http://localhost:5001"
    echo "   - Frontend port may vary (5173, 5174, or 5175)"
    echo "   - Check .env files in both directories if you encounter issues"
    echo ""
    echo "📖 For detailed instructions, see SETUP_GUIDE.md"
    echo ""
    echo "🐛 Troubleshooting Login Issues:"
    echo "   If you get 'Admin access required' or 'Login failed':"
    echo "   1. Make sure the backend server is running (python3 app.py)"
    echo "   2. Check that the database was created: ls bursary-backend/instance/"
    echo "   3. Verify admin user exists: cd bursary-backend && python3 -c \"from database import get_db_connection; from config import Config; conn = get_db_connection(); admin = conn.execute('SELECT email FROM users WHERE email = ?', (Config.ADMIN_EMAIL,)).fetchone(); print('Admin exists:', bool(admin)); conn.close()\""
    echo "   4. If admin doesn't exist, run: cd bursary-backend && python3 init_database.py"
    echo ""
    echo "🐛 For other issues, check the terminal output above"
}

# Run main function
main
