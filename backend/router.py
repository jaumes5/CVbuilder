import logging
from typing import Optional

from backend.extra_description import switch_description
from experience_handler import ExperienceHandler
from utils import json_reader

from flask import Flask, render_template, request, jsonify
from waitress import serve
from paste.translogger import TransLogger

app = Flask(__name__, template_folder="../templates", static_folder="../static")
user_info: dict = {}
exp_handler: Optional[ExperienceHandler] = None
logger = logging.getLogger("waitress")
logger.setLevel(logging.ERROR)


@app.route("/health")
def health_check():
    resp = jsonify(health="healthy")
    resp.status_code = 200
    return resp


@app.route("/")
def index():
    return render_template("index.html", **user_info)


@app.route("/switch-description-type", methods=["POST"])
def switch_description_type():
    is_extended_description = request.form["is_extended_description"] == "true"
    return switch_description(is_extended_description, user_info)


@app.route("/filter", methods=["POST"])
def experience_filter():
    request_json = request.get_json()
    return jsonify(
        exp_handler.apply_filter(
            filter_exp=request_json["filter"],
            show_extra_description=request_json["toggle_state"],
        )
    )


def create_app(port: int = 3000, dev_mode: bool = False):
    global user_info
    global exp_handler
    logging.info(f"Starting the Flask app in port {port}")
    user_info = json_reader()
    exp_handler = ExperienceHandler(user_info["experiences"])
    app.debug = False
    if dev_mode:
        app.run(host="0.0.0.0", port=port)
    else:
        serve(TransLogger(app), host="0.0.0.0", port=port)
