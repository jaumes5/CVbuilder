from experience_handler import ExperienceHandler
from utils import json_reader

from flask import Flask, render_template, request, jsonify


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html", **user_info)


@app.route("/filter", methods=["POST"])
def experience_filter():
    return jsonify(exp_handler.apply_filter(request.form["filter"]))


if __name__ == "__main__":
    user_info = json_reader()
    exp_handler = ExperienceHandler(user_info["experiences"])
    app.debug = True
    app.run()  # go to http://localhost:5000/ to view the page.
