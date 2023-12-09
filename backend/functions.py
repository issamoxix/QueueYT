import random
import string
import requests
import os


def generate_token(N=5):
    return "".join(
        random.choice(string.ascii_uppercase + string.digits) for _ in range(N)
    )


def fetch_video_info(video_ids: list[str], part: str = "snippet"):

    api_key = os.environ.get('API_KEY')
    if not api_key:
        print("API Key not found in environment variables.")
        return {}
    url = "https://youtube.googleapis.com/youtube/v3/videos"
    params = {"part": part, "id": ",".join(video_ids), "key": api_key}
    headers = {"Accept": "application/json"}
    response = requests.get(url, params=params, headers=headers, timeout=15)
    response.raise_for_status()
    items =  response.json().get("items", [])
    data = {item.get("id"):item for item in items}
    return data
