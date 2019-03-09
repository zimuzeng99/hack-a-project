var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var userID = getUrlParameter("userID");
var groupID = Number(getUrlParameter("groupID"));

  var url = window.location.protocol + "//" + window.location.host + "/" + "api/addQuestion/";
  var params = groupID + "/" + userID;
document.getElementById("questionForm").action = url + params;
