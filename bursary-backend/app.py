from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from functools import wraps
import os
from werkzeug.utils import secure_filename
from PIL import Image
import io
import jwt
from datetime import timedelta, datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Import our modules
from config import Config
from database import init_db, seed_admin_user
from models import User, Report, Application, Contact
from auth import signup, login

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
CORS(app, 
     origins=['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5174', 'http://127.0.0.1:5174', 'http://localhost:5175', 'http://127.0.0.1:5175'],
     supports_credentials=True,
     methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allow_headers=['Content-Type', 'Authorization', 'X-Requested-With'])

# Ensure upload directory exists
os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)

# Role-based decorators
def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'error': 'Token is missing'}), 401
            try:
                token = token.split(" ")[1]
                payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
                if payload.get('role') != 'admin':
                    return jsonify({'error': 'Admin access required'}), 403
                return fn(*args, **kwargs)
            except jwt.ExpiredSignatureError:
                return jsonify({'error': 'Token has expired'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'error': 'Invalid token'}), 401
            except Exception as e:
                print(f"Admin access error: {e}")
                return jsonify({'error': 'Internal server error'}), 500
        return decorator
    return wrapper

def admin_or_moderator_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'error': 'Token is missing'}), 401
            try:
                token = token.split(" ")[1]
                payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
                if payload.get('role') not in ['admin', 'moderator']:
                    return jsonify({'error': 'Admin or moderator access required'}), 403
                return fn(*args, **kwargs)
            except jwt.ExpiredSignatureError:
                return jsonify({'error': 'Token has expired'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'error': 'Invalid token'}), 401
            except Exception as e:
                print(f"Admin or moderator access error: {e}")
                return jsonify({'error': 'Internal server error'}), 500
        return decorator
    return wrapper

def user_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'error': 'Token is missing'}), 401
            try:
                token = token.split(" ")[1]
                payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
                if payload.get('role') not in ['admin', 'moderator', 'user', 'student']:
                    return jsonify({'error': 'User access required'}), 403
                return fn(*args, **kwargs)
            except jwt.ExpiredSignatureError:
                return jsonify({'error': 'Token has expired'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'error': 'Invalid token'}), 401
            except Exception as e:
                print(f"User access error: {e}")
                return jsonify({'error': 'Internal server error'}), 500
        return decorator
    return wrapper

# Helper function for file uploads
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

# Email service function
def send_email(to_email, subject, message):
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = Config.EMAIL_USERNAME
        msg['To'] = to_email
        msg['Subject'] = subject
        
        # Add body to email
        msg.attach(MIMEText(message, 'html'))
        
        # Create SMTP session
        server = smtplib.SMTP(Config.EMAIL_SERVER, Config.EMAIL_PORT)
        server.starttls()
        server.login(Config.EMAIL_USERNAME, Config.EMAIL_PASSWORD)
        
        # Send email
        text = msg.as_string()
        server.sendmail(Config.EMAIL_USERNAME, to_email, text)
        server.quit()
        
        print(f"✅ Email sent successfully to {to_email}")
        return True
    except Exception as e:
        print(f"❌ Error sending email to {to_email}: {e}")
        return False

