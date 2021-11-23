from flask import Flask
import os

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.urandom(16).hex()  
    

    from views.landing import landing_blueprint
    from views.api import api_blueprint

    app.register_blueprint(landing_blueprint, url_prefix="/")
    app.register_blueprint(api_blueprint, url_prefix="/api")

    return app


