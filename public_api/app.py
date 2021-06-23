from flask import Flask, request
from flask_cors import CORS, cross_origin
from db import get_stats, update_identification_doc

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
    # TODO: Call AI identifier from `ocr_engine` here and return results
    return {
        "accuracy": 87,
        "alt_characters": [
            {"character": "t", "accuracy": 42},
            {"character": "z", "accuracy": 37},
            {"character": "y", "accuracy": 35},
        ],
        "character": "x",
        "ref": "302228678981452301"
    }


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
        request_data["isAccurate"]
    )

    return {
        "data": {
            "dbSuccess": db_success
        },
    }


# Server setup and start
if __name__ == "__main__":
    app.run(debug=True)