def send_application_status_email(application, status, admin_notes=None):
    """Send email notification for application status update"""
    try:
        applicant_name = f"{application['first_name']} {application['last_name']}"
        applicant_email = application['email']
        
        if status == 'approved':
            subject = "🎉 Congratulations! Your Bursary Application Has Been Approved"
            message = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="margin: 0; font-size: 28px;">🎉 Congratulations!</h1>
                        <p style="margin: 10px 0 0 0; font-size: 18px;">Your Bursary Application Has Been Approved</p>
                    </div>
                    
                    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #2c3e50; margin-top: 0;">Dear {applicant_name},</h2>
                        
                        <p>We are pleased to inform you that your bursary application has been <strong>APPROVED</strong>!</p>
                        
                        <div style="background: #e8f5e8; border-left: 4px solid #27ae60; padding: 20px; margin: 20px 0; border-radius: 5px;">
                            <h3 style="color: #27ae60; margin-top: 0;">Application Details:</h3>
                            <ul style="margin: 10px 0;">
                                <li><strong>Institution:</strong> {application['institution']}</li>
                                <li><strong>Course:</strong> {application['course']}</li>
                                <li><strong>Fee Amount:</strong> KES {application['fee_amount']:,.2f}</li>
                                <li><strong>Status:</strong> <span style="color: #27ae60; font-weight: bold;">APPROVED</span></li>
                            </ul>
                        </div>
                        
                        {f'<p><strong>Admin Notes:</strong> {admin_notes}</p>' if admin_notes else ''}
                        
                        <p>Our team will contact you shortly with further instructions regarding the disbursement of your bursary funds.</p>
                        
                        <p>If you have any questions, please don't hesitate to contact us.</p>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <p style="color: #7f8c8d; font-size: 14px;">
                                Best regards,<br>
                                <strong>Bursary Management Team</strong><br>
                                Email: mainbursery@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """
        elif status == 'rejected':
            subject = "Bursary Application Status Update"
            message = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="margin: 0; font-size: 28px;">Application Status Update</h1>
                    </div>
                    
                    <div style="background: 'f9f9f9'; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: '2c3e50'; margin-top: 0;">Dear {applicant_name},</h2>
                        
                        <p>We regret to inform you that your bursary application has been <strong>REJECTED</strong>.</p>
                        
                        <div style="background: #ffeaea; border-left: 4px solid #e74c3c; padding: 20px; margin: 20px 0; border-radius: 5px;">
                            <h3 style="color: #e74c3c; margin-top: 0;">Application Details:</h3>
                            <ul style="margin: 10px 0;">
                                <li><strong>Institution:</strong> {application['institution']}</li>
                                <li><strong>Course:</strong> {application['course']}</li>
                                <li><strong>Fee Amount:</strong> KES {application['fee_amount']:,.2f}</li>
                                <li><strong>Status:</strong> <span style="color: #e74c3c; font-weight: bold;">REJECTED</span></li>
                            </ul>
                        </div>
                        
                        {f'<p><strong>Reason for Rejection:</strong> {admin_notes}</p>' if admin_notes else '<p>Unfortunately, your application did not meet the required criteria.</p>'}
                        
                        <p>We encourage you to review your application and consider applying again in the future if you believe there may have been an error or if your circumstances change.</p>
                        
                        <p>If you have any questions about this decision, please contact us.</p>
                        
                        <div style="text-align: center; margin-top: 30px;">
                            <p style="color: #7f8c8d; font-size: 14px;">
                                Best regards,<br>
                                <strong>Bursary Management Team</strong><br>
                                Email: mainbursery@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """
        else:
            return False
        
        return send_email(applicant_email, subject, message)
        
    except Exception as e:
        print(f"❌ Error preparing application status email: {e}")
        return False

