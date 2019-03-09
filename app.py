import sqlite3
from flask import Flask, request, redirect, send_file, jsonify
import json

app = Flask(__name__)

@app.route("/")
def indexPage():
    return send_file("user-dashboard.html")

@app.route("/api/groups", methods=["GET"])
def groupsAPI():
    userID = int(request.args.get("userID"))
    jsonFile = open("groups.json")
    data = json.load(jsonFile)
    groups = []
    for group in data:
        if userID in group["members"]:
            groups.append(group)
    return jsonify(groups)

@app.route("/api/users", methods=["GET"])
def usersAPI():
    userID = int(request.args.get("userID"))
    jsonFile = open("users.json")
    data = json.load(jsonFile)
    for user in data:
        if user["id"] == userID:
            return jsonify(user)

# Any URL not handled by the above '@app.route's is handled here. Most importantly
# this allows additional resources like images and CSS files to be provided to the browser upon request
@app.route("/<path:path>")
def catchAll(path):
    return send_file(path)

if __name__ == "__main__":
    app.run()
