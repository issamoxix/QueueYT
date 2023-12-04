from flask import Flask, jsonify, abort, request
from functions import generate_token
from pydantic import BaseModel
from typing import Union
from db.tokens import add_video, token_exists, append_to_queue


class AppResponse(BaseModel):
    succ: bool
    data: Union[list, str]

class QueueData(BaseModel):
    token: str
    video_id:str


def http_response(succ: bool, data: Union[list, str], status_code: int):
    response_model = AppResponse(succ=succ, data=data).model_dump()
    if status_code == 200:
        return jsonify(response_model)
    return abort(400, response_model)


app = Flask(__name__)


@app.route("/token", methods=["GET"])
def get_token():
    token = generate_token()
    create_token = add_video(",", token)
    return http_response(succ=create_token, data=token, status_code=200)


@app.route("/addItem", methods=["POST"])
def add_to_queue():
    queue_data = QueueData.model_validate(request.json)
    if not token_exists(queue_data.token):
        return http_response(False, "Token Doesn't exists", 200)
    append_to_queue(queue_data.token, queue_data.video_id)

    return http_response(True, "Item has been added to the Queue !", 200)

