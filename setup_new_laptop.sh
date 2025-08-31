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

# Setup backend
setup_backend() {
    print_status "Setting up backend..."
    
    cd bursary-backend
    
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
    echo "   python app.py"
    echo ""
    echo "2. In a new terminal, start the frontend:"
    echo "   cd frontend"
    echo "   npm run dev"
    echo ""
    echo "3. Open http://localhost:5173 in your browser"
    echo ""
    echo "🔐 Default admin credentials:"
    echo "   Email: admin@bursaryhub.com"
    echo "   Password: Admin123"
    echo ""
    echo "📖 For detailed instructions, see SETUP_GUIDE.md"
}

# Run main function
main
