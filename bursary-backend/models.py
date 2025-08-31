import sqlite3
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from database import get_db_connection

class User:
    @staticmethod
    def create_user(name, email, password, role='student'):
        """Create a new user"""
        conn = get_db_connection()
        try:
            password_hash = generate_password_hash(password)
            cursor = conn.execute('''
                INSERT INTO users (name, email, password_hash, role)
                VALUES (?, ?, ?, ?)
            ''', (name, email, password_hash, role))
            user_id = cursor.lastrowid
            conn.commit()
            return user_id
        except sqlite3.IntegrityError:
            return None
        finally:
            conn.close()
    
    @staticmethod
    def get_user_by_email(email):
        """Get user by email"""
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()
        return user
    
    @staticmethod
    def get_user_by_id(user_id):
        """Get user by ID"""
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
        conn.close()
        return user
    
    @staticmethod
    def verify_password(user, password):
        """Verify user password"""
        return check_password_hash(user['password_hash'], password)
    
    @staticmethod
    def update_profile_picture(user_id, filename):
        """Update user profile picture"""
        conn = get_db_connection()
        conn.execute('UPDATE users SET profile_picture = ? WHERE id = ?', (filename, user_id))
        conn.commit()
        conn.close()
    
    @staticmethod
    def get_all_users():
        """Get all users (admin only)"""
        conn = get_db_connection()
        users = conn.execute('SELECT id, name, email, role, created_at FROM users').fetchall()
        conn.close()
        return users
    
    @staticmethod
    def update_user_role(user_id, new_role):
        """Update user role (admin only)"""
        conn = get_db_connection()
        conn.execute('UPDATE users SET role = ? WHERE id = ?', (new_role, user_id))
        conn.commit()
        conn.close()
    
    @staticmethod
    def delete_user(user_id):
        """Delete user (admin only)"""
        conn = get_db_connection()
        conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
        conn.commit()
        conn.close()

