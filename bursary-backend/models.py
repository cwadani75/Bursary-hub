import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from database import get_db_connection
from datetime import datetime

class User:
    @staticmethod
    def get_user_by_email(email):
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
        conn.close()
        return user

    @staticmethod
    def get_user_by_id(user_id):
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
        conn.close()
        return user

    @staticmethod
    def create_user(name, email, password):
        password_hash = generate_password_hash(password)
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
                (name, email, password_hash)
            )
            user_id = cursor.lastrowid
            conn.commit()
            return user_id
        except sqlite3.IntegrityError:
            return None
        finally:
            conn.close()

    @staticmethod
    def verify_password(user, password):
        return check_password_hash(user['password_hash'], password)

    @staticmethod
    def get_all_users():
        conn = get_db_connection()
        users = conn.execute('SELECT * FROM users ORDER BY created_at DESC').fetchall()
        conn.close()
        return users

    @staticmethod
    def update_user_role(user_id, new_role):
        conn = get_db_connection()
        conn.execute('UPDATE users SET role = ? WHERE id = ?', (new_role, user_id))
        conn.commit()
        conn.close()

    @staticmethod
    def delete_user(user_id):
        conn = get_db_connection()
        conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
        conn.commit()
        conn.close()

    @staticmethod
    def update_profile_picture(user_id, filename):
        conn = get_db_connection()
        conn.execute('UPDATE users SET profile_picture = ? WHERE id = ?', (filename, user_id))
        conn.commit()
        conn.close()