def send_contact_status_email(contact_email, contact_name, subject, status):
    """Send email notification for contact status update"""
    try:
        if status == 'resolved':
            email_subject = "Your Contact Message Has Been Resolved"
            message = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="margin: 0; font-size: 28px;">Contact Message Resolved</h1>
                    </div>
                    
                    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #2c3e50; margin-top: 0;">Dear {contact_name},</h2>
                        
                        <p>We are pleased to inform you that your contact message regarding <strong>"{subject}"</strong> has been <strong>RESOLVED</strong>.</p>
                        
                        <div style="background: #eafaf1; border-left: 4px solid #27ae60; padding: 20px; margin: 20px 0; border-radius: 5px;">
                            <h3 style="color: #27ae60; margin-top: 0;">Status Update:</h3>
                            <p style="margin: 10px 0;"><strong>Status:</strong> <span style="color: #27ae60; font-weight: bold;">RESOLVED</span></p>
                            <p style="margin: 10px 0;"><strong>Subject:</strong> {subject}</p>
                        </div>
                        
                        <p>Thank you for contacting us. If you have any further questions or concerns, please don't hesitate to reach out to us again.</p>
                        
                        <div style="background: #ecf0f1; padding: 20px; margin: 20px 0; border-radius: 5px; text-align: center;">
                            <p style="margin: 0; color: #7f8c8d;">
                                <strong>Bursary Hub Team</strong><br>
                                Email: mainbursery@gmail.com<br>
                                We're here to help!
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """
        else:
            return False
        
        return send_email(contact_email, email_subject, message)
        
    except Exception as e:
        print(f"❌ Error preparing contact status email: {e}")
        return False

def send_report_status_email(report_email, report_name, report_title, status):
    """Send email notification for report status update"""
    try:
        if status in ['reviewed', 'resolved']:
            if status == 'reviewed':
                email_subject = "Your Report Has Been Reviewed"
                status_text = "REVIEWED"
                status_color = "#f39c12"
                bg_color = "#fef9e7"
                border_color = "#f39c12"
            else:  # resolved
                email_subject = "Your Report Has Been Resolved"
                status_text = "RESOLVED"
                status_color = "#27ae60"
                bg_color = "#eafaf1"
                border_color = "#27ae60"
            
            message = f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: '333';">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, {status_color} 0%, {status_color}dd 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="margin: 0; font-size: 28px;">Report Status Update</h1>
                    </div>
                    
                    <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #2c3e50; margin-top: 0;">Dear {report_name},</h2>
                        
                        <p>We are pleased to inform you that your report regarding <strong>"{report_title}"</strong> has been <strong>{status_text}</strong>.</p>
                        
                        <div style="background: {bg_color}; border-left: 4px solid {border_color}; padding: 20px; margin: 20px 0; border-radius: 5px;">
                            <h3 style="color: {status_color}; margin-top: 0;">Status Update:</h3>
                            <p style="margin: 10px 0;"><strong>Status:</strong> <span style="color: {status_color}; font-weight: bold;">{status_text}</span></p>
                            <p style="margin: 10px 0;"><strong>Report Title:</strong> {report_title}</p>
                        </div>
                        
                        <p>Thank you for bringing this matter to our attention. Your report helps us maintain the integrity of our bursary program.</p>
                        
                        <div style="background: #ecf0f1; padding: 20px; margin: 20px 0; border-radius: 5px; text-align: center;">
                            <p style="margin: 0; color: #7f8c8d;">
                                <strong>Bursary Hub Team</strong><br>
                                Email: mainbursery@gmail.com<br>
                                We're here to help!
                            </p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """
        else:
            return False
        
        return send_email(report_email, email_subject, message)
        
    except Exception as e:
        print(f"❌ Error preparing report status email: {e}")
        return False

# Helper function to get user from token
def get_current_user():
    token = request.headers.get('Authorization')
    if not token:
        return None
    try:
        token = token.split(" ")[1]
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        return payload
    except:
        return None

# Routes
@app.route('/')
def home():
    return jsonify({'message': 'Bursary Reporting System API', 'version': '1.0.0'})

# Authentication routes
@app.route('/signup', methods=['POST'])
def register():
    return signup()

@app.route('/login', methods=['POST'])
def authenticate():
    return login()