class Report:
    @staticmethod
    def create_report(reporter_id, title, description, report_type, location_data):
        """Create a new report"""
        conn = get_db_connection()
        cursor = conn.execute('''
            INSERT INTO reports (reporter_id, title, description, report_type, county, sub_county, ward, village)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (reporter_id, title, description, report_type, location_data.get('county'), location_data.get('subCounty'), location_data.get('ward'), location_data.get('village')))
        report_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return report_id
    
    @staticmethod
    def get_report_by_id(report_id):
        """Get report by ID"""
        conn = get_db_connection()
        report = conn.execute('''
            SELECT r.*, u.name as reporter_name 
            FROM reports r 
            JOIN users u ON r.reporter_id = u.id 
            WHERE r.id = ?
        ''', (report_id,)).fetchone()
        conn.close()
        return report
    
    @staticmethod
    def get_reports_by_user(user_id):
        """Get all reports by a specific user"""
        conn = get_db_connection()
        reports = conn.execute('''
            SELECT r.*, u.name as reporter_name 
            FROM reports r 
            JOIN users u ON r.reporter_id = u.id 
            WHERE r.reporter_id = ?
            ORDER BY r.created_at DESC
        ''', (user_id,)).fetchall()
        conn.close()
        return reports
    
    @staticmethod
    def get_all_reports():
        """Get all reports (admin/moderator only)"""
        conn = get_db_connection()
        reports = conn.execute('''
            SELECT r.*, u.name as reporter_name, u.email as reporter_email
            FROM reports r 
            JOIN users u ON r.reporter_id = u.id 
            ORDER BY r.created_at DESC
        ''').fetchall()
        conn.close()
        return reports
    
    @staticmethod
    def update_report_status(report_id, new_status):
        """Update report status (admin/moderator only)"""
        conn = get_db_connection()
        conn.execute('UPDATE reports SET status = ? WHERE id = ?', (new_status, report_id))
        conn.commit()
        conn.close()
    
    @staticmethod
    def delete_report(report_id):
        """Delete report (admin only)"""
        conn = get_db_connection()
        conn.execute('DELETE FROM reports WHERE id = ?', (report_id,))
        conn.commit()
        conn.close()


class Application:
    @staticmethod
    def create_application(user_id, application_data):
        """Create a new bursary application"""
        conn = get_db_connection()
        cursor = conn.execute('''
            INSERT INTO applications (
                user_id, first_name, last_name, email, phone, id_number, gender, dob,
                county, sub_county, ward, village, institution, course, year_of_study,
                fee_amount, family_income, reason, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
        ''', (
            user_id, application_data['firstName'], application_data['lastName'],
            application_data['email'], application_data['phone'], application_data['idNumber'],
            application_data['gender'], application_data['dob'], application_data['county'],
            application_data['subCounty'], application_data['ward'], application_data['village'],
            application_data['institution'], application_data['course'], application_data['yearOfStudy'],
            application_data['feeAmount'], application_data['familyIncome'], application_data['reason']
        ))
        application_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return application_id
    
    @staticmethod
    def get_application_by_id(application_id):
        """Get application by ID"""
        conn = get_db_connection()
        application = conn.execute('''
            SELECT a.*, u.name as applicant_name, u.email as applicant_email
            FROM applications a 
            JOIN users u ON a.user_id = u.id 
            WHERE a.id = ?
        ''', (application_id,)).fetchone()
        conn.close()
        return application
    
    @staticmethod
    def get_applications_by_user(user_id):
        """Get all applications by a specific user"""
        conn = get_db_connection()
        applications = conn.execute('''
            SELECT a.*, u.name as applicant_name
            FROM applications a 
            JOIN users u ON a.user_id = u.id 
            WHERE a.user_id = ?
            ORDER BY a.created_at DESC
        ''', (user_id,)).fetchall()
        conn.close()
        return applications
    
    @staticmethod
    def get_all_applications():
        """Get all applications (admin only)"""
        conn = get_db_connection()
        applications = conn.execute('''
            SELECT a.*, u.name as applicant_name, u.email as applicant_email
            FROM applications a 
            JOIN users u ON a.user_id = u.id 
            ORDER BY a.created_at DESC
        ''').fetchall()
        conn.close()
        return applications
    
    @staticmethod
    def update_application_status(application_id, new_status, admin_notes=None):
        """Update application status (admin only)"""
        conn = get_db_connection()
        conn.execute('''
            UPDATE applications 
            SET status = ?, admin_notes = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE id = ?
        ''', (new_status, admin_notes, application_id))
        conn.commit()
        conn.close()
    
    @staticmethod
    def delete_application(application_id):
        """Delete application (admin only)"""
        conn = get_db_connection()
        conn.execute('DELETE FROM applications WHERE id = ?', (application_id,))
        conn.commit()
        conn.close()


class Contact:
    @staticmethod
    def create_contact(contact_data):
        """Create a new contact message"""
        conn = get_db_connection()
        cursor = conn.execute('''
            INSERT INTO contacts (full_name, email, phone, subject, message)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            contact_data['fullName'], contact_data['email'], contact_data['phone'],
            contact_data['subject'], contact_data['message']
        ))
        contact_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return contact_id
    
    @staticmethod
    def get_contact_by_id(contact_id):
        """Get contact message by ID"""
        conn = get_db_connection()
        contact = conn.execute('SELECT * FROM contacts WHERE id = ?', (contact_id,)).fetchone()
        conn.close()
        return contact
    
    @staticmethod
    def get_all_contacts():
        """Get all contact messages (admin only)"""
        conn = get_db_connection()
        contacts = conn.execute('SELECT * FROM contacts ORDER BY created_at DESC').fetchall()
        conn.close()
        return contacts
    
    @staticmethod
    def delete_contact(contact_id):
        """Delete contact message (admin only)"""
        conn = get_db_connection()
        conn.execute('DELETE FROM contacts WHERE id = ?', (contact_id,))
        conn.commit()
        conn.close()
