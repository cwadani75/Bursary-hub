import sqlite3
import os
from config import Config
from datetime import datetime
from werkzeug.security import generate_password_hash
from config import Config

def get_db_connection():
    """Create a database connection"""
    conn = sqlite3.connect(Config.DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database with tables"""
    conn = get_db_connection()
    
    # Create users table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            profile_picture TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create reports table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            reporter_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            report_type TEXT,
            county TEXT,
            sub_county TEXT,
            ward TEXT,
            village TEXT,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (reporter_id) REFERENCES users (id)
        )
    ''')
    
    # Create applications table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            id_number TEXT NOT NULL,
            gender TEXT NOT NULL,
            dob TEXT NOT NULL,
            county TEXT NOT NULL,
            sub_county TEXT NOT NULL,
            ward TEXT NOT NULL,
            village TEXT NOT NULL,
            institution TEXT NOT NULL,
            course TEXT NOT NULL,
            year_of study TEXT NOT NULL,
            fee_amount REAL NOT NULL,
            family_income REAL NOT NULL,
            reason TEXT NOT NULL,
            status TEXT DEFAULT 'pending',
            admin_notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    ''')
    
    # Create contacts table - FIXED: Added status column
    conn.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'new', -- Added the missing status column
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create default admin user if not exists
    admin_email = Config.ADMIN_EMAIL
    admin_exists = conn.execute('SELECT id FROM users WHERE email = ?', (admin_email,)).fetchone()
    
    if not admin_exists:
        admin_password_hash = generate_password_hash(Config.ADMIN_PASSWORD)
        conn.execute('''
            INSERT INTO users (name, email, password_hash, role)
            VALUES (?, ?, ?, ?)
        ''', ('Admin User', admin_email, admin_password_hash, 'admin'))
        print("✅ Default admin user created!")
    
    conn.commit()
    conn.close()
    print("✅ Database initialized successfully!")

def update_existing_database():
    """Update existing database schema to add missing columns"""
    conn = get_db_connection()
    
    # Check if status column exists in contacts table and add it if missing
    try:
        conn.execute("SELECT status FROM contacts LIMIT 1")
        print("✅ Status column already exists in contacts table")
    except sqlite3.OperationalError:
        try:
            conn.execute('ALTER TABLE contacts ADD COLUMN status TEXT DEFAULT "new"')
            print("✅ Added status column to contacts table")
        except sqlite3.OperationalError as e:
            print(f"⚠️ Could not add status column: {e}")
    
    # Check if other potentially missing columns exist and add them
    # Add any other missing columns that might be causing issues
    
    conn.commit()
    conn.close()

def seed_admin_user():
    """Create default admin user"""
    conn = get_db_connection()
    
    admin_email = Config.ADMIN_EMAIL
    admin_exists = conn.execute('SELECT id FROM users WHERE email = ?', (admin_email,)).fetchone()
    
    if not admin_exists:
        admin_password_hash = generate_password_hash(Config.ADMIN_PASSWORD)
        conn.execute('''
            INSERT INTO users (name, email, password_hash, role)
            VALUES (?, ?, ?, ?)
        ''', ('Admin User', admin_email, admin_password_hash, 'admin'))
        conn.commit()
        print("✅ Default admin user created!")
    else:
        print("ℹ️ Admin user already exists")
    
    conn.close()

def recreate_database():
    """Completely recreate the database (use with caution - will delete all data!)"""
    if os.path.exists(Config.DATABASE_PATH):
        os.remove(Config.DATABASE_PATH)
        print("🗑️ Old database removed")
    
    init_db()
    print("✅ New database created with correct schema")

if __name__ == "__main__":
    print("Choose an option:")
    print("1. Update existing database (keep data)")
    print("2. Recreate database (delete all data)")
    
    choice = input("Enter your choice (1 or 2): ")
    
    if choice == "2":
        recreate_database()
    else:
        # First try to update the existing database
        update_existing_database()
        
        # Then initialize to make sure all tables exist
        init_db()
    
    # Seed admin user
    seed_admin_user()