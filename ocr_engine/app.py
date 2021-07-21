from flask import Flask, request
from flask_cors import CORS, cross_origin
from db import get_stats, update_identification_doc, create_identification_doc
from main import predictCharacter


# Route paths
API_BASE_ROUTE = "/ocr-api"
HEALTHCHECK_ROUTE = f"{API_BASE_ROUTE}/healthcheck"
IDENTIFY_CHARACTER_ROUTE = f"{API_BASE_ROUTE}/identify"
RETRIEVE_STATS_ROUTE = f"{API_BASE_ROUTE}/stats"
VERIFY_RESULT_ROUTE = f"{API_BASE_ROUTE}/verify"

# Constants
GET_REQUEST = "GET"
POST_REQUEST = "POST"
PATCH_REQUEST = "PATCH"

# Server configuration
app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


# Route definitions
@app.route(HEALTHCHECK_ROUTE, methods=[GET_REQUEST])
@cross_origin()
def healthcheck():
    return "OCR API is up and running!"


@app.route(IDENTIFY_CHARACTER_ROUTE, methods=[POST_REQUEST])
@cross_origin()
def identify_character():
    # TODO: Uncomment this and remove `data` below
    # request_data = request.get_json(force=True)
    # image_string = request_data["image"]
    # image_string += "=" * (4 - (len(image_string) % 4))

    # print(image_string)
    # response = predictCharacter(image_string)

    # return response
    data = {
        "accuracy": 87,
        "alt_characters": [
            {"character": "t", "accuracy": 42},
            {"character": "z", "accuracy": 37},
            {"character": "y", "accuracy": 35},
        ],
        "character": "x",
        "ref": "304750175650316865"
    }

    create_identification_doc(data)

    return data


@app.route(RETRIEVE_STATS_ROUTE, methods=[GET_REQUEST])
@cross_origin()
def retrieve_stats():
    return {
        "data": get_stats()
    }


@app.route(VERIFY_RESULT_ROUTE, methods=[PATCH_REQUEST])
@cross_origin()
def verify_result():
    request_data = request.get_json(force=True)
    db_success = update_identification_doc(
        request_data["ref"],
        request_data["is_accurate"]
    )

    return {
        "data": {
            "db_success": db_success
        },
    }


# Server setup and start
if __name__ == "__main__":
    app.run(debug=True)
