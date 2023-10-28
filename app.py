from flask import Flask

app = Flask(__name__)

# ROUTES

@app.route("/test", methods=['GET'])
def test_vals():
    return "test"


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000)