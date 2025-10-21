from flask import Flask
from .routes import auth_bp, restaurants_bp
 
def create_app():
    app = Flask(__name__, instance_relative_config=True)
 
    app.register_blueprint(auth_bp)
    app.register_blueprint(restaurants_bp)
 
    return app