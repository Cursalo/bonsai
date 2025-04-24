from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    # Import and register Blueprints here
    # from app import routes # Import routes after app initialization
    # app.register_blueprint(routes.bp) # Example blueprint registration
    from app.routes import bp as main_bp
    app.register_blueprint(main_bp)

    # Error handling, logging, etc.

    return app

# Import models at the bottom to avoid circular imports
from app import models 