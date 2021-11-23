from flask import Blueprint, jsonify, request
from pathlib import Path
import json
from schemas.form import InputComponent, SelectComponent


api_blueprint = Blueprint("api", __name__)


BASEDIR = Path(__file__).resolve().parent.parent
JSON_PATH = Path.joinpath(BASEDIR, "static", "json", "form_schema.json")


def save_component(component_dict) -> None:
    with open(JSON_PATH, "r") as jsonFile:
        data = json.load(jsonFile)

    data["data"]["form"]["fields"]["components"].append(component_dict) 

    with open(JSON_PATH, "w") as jsonFile:
        json.dump(data, jsonFile, indent=4)


@api_blueprint.route("/serve_json")
def serve_json():
    with open(JSON_PATH, "r") as f_json:
        data = json.load(f_json)
    return jsonify(data)


@api_blueprint.route("/create_component", methods=["POST"])
def create_component():
    if request.method == "POST":
        data = request.get_json(force=True)
        component = None

        print(data)

        node_name = data["node_name"]
        if node_name == "input":
            component = InputComponent(**data)
        elif node_name == "select":
            component = SelectComponent(**data)
        else:
            return jsonify(status="error", message=f"Component named {node_name} not found")
        
        try:
            save_component(component.dict())
            return jsonify(status="success" , message="component saved")
        except Exception as e:
            return jsonify(status="error", message=f"{e}")

@api_blueprint.route("/create_component_with_meta", methods=["POST"])
def create_component_with_meta():
    pass