class Report:
    @staticmethod
    def create_report(user_id, title, description, report_type, location_data, contact_data=None):
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute(
                '''INSERT INTO reports 
                (reporter_id, title, description, report_type, county, sub_county, ward, village, 
                 reporter_full_name, reporter_email, reporter_phone) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                (user_id, title, description, report_type, 
                 location_data.get('county'), location_data.get('subCounty'),
                 location_data.get('ward'), location_data.get('village'),
                 contact_data.get('fullName') if contact_data else None,
                 contact_data.get('email') if contact_data else None,
                 contact_data.get('phone') if contact_data else None)
            )
            report_id = cursor.lastrowid
            conn.commit()
            return report_id
        except Exception as e:
            print(f"Error creating report: {e}")
            return None
        finally:
            conn.close()

    @staticmethod
    def get_all_reports():
        conn = get_db_connection()
        reports = conn.execute('''
            SELECT r.*, u.name as reporter_name, u.email as reporter_email,
                   COALESCE(r.reporter_full_name, u.name) as display_name,
                   COALESCE(r.reporter_email, u.email) as display_email,
                   r.reporter_phone as phone
            FROM reports r 
            JOIN users u ON r.reporter_id = u.id 
            ORDER BY r.created_at DESC
        ''').fetchall()
        conn.close()
        return reports

    @staticmethod
    def get_reports_by_user(user_id):
        conn = get_db_connection()
        reports = conn.execute('''
            SELECT r.*, u.name as reporter_name, u.email as reporter_email 
            FROM reports r 
            JOIN users u ON r.reporter_id = u.id 
            WHERE r.reporter_id = ? 
            ORDER BY r.created_at DESC
        ''', (user_id,)).fetchall()
        conn.close()
        return reports

    @staticmethod
    def get_report_by_id(report_id):
        conn = get_db_connection()
        report = conn.execute('''
            SELECT r.*, u.name as reporter_name, u.email as reporter_email 
            FROM reports r 
            JOIN users u ON r.reporter_id = u.id 
            WHERE r.id = ?
        ''', (report_id,)).fetchone()
        conn.close()
        return report

    @staticmethod
    def update_report_status(report_id, status):
        conn = get_db_connection()
        conn.execute('UPDATE reports SET status = ? WHERE id = ?', (status, report_id))
        conn.commit()
        conn.close()

    @staticmethod
    def update_report(report_id, data):
        conn = get_db_connection()
        conn.execute('''
            UPDATE reports 
            SET title = ?, description = ?, report_type = ?, county = ?, sub_county = ?, 
                ward = ?, village = ?, status = ?
            WHERE id = ?
        ''', (
            data['title'], data['description'], data['report_type'],
            data['county'], data['sub_county'], data['ward'], data['village'],
            data['status'], report_id
        ))
        conn.commit()
        conn.close()

    @staticmethod
    def delete_report(report_id):
        conn = get_db_connection()
        conn.execute('DELETE FROM reports WHERE id = ?', (report_id,))
        conn.commit()
        conn.close()

class Application:
    @staticmethod
    def create_application(user_id, data):
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO applications 
                (user_id, first_name, last_name, email, phone, id_number, gender, dob,
                 county, sub_county, ward, village, institution, course, year_of_study,
                 fee_amount, family_income, reason)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                user_id, data['firstName'], data['lastName'], data['email'], data['phone'],
                data['idNumber'], data['gender'], data['dob'], data['county'], data['subCounty'],
                data['ward'], data['village'], data['institution'], data['course'],
                data['yearOfStudy'], data['feeAmount'], data['familyIncome'], data['reason']
            ))
            application_id = cursor.lastrowid
            conn.commit()
            return application_id
        except Exception as e:
            print(f"Error creating application: {e}")
            return None
        finally:
            conn.close()

    @staticmethod
    def get_all_applications():
        conn = get_db_connection()
        applications = conn.execute('''
            SELECT a.*, u.name as user_name 
            FROM applications a 
            JOIN users u ON a.user_id = u.id 
            ORDER BY a.created_at DESC
        ''').fetchall()
        conn.close()
        return applications

    @staticmethod
    def get_applications_by_user(user_id):
        conn = get_db_connection()
        applications = conn.execute('''
            SELECT * FROM applications 
            WHERE user_id = ? 
            ORDER by created_at DESC
        ''', (user_id,)).fetchall()
        conn.close()
        return applications

    @staticmethod
    def get_application_by_id(application_id):
        conn = get_db_connection()
        application = conn.execute('''
            SELECT a.*, u.name as user_name 
            FROM applications a 
            JOIN users u ON a.user_id = u.id 
            WHERE a.id = ?
        ''', (application_id,)).fetchone()
        conn.close()
        return application

    @staticmethod
    def update_application_status(application_id, status, admin_notes=None):
        conn = get_db_connection()
        conn.execute('''
            UPDATE applications 
            SET status = ?, admin_notes = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE id = ?
        ''', (status, admin_notes, application_id))
        conn.commit()
        conn.close()

    @staticmethod
    def delete_application(application_id):
        conn = get_db_connection()
        conn.execute('DELETE FROM applications WHERE id = ?', (application_id,))
        conn.commit()
        conn.close()


# ... (keep all other classes the same)

class Contact:
    @staticmethod
    def create_contact(data):
        conn = get_db_connection()
        try:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO contacts (full_name, email, phone, subject, message, status)
                VALUES (?, ?, ?, ?, ?, 'pending')
            ''', (
                data['fullName'], data['email'], data['phone'],
                data['subject'], data['message']
            ))
            contact_id = cursor.lastrowid
            conn.commit()
            return contact_id
        except Exception as e:
            print(f"Error creating contact: {e}")
            return None
        finally:
            conn.close()

    @staticmethod
    def get_all_contacts():
        conn = get_db_connection()
        try:
            contacts = conn.execute('SELECT * FROM contacts ORDER BY created_at DESC').fetchall()
            return contacts
        except Exception as e:
            print(f"Error getting all contacts: {e}")
            return []
        finally:
            conn.close()

    @staticmethod
    def get_contact_by_id(contact_id):
        conn = get_db_connection()
        try:
            contact = conn.execute('SELECT * FROM contacts WHERE id = ?', (contact_id,)).fetchone()
            return contact
        except Exception as e:
            print(f"Error getting contact by ID: {e}")
            return None
        finally:
            conn.close()

    @staticmethod
    def update_contact_status(contact_id, status):
        conn = get_db_connection()
        try:
            conn.execute('UPDATE contacts SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', 
                        (status, contact_id))
            conn.commit()
            print(f"✅ Contact {contact_id} status updated to {status}")
        except Exception as e:
            print(f"Error updating contact status: {e}")
            raise e
        finally:
            conn.close()

    @staticmethod
    def update_contact(contact_id, data):
        conn = get_db_connection()
        try:
            conn.execute('''
                UPDATE contacts 
                SET full_name = ?, email = ?, phone = ?, subject = ?, message = ?, status = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            ''', (
                data['full_name'], data['email'], data['phone'],
                data['subject'], data['message'], data['status'], contact_id
            ))
            conn.commit()
            print(f"✅ Contact {contact_id} updated successfully")
        except Exception as e:
            print(f"Error updating contact: {e}")
            raise e
        finally:
            conn.close()

    @staticmethod
    def delete_contact(contact_id):
        conn = get_db_connection()
        try:
            conn.execute('DELETE FROM contacts WHERE id = ?', (contact_id,))
            conn.commit()
            print(f"✅ Contact {contact_id} deleted successfully")
        except Exception as e:
            print(f"Error deleting contact: {e}")
            raise e
        finally:
            conn.close()