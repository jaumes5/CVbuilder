import logging
from typing import Optional

from experience_handler import ExperienceHandler
from utils import json_reader

from flask import Flask, render_template, request, jsonify


app = Flask(__name__, template_folder="../templates", static_folder="../static")
user_info: dict = {}
exp_handler: Optional[ExperienceHandler] = None


@app.route("/health")
def health_check():
    resp = jsonify(health="healthy")
    resp.status_code = 200
    return resp


@app.route("/")
def index():
    return render_template("index.html", **user_info)


@app.route("/filter", methods=["POST"])
def experience_filter():
    return jsonify(exp_handler.apply_filter(request.get_json()["filter"]))


def create_app(port: int = 3000):
    global user_info
    global exp_handler
    logging.info(f"Starting the Flask app in port {port}")
    user_info = json_reader()
    exp_handler = ExperienceHandler(user_info["experiences"])
    app.debug = False
    app.run(host="0.0.0.0", port=port)