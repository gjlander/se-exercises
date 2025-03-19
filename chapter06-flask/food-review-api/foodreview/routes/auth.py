from flask import Blueprint, request, jsonify
from ..db import get_connection
 
auth_bp = Blueprint('auth', __name__, url_prefix='/auth')
 
@auth_bp.post('/register')
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        # Basic input validation
        if not username or not email or not password:
            return jsonify({'error': 'Username, email, and password are required'}), 400
        conn = get_connection()
        cur = conn.cursor()
        # Check if the email already exists
        cur.execute("SELECT id FROM users WHERE email = %s", (email,))
        existing_user = cur.fetchone()
        if existing_user:
            cur.close()
            conn.close()
            return jsonify({'error': 'Email is already registered'}), 409
        # Insert the new user
        cur.execute(
            "INSERT INTO users (username, email, password) VALUES (%s, %s, %s) RETURNING *",
            (username, email, password)
        )
        user = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({
                'id': user[0],
                'username': user[1],
                'email': user[2]
                }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500