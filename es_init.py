from elasticsearch import Elasticsearch, helpers #helpers is optional, for bulk calls
import json

# Create the client instance
client = Elasticsearch(
    "https://localhost:9200",
    basic_auth=("elastic", "IWm84=grVXROuhKqzwPQ"),
    verify_certs=False,
)

# Successful response!
client.info()

with open("./locations.json", "r") as f:
    locations = json.load(f)


actions = [
    {
        "_index": "locations",
        "_id": str(item["id"]),
        "_source": item,
    }
    for item in locations["data"]
]

helpers.bulk(client, actions)