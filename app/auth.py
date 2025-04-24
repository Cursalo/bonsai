from functools import wraps
from flask import request, jsonify, g
from app.models import User

def require_api_key(f):
    """Decorator to require a valid API key via Authorization: Bearer <key> header."""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = None
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            api_key = auth_header.split(' ')[1]
        elif request.headers.get('X-API-Key'): # Allow fallback to custom header
             api_key = request.headers.get('X-API-Key')

        if not api_key:
            return jsonify({"error": "Authorization required"}), 401

        user = User.query.filter_by(api_key=api_key).first()
        if not user:
            return jsonify({"error": "Invalid API Key"}), 401

        g.current_user = user # Store user in Flask's g for access in the route
        return f(*args, **kwargs)
    return decorated_function 