var current = 0;
var page = "main";
var loggedIn = false;
var url = "https://my-dragon-app.herokuapp.com"

//when authenticating you don't have to query again, you can do it from the same query
//self.session["userId"] = uid (sudo code) you get this out of the database
//self.session["userId"] = user_id
//right before you issue 201 you put the sudo code above
document.getElementById('loginscreen').style.display = "none";
//click update, know which one updating, once clicked edit need to know which one changed , or else wtf. 
var upboton = document.querySelector("updateboton");
var addboton = document.querySelector("addboton");

var getCharacters = function () {
  fetch(url + "/characters", {
    credentials: "include",
  }).then(function (response) {
      if (response.status == 401){
        displayBackground();
        return;
      }
    response.json().then(function (data) {
      document.getElementById("background-red").style.display = "block";
      document.getElementById('orange').style.display = "block";
      document.getElementById('orange').style.backgroundColor = "white";
      document.getElementById("logbut").style.display = "none";

      document.getElementById('home').style.display = "block";
      //document.getElementById('background-red').style.display = "block";
      console.log("data received from server:", data);

      // loop over the data and display it immediately:
      var characterList = document.querySelector("#characters");
      characterList.innerHTML = "";
      data.forEach(function (characters) {
        // append each restaurant to a new element in the DOM

        // li tag: contains everything about one character
        var newListItem = document.createElement("li");

        // h3 tag: contains the title
        var titleHeading = document.createElement("h3");
        titleHeading.innerHTML = characters.name;
        newListItem.appendChild(titleHeading);
        //power technique speed difficulty

        //div tag: contains the character power
        var powerDiv = document.createElement("div");
        powerDiv.innerHTML = "Power: " + characters.power;
        newListItem.appendChild(powerDiv);

        //div tag: contains the character technique
        var techniqueDiv = document.createElement("div");
        techniqueDiv.innerHTML = "Technique: " + characters.technique;
        //techniqueDiv.innerHTML = "<span style='font-size:40px'>Technique: </span>" + characters.technique;
        newListItem.appendChild(techniqueDiv);

        //div tag: contains the character speed
        var speedDiv = document.createElement("div");
        speedDiv.innerHTML = "Speed: " + characters.speed;
        newListItem.appendChild(speedDiv);

        //div tag: contains the character difficulty
        var difficultyDiv = document.createElement("div");
        difficultyDiv.innerHTML = "Difficulty: " + characters.difficulty;
        newListItem.appendChild(difficultyDiv);

        // div tag: contains the character rating
        var ratingDiv = document.createElement("div");
        ratingDiv.innerHTML = "Rating: " + characters.rating;
        newListItem.appendChild(ratingDiv);

        // button tag: the delete button
        var deleteButton = document.createElement("deletebutton");
        deleteButton.innerHTML = "<span class='deletebutton'>Delete</span>";

        //deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function () {
          console.log("delete clicked:", characters.id);
          if (confirm("Are you sure you want to delete " + characters.name + "?")) {
            deleteCharacter(characters.id);
          }
        };

        // button tag: the update button
        var editButton = document.createElement("updatebutton");
        editButton.innerHTML = "<span class='deletebutton'>Edit</span>";

        //edit
        document.getElementById("updateboton").style.display = "none";

        editButton.onclick = function () {
          console.log("update clicked:", characters.name);
          if (confirm("Are you sure you want to edit " + characters.name + "?")) {
            console.log("check");
            document.getElementById("updateboton").style.display = "block";
            document.getElementById("addboton").style.display = "none";
            current = characters.id;
            editCharacters(characters.id, characters.name, characters.power, characters.technique, characters.speed, characters.difficulty, characters.rating);
            console.log("pass")
          }
        };

        //var update = docment.createElement("button");
        // update.innerHTML = "Update";
        // update.id = "update_button";
        // options.append
        
        newListItem.appendChild(deleteButton);
        newListItem.appendChild(editButton);

        characterList.appendChild(newListItem);
      });
    });
  });
};

getCharacters();

