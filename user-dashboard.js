var xhr = new XMLHttpRequest();

var currentUserID = 1;
var currentUsername = "Anthony Sirosias";

document.getElementById("userName1").innerHTML = currentUsername;
document.getElementById("userName2").innerHTML = currentUsername;
groupsContainer = document.getElementById("groupsContainer");

// Adds one new flashcard to the page for each search result
xhr.addEventListener("load", function(e) {
  var response = JSON.parse(xhr.responseText);
  for (var i = 0; i < response.length; i++) {
    var newEntry = createGroupEntry(response[i]);
    groupsContainer.appendChild(newEntry);
  }
});

// Send the request to the Flask API in order to retrieve search results
var url = window.location.protocol + "//" + window.location.host + "/" + "api/groups";
var params = "userID=" + currentUserID;
xhr.open("GET", url + "?" + params);
xhr.send();

var xhr2 = new XMLHttpRequest();
// Adds one new flashcard to the page for each search result
xhr2.addEventListener("load", function(e) {
  var response = JSON.parse(xhr2.responseText);
  console.log(response);
  document.getElementById("fBuckCount").innerHTML = String(response.currentFBucks);
  document.getElementById("questionsCount").innerHTML = String(response.questionsAnswered);
  document.getElementById("challengesCount").innerHTML = String(response.challengesPending);
});

// Send the request to the Flask API in order to retrieve search results
url = window.location.protocol + "//" + window.location.host + "/" + "api/users";
params = "userID=" + currentUserID;
xhr2.open("GET", url + "?" + params);
xhr2.send();

function createGroupEntry(group) {
  var htmlString = `<tr>
                                    <td class="text-truncate align-middle">
                                        <a href="#">${group.groupName}</a>
                                    </td>
                                    <td class="text-truncate">
                                        <ul class="list-unstyled users-list m-0">
                                            <li data-toggle="tooltip" data-popup="tooltip-custom" data-original-title="John Doe" class="avatar avatar-sm pull-up">
                                                <img class="media-object rounded-circle" src="app-assets/images/portrait/small/avatar-s-19.png" alt="Avatar">
                                            </li>
                                            <li data-toggle="tooltip" data-popup="tooltip-custom" data-original-title="Katherine Nichols" class="avatar avatar-sm pull-up">
                                                <img class="media-object rounded-circle" src="app-assets/images/portrait/small/avatar-s-18.png" alt="Avatar">
                                            </li>
                                            <li data-toggle="tooltip" data-popup="tooltip-custom" data-original-title="Joseph Weaver" class="avatar avatar-sm pull-up">
                                                <img class="media-object rounded-circle" src="app-assets/images/portrait/small/avatar-s-17.png" alt="Avatar">
                                            </li>
                                            <li class="avatar avatar-sm">
                                                <span class="badge badge-info">+2 more</span>
                                            </li>
                                        </ul>
                                    </td>
                                    <td>
                                        <div class="progress progress-sm mt-1 mb-0 box-shadow-2">
                                            <div class="progress-bar bg-gradient-x-success" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </td>
                                    <td class="text-truncate pb-0">
                                      <span></span>
                                  </td>
                                </tr>
`;

  var parent = document.createElement("tbody");
  parent.innerHTML = htmlString;
  return parent.firstElementChild;
}
