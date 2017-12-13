// This section initializes Firebase with my credentials and configures the information to be routed to the database.
var config = {
    apiKey: "AIzaSyDFkU5gRlA7tjXcDgbQogosXQQK5omUpbE",
    authDomain: "polar-express-cdbb4.firebaseapp.com",
    databaseURL: "https://polar-express-cdbb4.firebaseio.com",
    projectId: "polar-express-cdbb4",
    storageBucket: "polar-express-cdbb4.appspot.com",
    messagingSenderId: "580381818062"
  };

firebase.initializeApp(config);

var database = firebase.database();

//This section adds an "on click" event function that allows the user input to be recorded into each of the four input sections.
$("#add-city-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var depcity = $("#departure-city-input").val().trim();
  var descity = $("#destination-input").val().trim();
  var firsttrain = $("#start-input").val().trim();
  var arrival = $("#arrival-input").val().trim();

  //This section creates local "temporary" object for holding employee data
  var newCity = {
    city: depcity,
    goingto: descity,
    gettingto: arrival,
    howlong: firsttrain
  };

  //This section "pushes" the data to firebase creating a persitant database for the information submitted.
  database.ref().push(newCity);

  //This section console logs each element to ensure it is rendereding the desired results.
  console.log(newCity.city);
  console.log(newCity.goingto);
  console.log(newCity.gettingto);
  console.log(newCity.howlong);

  // Alert
  alert("Destination successfully added");

  //This section allows each section to clear after being submitted.
  $("#departure-city-input").val("");
  $("#destination-input").val("");
  $("#arrival-input").val("");
  $("#start-input").val("");
});

// 3. This section creates a Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var depcity = childSnapshot.val().city;
  var descity = childSnapshot.val().goingto;
  var arrival = childSnapshot.val().gettingto;
  var firsttrain = childSnapshot.val().howlong;

  console.log(depcity);
  console.log(descity);
  console.log(arrival);
  console.log(firsttrain);

  //This variable creates/pulls the current time from moment.js in the requested format of "HH:mm".
  var currentTime = moment().format("HH:mm");
  console.log(currentTime);

  //This variable takes the information input in the "firsttrain" section and converts it to the "HH:mm" format.
  var convertedTime = moment(firsttrain, "HH:mm").subtract(1,"years");

  //This variable uses the moment.diff method to convert the convertedTime variable to minutes.
  var diffTime = moment().diff(moment(convertedTime), "minutes");

  //This variable gives the remainder of the diffTime and arrival variables.
  var remainder = diffTime % arrival;
  console.log(remainder);

  //This variable subtracts the arrival varibale from the remainder variable.
  var nextArrival = arrival - remainder;
  console.log(nextArrival);

  //This variable uses the moment.add method to add the nextArrival variable in minutes and in the "HH:mm" format.
  var nextTrain = moment().add(nextArrival, "minutes").format("HH:mm");
  console.log(nextTrain);


  //This section adds data into the the results table for viewing.
  $("#schedule-table > tbody").append("<tr><td>" + depcity + "</td><td>" + descity + "</td><td>" +
  arrival + "</td><td>" + nextTrain + "</td><td>" + nextArrival + "</td></tr>");

  
  //This section was my attempt to try and get the page to reload automatically every minute.
  //location.reload(){

  //setInterval("#schedule-table", 60000);

});
