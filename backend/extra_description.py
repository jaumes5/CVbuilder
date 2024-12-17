from copy import deepcopy
from typing import Any

from flask import jsonify

from backend.experience_handler import ExperienceHandler


def switch_description(is_extended_description: bool, user_info: dict[str, Any]):
    if not is_extended_description:
        return jsonify(ExperienceHandler.cast_to_html(user_info["experiences"]))
    extended_user_info = deepcopy(user_info)
    for experience in extended_user_info["experiences"]:
        experience["description"] += experience.get("extended-description", "")
    return jsonify(ExperienceHandler.cast_to_html(extended_user_info["experiences"]))
