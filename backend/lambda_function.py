from services.awsgi import response
from app import app


def lambda_handler(event, context):
    return response(app, event, context)