var updateButton = document.querySelector("#update");
updateButton.onclick = function () {
  console.log("before function");
  document.getElementById("updateboton").style.display = "none";
  document.getElementById("addboton").style.display = "block";  
  updateCharacter(current);
  document.getElementById("new-character-name").value = "";
  document.getElementById("new-character-power").value = "";
  document.getElementById("new-character-technique").value = "";
  document.getElementById("new-character-speed").value = "";
  document.getElementById("new-character-difficulty").value = "";
  document.getElementById("new-character-rating").value = "";
};


var registerButton = document.querySelector("#register");
registerButton.onclick = function () {
  var newUserFname = document.querySelector("#new-user-fname").value;
  var newUserLname = document.querySelector("#new-user-lname").value;
  var newUserEmail = document.querySelector("#new-user-email").value;
  var newUserPassword = document.querySelector("#new-user-password").value;

  var bodyStr = "fname=" + encodeURIComponent(newUserFname);
  bodyStr += "&lname=" + encodeURIComponent(newUserLname);
  bodyStr += "&email=" + encodeURIComponent(newUserEmail);
  bodyStr += "&enc_password=" + encodeURIComponent(newUserPassword);
  console.log("YOOO");
  fetch(url + "/users", {
    method: "POST",
    credentials: "include",
    body: bodyStr,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    if (response.status == 422) {
      document.getElementById("new-user-email").value = "";
      document.getElementById("new-user-password").value = "";
      alert("Email already in use, try a different one");
    }else { 
      console.log("Server responded");
      document.getElementById("new-user-fname").value = "";
      document.getElementById("new-user-lname").value = "";
      document.getElementById("new-user-email").value = "";
      document.getElementById("new-user-password").value = "";
      document.getElementById("registerscreen").style.display = "none";
      document.getElementById("log").style.display = "block";
    }
  });
};

var loginButton = document.querySelector("#login");
loginButton.onclick = function () {
  var userEmail = document.querySelector("#user-email").value;
  var userPassword = document.querySelector("#user-password").value;

  var bodyStr = "email=" + encodeURIComponent(userEmail);
  bodyStr += "&enc_password=" + encodeURIComponent(userPassword);
  console.log("Login Attempt Initiated")
  fetch(url + "/session", {
    method: "POST",
    credentials: "include",
    body: bodyStr,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    if (response.status == 404) {
      document.getElementById("user-email").value = "";
      document.getElementById("user-password").value = "";
      alert("Email does not exist");
    }else if (response.status == 401) {
      document.getElementById("user-password").value = "";
      alert ("Password is incorrect, try again");
    }else { 
      getCharacters();
      console.log("Server Responded");
      document.getElementById("user-email").value = "";
      document.getElementById("user-password").value = "";
      document.getElementById('loginscreen').style.display = "none";
      document.getElementById('home').style.display = "block";
      loggedIn = true;
    }
  });
};

var addButton = document.querySelector("#add");
addButton.onclick = function () {
  var newCharacterName = document.querySelector("#new-character-name").value;
  var newCharacterPower = document.querySelector("#new-character-power").value;
  var newCharacterTechnique = document.querySelector("#new-character-technique").value;
  var newCharacterSpeed = document.querySelector("#new-character-speed").value;
  var newCharacterDifficulty = document.querySelector("#new-character-difficulty").value;
  var newCharacterRating = document.querySelector("#new-character-rating").value;

  var bodyStr = "name=" + encodeURIComponent(newCharacterName);
  bodyStr += "&power=" + encodeURIComponent(newCharacterPower);
  bodyStr += "&technique=" + encodeURIComponent(newCharacterTechnique);
  bodyStr += "&speed=" + encodeURIComponent(newCharacterSpeed);
  bodyStr += "&difficulty=" + encodeURIComponent(newCharacterDifficulty);
  bodyStr += "&rating=" + encodeURIComponent(newCharacterRating);

  fetch(url + "/characters", {
    // request parameters:
    method: "POST",
    credentials: "include",
    body: bodyStr,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    // handle the response:
    console.log("Server responded!");
    // reload the list of restaurants
    getCharacters();
    document.getElementById("new-character-name").value = "";
    document.getElementById("new-character-power").value = "";
    document.getElementById("new-character-technique").value = "";
    document.getElementById("new-character-speed").value = "";
    document.getElementById("new-character-difficulty").value = "";
    document.getElementById("new-character-rating").value = "";
  });
};

