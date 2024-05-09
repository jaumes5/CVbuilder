import argparse
from typing import Optional

from experience_handler import ExperienceHandler
from utils import json_reader

from flask import Flask, render_template, request, jsonify


app = Flask(__name__)
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
    return jsonify(exp_handler.apply_filter(request.form["filter"]))


def arg_parser():
    parser = argparse.ArgumentParser(description="Run the Flask app")
    parser.add_argument(
        "-p",
        "--port",
        type=int,
        default=3000,
        help="Port to run the app on (default 3000)",
    )
    return parser.parse_args()


def create_app(port: int = 3000):
    global user_info
    global exp_handler
    user_info = json_reader()
    exp_handler = ExperienceHandler(user_info["experiences"])
    app.debug = False
    app.run(host="0.0.0.0", port=port)


def main():
    args = arg_parser()
    create_app(args.port)


if __name__ == "__main__":
    main()