@app.route('/test-auth', methods=['GET'])
@user_required()
def test_auth():
    """Test endpoint to verify JWT is working"""
    user_data = get_current_user()
    return jsonify({'message': 'JWT is working!', 'user_id': user_data['user_id']}), 200

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    """Send password reset email"""
    try:
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        # Check if user exists
        user = User.get_user_by_email(email)
        if not user:
            # Don't reveal if email exists or not for security
            return jsonify({'message': 'If the email exists, a password reset link has been sent.'}), 200
        
        # Generate reset token (simple implementation for now)
        reset_token = jwt.encode(
            {
                'user_id': user['id'],
                'email': user['email'],
                'exp': datetime.utcnow() + timedelta(hours=1)
            },
            app.config['SECRET_KEY'],
            algorithm='HS256'
        )
        
        # Send email with reset link
        reset_link = f"http://localhost:5173/reset-password?token={reset_token}"
        
        subject = "Password Reset Request - BursaryHub"
        message = f"""
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, '764ba2' 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="margin: 0; font-size: 28px;">🔐 Password Reset</h1>
                    <p style="margin: 10px 0 0 0; font-size: 18px;">BursaryHub Account</p>
                </div>
                
                <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
                    <h2 style="color: #2c3e50; margin-top: 0;">Hello {user['name']},</h2>
                    
                    <p>You requested a password reset for your BursaryHub account.</p>
                    
                    <p>Click the button below to reset your password:</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{reset_link}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                            Reset Password
                        </a>
                    </div>
                    
                    <p><strong>Important:</strong> This link will expire in 1 hour for security reasons.</p>
                    
                    <p>If you didn't request this password reset, please ignore this email.</p>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #7f8c8d; font-size: 14px;">
                            Best regards,<br>
                            <strong>BursaryHub Team</strong>
                        </p>
                    </div>
                </div>
            </div>
            </body>
            </html>
            """
        
        email_sent = send_email(user['email'], subject, message)
        
        if email_sent:
            return jsonify({'message': 'Password reset email sent successfully'}), 200
        else:
            return jsonify({'error': 'Failed to send password reset email'}), 500
            
    except Exception as e:
        print(f"❌ Error in forgot password: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/profile', methods=['GET'])
@user_required()
def profile():
    """Get current user profile - simplified for testing"""
    try:
        user_data = get_current_user()
        user_id = user_data['user_id']
        user = User.get_user_by_id(user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'role': user['role'],
                'profile_picture': user['profile_picture'],
                'created_at': user['created_at']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

# User management routes (admin only)
@app.route('/users', methods=['GET'])
@admin_required()
def get_users():
    """Get all users (admin only)"""
    try:
        users = User.get_all_users()
        return jsonify({'users': [dict(user) for user in users]}), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/users/<int:user_id>', methods=['PUT'])
@admin_required()
def update_user_role(user_id):
    """Update user role (admin only)"""
    try:
        data = request.get_json()
        new_role = data.get('role')
        
        if new_role not in ['user', 'moderator', 'admin']:
            return jsonify({'error': 'Invalid role'}), 400
        
        User.update_user_role(user_id, new_role)
        return jsonify({'message': 'User role updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/users/<int:user_id>', methods=['DELETE'])
@admin_required()
def delete_user(user_id):
    """Delete user (admin only)"""
    try:
        User.delete_user(user_id)
        return jsonify({'message': 'User deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

# Report routes
@app.route('/reports', methods=['POST'])
@user_required()
def create_report():
    """Create a new report"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'description', 'reportType']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        title = data['title'].strip()
        description = data['description'].strip()
        
        if not title or len(title) < 5:
            return jsonify({'error': 'Title must be at least 5 characters long'}), 400
        
        if not description or len(description) < 10:
            return jsonify({'error': 'Description must be at least 10 characters long'}), 400
        
        # Extract location data
        location_data = {
            'county': data.get('county'),
            'subCounty': data.get('subCounty'),
            'ward': data.get('ward'),
            'village': data.get('village')
        }
        
        user_data = get_current_user()
        user_id = user_data['user_id']
        report_id = Report.create_report(user_id, title, description, data['reportType'], location_data)
        
        return jsonify({
            'message': 'Report created successfully',
            'report_id': report_id
        }), 201
        
    except Exception as e:
        print(f"❌ Error creating report: {e}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@app.route('/reports', methods=['GET'])
@admin_or_moderator_required()
def get_all_reports():
    """Get all reports (admin/moderator only)"""
    try:
        reports = Report.get_all_reports()
        return jsonify({'reports': [dict(report) for report in reports]}), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/reports/my', methods=['GET'])
@user_required()
def get_my_reports():
    """Get current user's reports"""
    try:
        user_data = get_current_user()
        user_id = user_data['user_id']
        reports = Report.get_reports_by_user(user_id)
        return jsonify({'reports': [dict(report) for report in reports]}), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/reports/<int:report_id>', methods=['GET'])
@user_required()
def get_report(report_id):
    """Get single report"""
    try:
        report = Report.get_report_by_id(report_id)
        if not report:
            return jsonify({'error': 'Report not found'}), 404
        
        # Check if user can access this report
        user_data = get_current_user()
        user_id = user_data['user_id']
        claims = user_data
        
        if claims.get('role') not in ['admin', 'moderator'] and report['reporter_id'] != user_id:
            return jsonify({'error': 'Access denied'}), 403
        
        return jsonify({'report': dict(report)}), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/reports/<int:report_id>', methods=['PUT'])
@admin_or_moderator_required()
def update_report(report_id):
    """Update report (admin/moderator only)"""
    try:
        data = request.get_json()
        
        # Check if this is a status-only update (from dropdown)
        if 'status' in data and len(data) == 1:
            new_status = data.get('status')
            if new_status not in ['pending', 'reviewed', 'resolved']:
                return jsonify({'error': 'Invalid status'}), 400
            
            # Update report status only
            Report.update_report_status(report_id, new_status)
            
            # Send email notification if status changed to reviewed or resolved
            if new_status in ['reviewed', 'resolved']:
                report = Report.get_report_by_id(report_id)
                if report:
                    try:
                        # Convert SQLite Row to dictionary
                        report_dict = dict(report)
                        send_report_status_email(report_dict['reporter_email'], report_dict['reporter_name'], report_dict['title'], new_status)
                    except Exception as email_error:
                        print(f"Failed to send email notification: {email_error}")
                        # Don't fail the request if email fails
            
            return jsonify({'message': 'Report status updated successfully'}), 200
        
        # Full report update (from modal)
        else:
            # Validate required fields
            required_fields = ['title', 'description', 'report_type', 'county', 'sub_county', 'ward', 'village', 'status']
            for field in required_fields:
                if field not in data:
                    return jsonify({'error': f'Missing required field: {field}'}), 400
            
            # Update all report fields
            Report.update_report(report_id, data)
            
            # Send email notification if status changed to reviewed or resolved
            new_status = data.get('status')
            if new_status in ['reviewed', 'resolved']:
                report = Report.get_report_by_id(report_id)
                if report:
                    try:
                        # Convert SQLite Row to dictionary
                        report_dict = dict(report)
                        send_report_status_email(report_dict['reporter_email'], report_dict['reporter_name'], report_dict['title'], new_status)
                    except Exception as email_error:
                        print(f"Failed to send email notification: {email_error}")
                        # Don't fail the request if email fails
            
            return jsonify({'message': 'Report updated successfully'}), 200
        
    except Exception as e:
        print(f"Error updating report: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/reports/<int:report_id>', methods=['DELETE'])
@admin_required()
def delete_report(report_id):
    """Delete report (admin only)"""
    try:
        Report.delete_report(report_id)
        return jsonify({'message': 'Report deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500


# Application endpoints
@app.route('/applications', methods=['POST'])
@user_required()
def create_application():
    try:
        user_id = get_current_user()['user_id']
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['firstName', 'lastName', 'email', 'phone', 'idNumber', 'gender', 'dob',
                          'county', 'subCounty', 'ward', 'village', 'institution', 'course', 
                          'yearOfStudy', 'feeAmount', 'familyIncome', 'reason']
        
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        application_id = Application.create_application(user_id, data)
        
        if application_id:
            return jsonify({
                'message': 'Application submitted successfully',
                'application_id': application_id
            }), 201
        else:
            return jsonify({'error': 'Failed to create application'}), 500
            
    except Exception as e:
        print(f"Error creating application: {e}")
        return jsonify({'error': 'Failed to create application'}), 500


@app.route('/applications', methods=['GET'])
@admin_required()
def get_all_applications():
    try:
        applications = Application.get_all_applications()
        return jsonify({'applications': [dict(app) for app in applications]}), 200
    except Exception as e:
        print(f"Error getting applications: {e}")
        return jsonify({'error': 'Failed to get applications'}), 500


@app.route('/applications/my', methods=['GET'])
@user_required()
def get_my_applications():
    try:
        user_id = get_current_user()['user_id']
        applications = Application.get_applications_by_user(user_id)
        return jsonify({'applications': [dict(app) for app in applications]}), 200
    except Exception as e:
        print(f"Error getting user applications: {e}")
        return jsonify({'error': 'Failed to get applications'}), 500


@app.route('/applications/<int:application_id>', methods=['GET'])
@user_required()
def get_application(application_id):
    try:
        application = Application.get_application_by_id(application_id)
        if application:
            return jsonify({'application': dict(application)}), 200
        else:
            return jsonify({'error': 'Failed to get application'}), 404
    except Exception as e:
        print(f"Error getting application: {e}")
        return jsonify({'error': 'Failed to get application'}), 500


@app.route('/applications/<int:application_id>', methods=['PUT'])
@admin_required()
def update_application_status(application_id):
    try:
        data = request.get_json()
        new_status = data.get('status')
        admin_notes = data.get('admin_notes')
        
        if not new_status:
            return jsonify({'error': 'Status is required'}), 400
        
        Application.update_application_status(application_id, new_status, admin_notes)
        
        # Get application details for email
        application = Application.get_application_by_id(application_id)
        if application:
            # Send email notification
            application_dict = dict(application)
            email_sent = send_application_status_email(application_dict, new_status, admin_notes)
            if email_sent:
                print(f"✅ Email notification sent for application {application_id} - Status: {new_status}")
            else:
                print(f"❌ Failed to send email notification for application {application_id}")
        else:
            print(f"⚠ Application {application_id} not found for email notification")
        
        return jsonify({'message': 'Application status updated successfully'}), 200
    except Exception as e:
        print(f"Error updating application: {e}")
        return jsonify({'error': 'Failed to update application'}), 500


@app.route('/applications/<int:application_id>', methods=['DELETE'])
@admin_required()
def delete_application(application_id):
    try:
        Application.delete_application(application_id)
        return jsonify({'message': 'Application deleted successfully'}), 200
    except Exception as e:
        print(f"Error deleting application: {e}")
        return jsonify({'error': 'Failed to delete application'}), 500


# ... (keep all the imports and setup code the same until the contact routes)

# Contact endpoints
@app.route('/contacts', methods=['POST'])
def create_contact():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['fullName', 'email', 'phone', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        contact_id = Contact.create_contact(data)
        
        if contact_id:
            return jsonify({
                'message': 'Contact message sent successfully',
                'contact_id': contact_id
            }), 201
        else:
            return jsonify({'error': 'Failed to send message'}), 500
            
    except Exception as e:
        print(f"Error creating contact: {e}")
        return jsonify({'error': 'Failed to send message'}), 500


@app.route('/contacts', methods=['GET'])
@admin_required()
def get_all_contacts():
    try:
        contacts = Contact.get_all_contacts()
        return jsonify({'contacts': [dict(contact) for contact in contacts]}), 200
    except Exception as e:
        print(f"Error getting contacts: {e}")
        return jsonify({'error': 'Failed to get contacts'}), 500


@app.route('/contacts/<int:contact_id>', methods=['GET'])
@admin_required()
def get_contact(contact_id):
    try:
        contact = Contact.get_contact_by_id(contact_id)
        if contact:
            return jsonify({'contact': dict(contact)}), 200
        else:
            return jsonify({'error': 'Contact message not found'}), 404
    except Exception as e:
        print(f"Error getting contact: {e}")
        return jsonify({'error': 'Failed to get contact message'}), 500


@app.route('/contacts/<int:contact_id>/status', methods=['PUT'])
@admin_required()
def update_contact_status(contact_id):
    """Update contact status only (admin only)"""
    try:
        data = request.get_json()
        
        if 'status' not in data:
            return jsonify({'error': 'Status is required'}), 400
            
        new_status = data.get('status')
        if new_status not in ['pending', 'resolved']:
            return jsonify({'error': 'Invalid status. Must be pending or resolved'}), 400
        
        # Update contact status
        Contact.update_contact_status(contact_id, new_status)
        
        # Send email notification if status changed to resolved
        if new_status == 'resolved':
            contact = Contact.get_contact_by_id(contact_id)
            if contact:
                try:
                    contact_dict = dict(contact)
                    send_contact_status_email(
                        contact_dict['email'], 
                        contact_dict['full_name'], 
                        contact_dict['subject'], 
                        new_status
                    )
                    print(f"✅ Email notification sent for contact {contact_id}")
                except Exception as email_error:
                    print(f"❌ Failed to send email notification: {email_error}")
        
        return jsonify({'message': 'Contact status updated successfully'}), 200
        
    except Exception as e:
        print(f"Error updating contact status: {e}")
        return jsonify({'error': 'Failed to update contact status'}), 500


@app.route('/contacts/<int:contact_id>', methods=['PUT'])
@admin_required()
def update_contact(contact_id):
    """Update all contact fields (admin only)"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['full_name', 'email', 'phone', 'subject', 'message', 'status']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Get current contact to check if status is changing
        current_contact = Contact.get_contact_by_id(contact_id)
        current_status = current_contact['status'] if current_contact else 'pending'
        new_status = data.get('status')
        
        # Update all contact fields
        Contact.update_contact(contact_id, data)
        
        # Send email notification if status changed to resolved
        if current_status != 'resolved' and new_status == 'resolved':
            contact = Contact.get_contact_by_id(contact_id)
            if contact:
                try:
                    contact_dict = dict(contact)
                    send_contact_status_email(
                        contact_dict['email'], 
                        contact_dict['full_name'], 
                        contact_dict['subject'], 
                        new_status
                    )
                    print(f"✅ Email notification sent for contact {contact_id}")
                except Exception as email_error:
                    print(f"❌ Failed to send email notification: {email_error}")
        
        return jsonify({'message': 'Contact updated successfully'}), 200
        
    except Exception as e:
        print(f"Error updating contact: {e}")
        return jsonify({'error': 'Failed to update contact'}), 500


@app.route('/contacts/<int:contact_id>', methods=['DELETE'])
@admin_required()
def delete_contact(contact_id):
    try:
        Contact.delete_contact(contact_id)
        return jsonify({'message': 'Contact message deleted successfully'}), 200
    except Exception as e:
        print(f"Error deleting contact: {e}")
        return jsonify({'error': 'Failed to delete contact message'}), 500

# ... (keep the rest of the file the same)
# Profile picture upload
@app.route('/upload-profile-picture', methods=['POST'])
@user_required()
def upload_profile_picture():
    """Upload profile picture"""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type'}), 400
        
        # Secure filename and save
        filename = secure_filename(file.filename)
        user_data = get_current_user()
        user_id = user_data['user_id']
        filename = f"user_{user_id}_{filename}"
        
        filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
        file.save(filepath)
        
        # Update user profile
        User.update_profile_picture(user_id, filename)
        
        return jsonify({
            'message': 'Profile picture uploaded successfully',
            'filename': filename
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """Serve uploaded files"""
    return send_from_directory(Config.UPLOAD_FOLDER, filename)

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# JWT error handlers - simplified
def handle_jwt_error(error):
    return jsonify({'error': str(error)}), 401

if __name__ == '__main__':
    # Initialize database
    init_db()
    seed_admin_user()
    

    app.run(debug=True, host='0.0.0.0', port=5001)