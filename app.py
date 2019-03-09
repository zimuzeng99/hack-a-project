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

@app.route("/api/questions", methods=["GET"])
def questionsAPI():
    groupID = int(request.args.get("groupID"))
    jsonFile = open("groups.json")
    data = json.load(jsonFile)
    for group in data:
        if group["id"] == groupID:
            return jsonify(group["questions"])

@app.route("/api/challenges", methods=["GET"])
def challengesAPI():
    groupID = int(request.args.get("groupID"))
    jsonFile = open("groups.json")
    data = json.load(jsonFile)
    for group in data:
        if group["id"] == groupID:
            return jsonify(group["challenges"])


@app.route("/api/addQuestion/<int:groupID>/<int:userID>", methods=["POST"])
def addQuestion(groupID, userID):
    newEntry = {}
    newEntry["question"] = request.form.get("question")
    newEntry["description"] = request.form.get("description")
    newEntry["askedBy"] = "Anthony Sirosias"
    newEntry["isAnswered"] = False
    newEntry["answers"] = []
    jsonFile = open("groups.json")
    data = json.load(jsonFile)
    for group in data:
        if group["id"] == groupID:
            group["questions"].append(newEntry)
    jsonStr = json.dumps(data)
    jsonFile = open("groups.json", "w")
    jsonFile.write(jsonStr)
    print("/questions.html?groupID=" + str(groupID) + "&currentUser=" + str(userID))
    return redirect("/questions.html?groupID=" + str(groupID) + "&currentUser=" + str(userID))

# Any URL not handled by the above '@app.route's is handled here. Most importantly
# this allows additional resources like images and CSS files to be provided to the browser upon request
@app.route("/<path:path>")
def catchAll(path):
    return send_file(path[ : path.find("?")])

if __name__ == "__main__":
    app.run()
