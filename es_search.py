from elasticsearch import Elasticsearch

# create the elasticsearch client, pointing to local instance
es = Elasticsearch(
    "https://localhost:9200",
    basic_auth=("elastic", "IWm84=grVXROuhKqzwPQ"),
    verify_certs=False,
)

print(es.search(index="locations", size=10, query={"bool": { "should": [{"match": { "description": "men's shoes" } }] } })['hits']['hits'])