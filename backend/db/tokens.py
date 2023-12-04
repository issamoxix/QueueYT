from . import execute_query, fetch_data

def try_except(func):
    def wrapper(*args, **kwargs):
        try:
            result = func(*args, **kwargs)
            return result
        except Exception as e:
            print("Error in db level: ", e) # Change this to logs
            return False
    return wrapper


@try_except
def add_video(video_id, token) -> bool:
    query = f"INSERT INTO playlists (videoId, token) VALUES ('{video_id}', '{token}')"
    execute_query(query)
    return True

@try_except
def token_exists(token):
    query = f"SELECT * FROM playlists WHERE token = '{token}'"
    fetch_one = fetch_data(query, fetch_one=True)
    if not fetch_one:
        return False
    return True

@try_except
def append_to_queue(token, item):
    query = f"SELECT videoId FROM playlists WHERE token = '{token}'"
    fetch_one = fetch_data(query, fetch_one=True)
    queue = list(filter(None,fetch_one[0].split(",")))
    queue.append(item)
    queue_str = ",".join(queue)
    if len(queue) <= 1:
        queue_str += ","

    update_query = f"UPDATE playlists SET videoId = '{queue_str}' WHERE token = '{token}'"
    execute_query(update_query)

    return True

@try_except
def fetch_queue(token):
    query = f"SELECT videoId FROM playlists where token= '{token}'"
    fetch_one = fetch_data(query, fetch_one=True)
    return fetch_one