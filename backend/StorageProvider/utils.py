from .provider import StorageProvider
import json


def store_token(token) -> bool:
    provider = StorageProvider(token=token)
    json_data = {"token": token, "videos": []}
    if provider.create_object(json.dumps(json_data)):
        return True
    return False


def fetch_token(token):
    try:
        provider = StorageProvider(token=token)
        token_data = provider.get_object(token)
        return json.loads(token_data)
    except:
        return False


def append_to_queue(token, video_id):
    provider = StorageProvider(token=token)
    token_data = provider.get_object(token)
    queue_data = json.loads(token_data)
    if not token_data:
        return False
    if video_id in queue_data["videos"]:
        return False
    queue_data["videos"].append(video_id)
    if provider.create_object(json.dumps(queue_data)):
        return True
    return False

def dequeue_item(token, video_id):
    provider = StorageProvider(token=token)
    token_data = provider.get_object(token)
    queue_data = json.loads(token_data)
    if not token_data:
        return False
    if video_id not in queue_data["videos"]:
        return False
    queue_data["videos"].remove(video_id)
    if provider.create_object(json.dumps(queue_data)):
        return True
    return False