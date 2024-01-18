from flask import Flask, jsonify, request
from flask_cors import CORS
from functions import generate_token, fetch_video_info
from pydantic import BaseModel
from typing import Union
from http import HTTPStatus
import awsgi

from StorageProvider.utils import (
    store_token,
    fetch_token,
    append_to_queue,
    dequeue_item,
)


class AppResponse(BaseModel):
    succ: bool
    data: Union[dict, str]


class QueueData(BaseModel):
    token: str
    video_id: str


def http_response(
    message="Succ", data: Union[list, str] = [], status_code=HTTPStatus.OK
):
    return (
        jsonify(
            {"success": status_code == HTTPStatus.OK, "message": message, "data": data}
        ),
        status_code,
    )


app = Flask(__name__)
CORS(
    app,
    resources={
        r"/*": {"origins": ["http://192.168.178.21:3000", "http://localhost:3000", "https://queue-yt.vercel.app"]}
    },
)


@app.route("/", methods=["GET"])
def index():
    return http_response(message="Hello World !", status_code=HTTPStatus.OK)


@app.route("/token", methods=["GET"])
def get_token():
    try:
        token = generate_token()
        # create_token = add_video(",", token) # -> bool
        if not store_token(token):
            return http_response(message=False, data=token, status_code=400)
        return http_response(message=True, data=token, status_code=HTTPStatus.OK)
    except Exception as e:
        return http_response(message=False, data=e, status_code=500)


@app.route("/queues/<token>", methods=["GET"])
def get_queue(token):
    try:
        queue_data = fetch_token(token)
        queue = queue_data.get("videos", [])
        videos_info = fetch_video_info(queue)
        response_data = {
            "videos": queue,
            "token": token,
            "videos_info": videos_info,
        }
        if not queue_data:
            return http_response(message=False, data=token, status_code=400)
        return http_response(
            message=True, data=response_data, status_code=HTTPStatus.OK
        )
    except Exception as e:
        return http_response(message=False, data=e, status_code=500)


@app.route("/videos/<token>", methods=["POST"])
def add_to_queue(token):
    try:
        queue_data = QueueData.model_validate(request.json)

        appended_to_queue = append_to_queue(token, queue_data.video_id)
        if not appended_to_queue:
            return http_response(
                message="Item Couldn't be added to the queue , Maybe check if it's already in Queue",
                status_code=HTTPStatus.BAD_REQUEST,
            )
        return http_response("Item has been added to the Queue !", HTTPStatus.OK)
    except Exception as e:
        return http_response(message=False, data=e, status_code=500)


@app.route("/videos/<token>", methods=["DELETE"])
def remove_from_queue(token):
    try:
        queue_data = QueueData.model_validate(request.json)
        video_id = queue_data.video_id
        _dequeue = dequeue_item(token, video_id)
        if not _dequeue:
            return http_response(
                False,
                "Not allowed to procced with this Action !",
                HTTPStatus.BAD_REQUEST,
            )
        return http_response(True, f"Item Dequeued {video_id} !", HTTPStatus.OK)
    except Exception as e:
        return http_response(message=False, data=e, status_code=500)


# @app.route("/items", methods=["POST"])
# def add_to_queue():
#     queue_data = QueueData.model_validate(request.json)
#     if not token_exists(queue_data.token):
#         return http_response(False, "Token Doesn't exists", HTTPStatus.BAD_REQUEST)
#     appended_to_queue = append_to_queue(queue_data.token, queue_data.video_id)
#     if not appended_to_queue:
#         return http_response(
#             message="Item Couldn't be added to the queue , Maybe check if it's already in Queue",
#             status_code=HTTPStatus.BAD_REQUEST,
#         )
#     return http_response("Item has been added to the Queue !", HTTPStatus.OK)


# @app.route("/queues/<token>", methods=["GET"])
# def get_queue(token):
#     if not token_exists(token):
#         return http_response("Token Doesn't exists", HTTPStatus.BAD_REQUEST)
#     queue = fetch_queue(token)
#     if not queue:
#         return http_response("It seems we have problem with the Queue !", HTTPStatus.OK)

#     queue = list(filter(None, queue[0].split(",")))
#     videos_info = fetch_video_info(queue)
#     data = {"videos": queue, "token": token, "videos_info": videos_info}
#     return http_response("Success", data, HTTPStatus.OK)


# @app.route("/dequeue", methods=["POST"])
# def dequeue():
#     queue_data = QueueData.model_validate(request.json)
#     video_id = queue_data.video_id
#     _dequeue = dequeue_item(queue_data.token, video_id)
#     if not _dequeue:
#         return http_response(
#             False, "Not allowed to procced with this Action !", HTTPStatus.BAD_REQUEST
#         )
#     return http_response(True, f"Item Dequeued {video_id} !", HTTPStatus.OK)


def lambda_handler(event, context):
    return awsgi.response(app, event, context)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
