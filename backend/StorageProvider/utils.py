from .provider import StorageProvider
import json
import qrcode
from io import BytesIO


def store_token(token) -> bool:
    """
    Stores the token in the storage provider
    and create qr code for the token

    Args:
        token (str): token to store
    
    Returns:
        bool: True if successful, False otherwise
    """
    provider = StorageProvider(token=token)
    json_data = {"token": token, "videos": []}
    try:
        qr_token = generate_qrcode(token)
        provider.upload_file(f"qrcodes/{token}.png", qr_token)
    except:
        qr_token = False

    if provider.create_object(json.dumps(json_data)):
        return True
    return False


def generate_qrcode(token):
    try:
        url = f"https://queue-yt.vercel.app/add?token={token}"
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
        )
        qr.add_data(url)
        qr.make(fit=True)
        qr_img = qr.make_image(fill_color="black", back_color="white")

        image_buffer = BytesIO()
        qr_img.save(image_buffer)
        image_buffer.seek(0)
        return image_buffer
    except:
        return False


def fetch_token(token):
    """
    Fetches the token from the storage provider

    Args:
        token (str): token to fetch

    Returns:
        dict: token data if successful, False otherwise
    """
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