var deleteCharacter = function (characterid) {
  fetch("https://my-dragon-app.herokuapp.com/characters/" + characterid, {
    method: "DELETE",
    credentials: "include"
  }).then(function (response) {
    // reload the list of restaurants
    getCharacters();
  });
};

//document.getElementById("update").style.display = "none";
var updateCharacter = function (characterid) {
  var newCharacterName = document.querySelector("#new-character-name").value;
  var newCharacterPower = document.querySelector("#new-character-power").value;
  var newCharacterTechnique = document.querySelector("#new-character-technique").value;
  var newCharacterSpeed = document.querySelector("#new-character-speed").value;
  var newCharacterDifficulty = document.querySelector("#new-character-difficulty").value;
  var newCharacterRating = document.querySelector("#new-character-rating").value;

  var bodyStr = "c_name=" + encodeURIComponent(newCharacterName);
  bodyStr += "&c_power=" + encodeURIComponent(newCharacterPower);
  bodyStr += "&c_technique=" + encodeURIComponent(newCharacterTechnique);
  bodyStr += "&c_speed=" + encodeURIComponent(newCharacterSpeed);
  bodyStr += "&c_difficulty=" + encodeURIComponent(newCharacterDifficulty);
  bodyStr += "&c_rating=" + encodeURIComponent(newCharacterRating);
  console.log("Server responded!");
  fetch(url + "/characters/" + characterid, {
    //request parameters:
    method: "PUT",
    credentials: "include",
    body: bodyStr,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    // handle the response given
    console.log("Server responded!");
    // reload the list of restaurants
    getCharacters();  
  });
};

var editCharacters = function (characterid, name, power, technique, speed, difficulty, rating) {
  document.getElementById("new-character-name").value = name;
  document.getElementById("new-character-power").value = power;
  document.getElementById("new-character-technique").value = technique;
  document.getElementById("new-character-speed").value = speed;
  document.getElementById("new-character-difficulty").value = difficulty;
  document.getElementById("new-character-rating").value = rating;
};  
  //make a function where i will set document.getelementbyid = variables i pass in. which will be the funct i call in
  //my load which is the function with the big for loop (edit/updateButton.onclick above).

  //pass in current data memebers
  //send current data members into put
  //put will send it through handlecharacterupdatemember()
  //handlecharacterupdatemember will send it to DB update function
  //then DB update function will actually run command to update
  //save ID of the curr sellected character (use global variable for this, after update you will know which one to change)

  //updateCharacter();

function showLogDiv() {
  document.getElementById('loginscreen').style.display = "block";
  document.getElementById('home').style.display = "none";
  document.getElementById('orange').style.backgroundColor = "#800A10";
  document.getElementById('background-image').style.backgroundColor = "#800A10";
  document.getElementById('log').style.display = "block";
  document.getElementById('registerscreen').style.display = "none";
};

function showHomeDiv() {
  document.getElementById('loginscreen').style.display = "none";
  document.getElementById('home').style.display = "block";
  document.getElementById('orange').style.backgroundColor = "white";
  document.getElementById('background-image').style.backgroundColor = "white";
};

function displayBackground() {
  document.getElementById('background-image').style.backgroundColor = "white";
  document.getElementById('orange').style.backgroundColor = "white";
  if (loggedIn) {
    document.getElementById("background-red").style.display = "block";
    document.getElementById("home").style.display = "block";
  }
  document.getElementById("background-red").style.display = "none";
  
};

function displayRegister() {
  document.getElementById('registerscreen').style.display = "block";
  document.getElementById('log').style.display = "none";
}


