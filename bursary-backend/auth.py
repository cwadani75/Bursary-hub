from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import re
import jwt
from datetime import datetime, timedelta
from models import User
from config import Config

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_password(password):
    """Validate password strength"""
    if len(password) < 6:
        return False, "Password must be at least 6 characters long"
    return True, "Password is valid"

def signup():
    """Register a new user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not all(key in data for key in ['name', 'email', 'password']):
            return jsonify({'error': 'Missing required fields'}), 400
        
        name = data['name'].strip()
        email = data['email'].strip().lower()
        password = data['password']
        
        # Validate input
        if not name or len(name) < 2:
            return jsonify({'error': 'Name must be at least 2 characters long'}), 400
        
        if not validate_email(email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        is_valid_password, password_message = validate_password(password)
        if not is_valid_password:
            return jsonify({'error': password_message}), 400
        
        # Check if user already exists
        existing_user = User.get_user_by_email(email)
        if existing_user:
            return jsonify({'error': 'Email already registered'}), 409
        
        # Create new user
        user_id = User.create_user(name, email, password)
        if user_id is None:
            return jsonify({'error': 'Failed to create user'}), 500
        
        # Get the created user
        user = User.get_user_by_id(user_id)
        
        return jsonify({
            'message': 'User registered successfully',
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'role': user['role']
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

def login():
    """Authenticate user and return JWT token"""
    try:
        data = request.get_json()
        
        # Validate required fields
        if not all(key in data for key in ['email', 'password']):
            return jsonify({'error': 'Email and password are required'}), 400
        
        email = data['email'].strip().lower()
        password = data['password']
        
        # Get user by email
        user = User.get_user_by_email(email)
        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Verify password
        if not User.verify_password(user, password):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Create JWT token
        payload = {
            'user_id': user['id'],
            'role': user['role'],
            'email': user['email'],
            'exp': datetime.utcnow() + timedelta(hours=24)
        }
        access_token = jwt.encode(payload, Config.SECRET_KEY, algorithm='HS256')
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'role': user['role'],
                'profile_picture': user['profile_picture']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500


