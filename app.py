import sqlite3
from flask import Flask, request, redirect, send_file, jsonify
import json

app = Flask(__name__)

"""
db = sqlite3.connect("alexaranks.db")
cursor = db.cursor()
cursor.execute("select * from ranks;")
results = cursor.fetchall()

db.close()
"""

@app.route("/")
def indexPage():
    return send_file("user-dashboard.html")

@app.route("/api/questions")
def questionsAPI():
    jsonFile = open("questions.json")
    data = json.load(jsonFile)
    print(data)
    return jsonify(data)

# Any URL not handled by the above '@app.route's is handled here. Most importantly
# this allows additional resources like images and CSS files to be provided to the browser upon request
@app.route("/<path:path>")
def catchAll(path):
    return send_file(path)

if __name__ == "__main__":
    app.run()
