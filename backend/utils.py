import json


def json_reader(file_path: str = "content.json") -> dict:
    with open(file_path, encoding="utf-8") as file:
        return json.load(file)
