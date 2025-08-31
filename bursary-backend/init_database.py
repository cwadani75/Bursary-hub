#!/usr/bin/env python3
"""
Database Initialization Script
Run this script to initialize the database on a new laptop after cloning the project.
"""

import os
import sys
from pathlib import Path

# Add the current directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import init_db, seed_admin_user
from models import User, Report, Application, Contact
from config import Config
import sqlite3

def init_database():
    """Initialize the database with tables and seed data"""
    print("🚀 Initializing Bursary Hub Database...")
    
    try:
        # Initialize database tables
        print("📋 Creating database tables...")
        init_db()
        print("✅ Database tables created successfully!")
        
        # Seed admin user
        print("👤 Creating admin user...")
        seed_admin_user()
        print("✅ Admin user created successfully!")
        
        # Verify database setup
        print("🔍 Verifying database setup...")
        verify_database()
        print("✅ Database verification completed!")
        
        print("\n🎉 Database initialization completed successfully!")
        print("📝 You can now start the backend server with: python app.py")
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        sys.exit(1)

def verify_database():
    """Verify that the database is properly set up"""
    db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'instance', 'bursary.db')
    
    if not os.path.exists(db_path):
        raise Exception("Database file not found!")
    
    # Connect to database
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check if tables exist
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [table[0] for table in cursor.fetchall()]
    
    required_tables = ['users', 'reports', 'applications', 'contacts']
    missing_tables = [table for table in required_tables if table not in tables]
    
    if missing_tables:
        raise Exception(f"Missing tables: {missing_tables}")
    
    # Check if admin user exists
    cursor.execute("SELECT COUNT(*) FROM users WHERE role = 'admin';")
    admin_count = cursor.fetchone()[0]
    
    if admin_count == 0:
        print("⚠️  Warning: No admin user found. Creating one...")
        seed_admin_user()
    
    # Print database stats
    cursor.execute("SELECT COUNT(*) FROM users;")
    user_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM reports;")
    report_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM applications;")
    application_count = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM contacts;")
    contact_count = cursor.fetchone()[0]
    
    print(f"📊 Database Statistics:")
    print(f"   👥 Users: {user_count}")
    print(f"   📝 Reports: {report_count}")
    print(f"   📄 Applications: {application_count}")
    print(f"   📞 Contacts: {contact_count}")
    
    conn.close()

if __name__ == "__main__":
    init_database()
