var xhr = new XMLHttpRequest();

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
var url = "http://localhost:5000/api/questions";
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
                          <p class="blue-grey lighten-2 mb-0">Tasks</p>
                          <p class="font-medium-5 text-bold-400">26</p>
                      </div>
                      <div class="col-6 col-sm-3 col-md-6 col-lg-3 border-right-blue-grey border-right-lighten-5 text-center">
                          <p class="blue-grey lighten-2 mb-0">Completed</p>
                          <p class="font-medium-5 text-bold-400">58%</p>
                      </div>
                      <div class="col-6 col-sm-3 col-md-6 col-lg-3 border-right-blue-grey border-right-lighten-5 text-center">
                          <p class="blue-grey lighten-2 mb-0">Pending</p>
                          <p class="font-medium-5 text-bold-400">42%</p>
                      </div>
                      <div class="col-6 col-sm-3 col-md-6 col-lg-3 text-center">
                          <p class="blue-grey lighten-2 mb-0">Version</p>
                          <p class="font-medium-5 text-bold-400">4.5</p>
                      </div>
                  </div>

                  <h6 class="text-bold-600"> Task Completed:
                      <span>4/10</span>
                  </h6>
                  <div class="progress progress-sm mt-1 mb-0 box-shadow-2">
                      <div class="progress-bar bg-gradient-x-danger" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0"
                          aria-valuemax="100"></div>
                  </div>
                  <div class="media d-flex">
                      <div class="align-self-center">
                          <h6 class="text-bold-600 mt-2"> Client:
                              <span class="info">Xeon Inc.</span>
                          </h6>
                          <h6 class="text-bold-600 mt-1"> Deadline:
                              <span class="blue-grey">5th June, 2018</span>
                          </h6>
                      </div>
                      <div class="media-body text-right mt-2 d-md-block">
                          <span class="text-bold-600 mt-1"> Chameleon Team </span>
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
  parent.innerHTML = htmlString
  return parent.firstChild
}
