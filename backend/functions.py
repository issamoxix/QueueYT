import random
import string


def generate_token(N=5):
    return "".join(
        random.choice(string.ascii_uppercase + string.digits) for _ in range(N)
    )
