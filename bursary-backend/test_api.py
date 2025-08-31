#!/usr/bin/env python3
"""
Simple test script to verify the Bursary Reporting System API
"""

import requests
import json

BASE_URL = "http://localhost:5001"

def test_api():
    print("🧪 Testing Bursary Reporting System API")
    print("=" * 50)
    
    # Test 1: Check if server is running
    print("1. Testing server connection...")
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            print("✅ Server is running!")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Server returned status {response.status_code}")
            return
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server. Make sure it's running on http://localhost:5001")
        return
    
    # Test 2: Test signup
    print("\n2. Testing user signup...")
    signup_data = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "test123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/signup", json=signup_data)
        if response.status_code == 201:
            print("✅ User signup successful!")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Signup failed: {response.status_code}")
            print(f"   Response: {response.json()}")
    except Exception as e:
        print(f"❌ Signup error: {e}")
    
    # Test 3: Test login
    print("\n3. Testing user login...")
    login_data = {
        "email": "test@example.com",
        "password": "test123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/login", json=login_data)
        if response.status_code == 200:
            print("✅ User login successful!")
            data = response.json()
            token = data.get('access_token')
            print(f"   Token received: {'Yes' if token else 'No'}")
            print(f"   User role: {data.get('user', {}).get('role')}")
        else:
            print(f"❌ Login failed: {response.status_code}")
            print(f"   Response: {response.json()}")
            return
    except Exception as e:
        print(f"❌ Login error: {e}")
        return
    
    # Test 4: Test admin login
    print("\n4. Testing admin login...")
    admin_data = {
        "email": "mainbursery@gmail.com",
        "password": "Admin123"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/login", json=admin_data)
        if response.status_code == 200:
            print("✅ Admin login successful!")
            data = response.json()
            admin_token = data.get('access_token')
            print(f"   Admin token received: {'Yes' if admin_token else 'No'}")
            print(f"   Admin role: {data.get('user', {}).get('role')}")
        else:
            print(f"❌ Admin login failed: {response.status_code}")
            print(f"   Response: {response.json()}")
    except Exception as e:
        print(f"❌ Admin login error: {e}")
    
    # Test 5: Test protected endpoint with token
    print("\n5. Testing protected endpoint...")
    if token:
        headers = {"Authorization": f"Bearer {token}"}
        try:
            response = requests.get(f"{BASE_URL}/profile", headers=headers)
            if response.status_code == 200:
                print("✅ Protected endpoint access successful!")
                print(f"   Response: {response.json()}")
            else:
                print(f"❌ Protected endpoint failed: {response.status_code}")
                print(f"   Response: {response.json()}")
        except Exception as e:
            print(f"❌ Protected endpoint error: {e}")
    else:
        print("❌ No token available for testing protected endpoint")
    
    print("\n" + "=" * 50)
    print("🎉 API testing completed!")
    print("\n📝 Next steps:")
    print("1. Start the frontend: cd frontend && npm run dev")
    print("2. Open http://localhost:5173 in your browser")
    print("3. Try logging in with the test account or admin account")

if __name__ == "__main__":
    test_api()
