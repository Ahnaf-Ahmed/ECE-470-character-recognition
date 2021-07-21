import json
from faunadb import query as q
from faunadb.client import FaunaClient
from db_constants import FAUNA_DB_COLLECTION_NAME, FAUNA_DB_SECRET

client = FaunaClient(secret=FAUNA_DB_SECRET)


def create_identification_doc(doc):
    '''Creates a new document in the database.'''

    doc["is_accurate"] = 'UNKNOWN'

    try:
        result = client.query(
            q.create(
                q.collection(FAUNA_DB_COLLECTION_NAME),
                {
                    "data": doc
                }
            )
        )

        print("CREATE_IDENTIFICATION_DOC LOG:")
        print(result)

        # TODO: Test this and return the doc ref
        return True
    except:
        return False


def update_identification_doc(ref, isAccurate):
    '''Update a document `isAccurate` status by ref.'''
    try:
        result = client.query(
            q.update(
                q.ref(q.collection(FAUNA_DB_COLLECTION_NAME), ref),
                {
                    "data": {
                        "is_accurate": isAccurate
                    }
                }
            )
        )

        print("UPDATE_IDENTIFICATION_DOC LOG:")
        print(result)

        return True
    except:
        return False


def get_stats():
    '''Gets first 1000 model hits from database.'''

    try:
        # Get documents from database
        result = client.query(
            q.map_(
                q.lambda_(
                    "doc",
                    q.get(q.var("doc"))
                ),
                q.paginate(
                    q.documents(
                        q.collection(FAUNA_DB_COLLECTION_NAME)
                    ),
                    size=1000
                )
            )
        )

        # Extract data from documents and convert into list
        identification_data = list(
            map(
                lambda doc: doc["data"],
                result["data"]
            )
        )

        print("GET_STATS LOG:")
        print(json.dumps(identification_data, indent=2))

        return identification_data

    except:
        return False
