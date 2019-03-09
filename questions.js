var xhr = new XMLHttpRequest();

var currentUser = "Anthony Sirosias";

questionCardContainer = document.getElementById("questionCardContainer");

// Adds one new flashcard to the page for each search result
xhr.addEventListener("load", function(e) {
  var response = JSON.parse(xhr.responseText);
  for (var i = 0; i < response.length; i++) {
    var newCard = createQuestionCard(response[i]);
    questionCardContainer.appendChild(newCard);
    console.log(newCard);
  }
});

// Send the request to the Flask API in order to retrieve search results
var url = window.location.protocol + "//" + window.location.host + "/" + "api/questions";
xhr.open("GET", url);
xhr.send();

function createQuestionCard(question) {
  var htmlString = `<div class="col-12 col-lg-6">
      <div class="card">
          <div class="card-header">
              <h4 class="card-title">${question.question}</h4>
              <span class="text-medium-1 danger line-height-2 text-uppercase">${question.askedBy}</span>
                  <div class="heading-elements">
                      <ul class="list-inline mb-0 display-block">
                          <li>
                              <a class="btn btn-md btn-danger box-shadow-2 round btn-min-width pull-right" href="#" target="_blank">In Progress</a>
                          </li>
                      </ul>
                  </div>
          </div>
          <div class="card-content collapse show">
              <div class="card-body pt-0 pb-1">
                  <p>${question.description}</p>
                  <div class="row mb-1">
                      <div class="col-6 col-sm-3 col-md-6 col-lg-3 border-right-blue-grey border-right-lighten-5 text-center">
                          <p class="blue-grey lighten-2 mb-0">Answers</p>
                          <p class="font-medium-5 text-bold-400">${question.answers.length}</p>
                      </div>
                  </div>
                  <div class="media d-flex">
                      <div class="align-self-center">
                          <h6 class="text-bold-600 mt-2"> Asked by:
                              <span class="info">${question.askedBy}</span>
                          </h6>
                      </div>
                      <div class="media-body text-right mt-2 d-md-block">
                          <span class="text-bold-600 mt-1"> People Answered </span>
                          <ul class="list-unstyled users-list">
                              <li data-toggle="tooltip" data-popup="tooltip-custom" data-original-title="John Doe" class="avatar avatar-sm pull-up">
                                  <img class="media-object rounded-circle" src="app-assets/images/portrait/small/avatar-s-19.png" alt="Avatar">
                              </li>
                              <li data-toggle="tooltip" data-popup="tooltip-custom" data-original-title="Katherine Nichols" class="avatar avatar-sm pull-up">
                                  <img class="media-object rounded-circle" src="app-assets/images/portrait/small/avatar-s-18.png" alt="Avatar">
                              </li>
                              <li data-toggle="tooltip" data-popup="tooltip-custom" data-original-title="Joseph Weaver" class="avatar avatar-sm pull-up">
                                  <img class="media-object rounded-circle" src="app-assets/images/portrait/small/avatar-s-17.png" alt="Avatar">
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>`;

  var parent = document.createElement("div");
  parent.innerHTML = htmlString;
  return parent.firstChild;
}
