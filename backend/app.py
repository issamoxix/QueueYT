from services.awsgi import response
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask import make_response
from pydantic import BaseModel
from typing import Union
from http import HTTPStatus

from utils.functions import generate_token, fetch_video_info
from StorageProvider.utils import (
    store_token,
    fetch_token,
    append_to_queue,
    dequeue_item,
)
from utils.functions import fetch_videos_by_keyword


class AppResponse(BaseModel):
    succ: bool
    data: Union[dict, str]


class QueueData(BaseModel):
    token: str
    video_id: str


def http_response(
    message: Union[bool, str] = "Succ",
    data: Union[list, str] = [],
    status_code: Union[str, int, tuple] = HTTPStatus.OK,
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
        r"/*": {"origins": ["http://localhost:3000", "https://queue-yt.vercel.app"]}
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
        response = make_response(
            http_response(message=True, data=token, status_code=HTTPStatus.OK)
        )
        response.headers["Cache-Control"] = "public, max-age=60"  # 1 minute
        return response
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


@app.route("/search/<keyword>", methods=["GET"])
def search(keyword):
    return http_response(message="Server Error", data=keyword, status_code=500)
    try:
        videos = fetch_videos_by_keyword(keyword)
        if not videos:
            return http_response(message="Server Error", data=keyword, status_code=500)
        return http_response(message=True, data=videos, status_code=HTTPStatus.OK)
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


def lambda_handler(event, context):
    return response(app, event, context)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
