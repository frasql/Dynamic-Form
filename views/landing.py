from flask import Blueprint, render_template

 
landing_blueprint = Blueprint("landing", __name__)

@landing_blueprint.route("/")
def index():
    return render_template("index.html")

