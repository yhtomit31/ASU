// Global Variables
var exDislikes = [];
var userPosition = [];

// Custom object constructor
function Ex(exName, exDumpDate, exDumpReason, exDislikes) {
  this.exName = exName;
  this.exDumpDate = exDumpDate;
  this.exDumpReason = exDumpReason;
  this.exDislikes = exDislikes;
}

/**
 * Create new entry from form field values
 * Prevents default form submission execution i.e. page refresh
 * Creates new object based on object constructor
 * Call to addToExTable and pass new object as parameter
 * Resets form
 *
 **/
function createEx(event) {
  // Prevent default submission execution
  event.preventDefault();

  // form validation - if true return
  if (validateForm()) {
    return;
  }

  // Gets values from form based on ID and assigns to variable
  var exName = document.getElementById("exName").value;
  var exDumpDate = document.getElementById("exDumpDate").value;
  var exDumpReason = document.getElementById("exDumpReason").value;

  // Creates new object based on object constructor
  var addEx = new Ex(exName, exDumpDate, exDumpReason, exDislikes);

  // Pass new object to addToExTable with object as parameters
  addToExTable(addEx);

  // Save to LocalStorage
  saveExToLocal(addEx);

  // Resets form
  document.forms[0].reset();

  // Resets Dislikes Display
  document.getElementsByClassName("dislikes-display")[0].innerHTML = "";
}

function addToExTable(ex) {
  // Initialize and assign variables for table body and new row
  var exTable = document
    .getElementById("exTable")
    .getElementsByTagName("tbody")[0];
  var newRow = document.createElement("tr");

  // Loops through ex parameter, adds data to newCell variable and appends to newRow
  for (const data in ex) {
    var newCell = document.createElement("td");
    // data === "exDislikes" add array items as string to newCell.innerHTML
    if (data === "exDislikes") {
      for (var x = 0; x <= ex[data].length - 1; x++) {
        if (x === ex[data].length - 1) {
          // Template Literal is string allowing expressions. Only used .toString() for ease of grading. Probably unnecessary.
          newCell.innerHTML += `${ex[data][x]} `.toString();
        } else {
          // Template Literal is string allowing expressions. Only used .toString() for ease of grading. Probably unnecessary.
          newCell.innerHTML += `${ex[data][x]}, `.toString();
        }
      }
    } else {
      newCell.innerHTML = ex[data];
    }
    newRow.appendChild(newCell);
  }

  newRow.classList.add(ex.exName);

  // Append newRow to exTable for display
  exTable.appendChild(newRow);
  appendRemoveButton(newRow);
}

function appendRemoveButton(newRow) {
  var removeButtonCell = document.createElement("td");
  var removeButton = document.createElement("button");
  removeButton.style.color = "skyblue";
  removeButton.style.backgroundColor = "white";
  removeButton.style.border = "1px solid white;";
  removeButton.innerHTML = '<i class="fas fa-times"></i>';
  removeButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (confirm("Are you sure you want them back?") || event.keyCode === 13) {
      alert("OK. Let's remove them");
      removeRow(event.target);
      removeExFromLocal(event);
    } else {
      alert("Good Call");
    }
  });

  removeButtonCell.appendChild(removeButton);
  newRow.appendChild(removeButtonCell);
}

function removeRow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function checkLocalExList() {
  var previousLocal = localStorage.getItem("exs");
  if (previousLocal) {
    previousLocal = JSON.parse(previousLocal);
    for (const item in previousLocal) {
      addToExTable(previousLocal[item]);
    }
  }
}

function saveExToLocal(newEx) {
  var localEx = localStorage.getItem("exs") || [];
  if (localEx.length) {
    localEx = JSON.parse(localEx);
  }
  localEx.push(newEx);
  localStorage.setItem("exs", JSON.stringify(localEx));
}

function removeExFromLocal(newGF) {
  var localEx = localStorage.getItem("exs");
  localEx = JSON.parse(localEx);
  localEx = Array.from(localEx);

  for (const ex in localEx) {
    if (
      localEx[ex].exName === newGF.target.parentNode.parentNode.classList[0]
    ) {
      localEx.splice(ex, 1);
    }
    localStorage.setItem("exs", JSON.stringify(localEx));
  }
}

function handleDislikes(event) {
  if (event.target.checked) {
    exDislikes.push(event.target.value);
  } else {
    var index = exDislikes.indexOf(event.target.value);
    exDislikes.splice(index, 1);
  }

  // Automatically update 'dislikes-display'.innerHTML based on checked(selections)
  var dislikesDisplay = document.getElementsByClassName("dislikes-display")[0];
  dislikesDisplay.innerHTML = exDislikes;
}

// Reset localStorage 'exs' to prevent empty reasons column
function onLoadAllMyExs() {
  if (localStorage.getItem("cacheReset") !== "true") {
    localStorage.setItem("exs", "");
    localStorage.setItem("cacheReset", true);
  } else {
    checkLocalExList();
  }
}

/**
 * Get user position
 *  - callback invoked based on success/failure/timeout
 *  - maximumAge: max cached postion age
 *  - timeout: time before error/failed callback is invoked
 *  - enableHighAccuracy: more accurate position
 */
function getUserPosition() {
  navigator.geolocation.getCurrentPosition(successfulPosition, failedPosition),
    {
      maximumAge: 60000,
      timeout: 5000,
      enableHighAccuracy: true,
    };
}

// If getCurrentPosition is successful assign position.coords to global variable userPosition
// Call addToMap and webSecurity for execution
function successfulPosition(position) {
  userPosition = position.coords;
  addToMap();
  webSecurity();
}

// getCurrentPosition fails - designate Paris, Fr
function failedPosition() {
  userPosition = [48.8566, 2.3522]; // failed position Paris, Fr
  addToMap();
  webSecurity();
}

function addToMap() {
  //This array is for the lattitude and longitude of the desired display location
  var coordsArray = userPosition.latitude
    ? [userPosition.latitude, userPosition.longitude]
    : [48.8566, 2.3522];
  //Creates the map object with the intended coordinates and sets zoom level to 14
  var map = L.map("map").setView(coordsArray, 14);

  //Creates the required WebGL metadata and chains it to the map object
  var gl = L.mapboxGL({
    attribution:
      '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
    accessToken: "not-needed",
    style:
      "https://api.maptiler.com/maps/streets/style.json?key=qZjWTwtNTmBxDi3ZpTB5",
  }).addTo(map);
  //Creates the marker for the intended coordinates and chains it to the map object
  L.marker(coordsArray).addTo(map);
}

// Display Web Security Info based on user approval
function webSecurity() {
  // initialize and assign variables
  var browser = document.getElementsByClassName("browser")[0],
    version = document.getElementsByClassName("browser-version")[0],
    geolocation = document.getElementsByClassName("geolocation")[0],
    latitude = document.getElementsByClassName("geolocation-latitude")[0],
    longitude = document.getElementsByClassName("geolocation-longitude")[0],
    altitude = document.getElementsByClassName("geolocation-altitude")[0],
    onLine = document.getElementsByClassName("online")[0],
    platform = document.getElementsByClassName("platform")[0],
    userAgant = document.getElementsByClassName("user-agent")[0],
    availHeight = document.getElementsByClassName("available-height")[0],
    availWidth = document.getElementsByClassName("available-width")[0],
    colorDepth = document.getElementsByClassName("color-depth")[0],
    height = document.getElementsByClassName("display-height")[0],
    width = document.getElementsByClassName("display-width")[0],
    pixelDepth = document.getElementsByClassName("pixel-depth")[0];

  browser.innerHTML = navigator.appName;
  version.innerHTML = navigator.appVersion;
  geolocation.innerHTML = userPosition.latitude
    ? `${userPosition.latitude}, ${userPosition.longitude}`
    : "Block by Browser - WHOOP!";

  // GIT418 - Module 10 - Case Project
  // set positions to relevant if set otherwise assign String
  latitude.innerHTML = userPosition.latitude
    ? `${userPosition.latitude}`
    : "Block by Browser - WHOOP!";
  longitude.innerHTML = userPosition.latitude
    ? `${userPosition.longitude}`
    : "Block by Browser - WHOOP!";
  altitude.innerHTML = userAgant.altitude
    ? `${userPosition.altitude}`
    : "Not Available";

  onLine.innerHTML = navigator.onLine ? "Online" : "Offline";
  platform.innerHTML = navigator.platform;
  userAgant.innerHTML = navigator.userAgent;
  availHeight.innerHTML = screen.availHeight;
  availWidth.innerHTML = screen.availWidth;
  colorDepth.innerHTML = screen.colorDepth;
  height.innerHTML = screen.height;
  width.innerHTML = screen.width;
  pixelDepth.innerHTML = screen.pixelDepth;
}

/**
 * GIT418 - Module/Chapter11 - Updating Web Pages with AJAX
 */
// Custom Object Constructor
 function MissionInfo(rover, date) {
   this.rover = rover;
   this.date = date;
 }

// Mars Rover data object
 var roverObject = {
   "curiosity": {
     name: "Curiosity",
     dateRange: {
       min: "08/06/2012",
       max: "today"
     }
   },
   "opportunity": {
     name: "Opportunity",
     dateRange: {
       min: "01/25/2004",
       max: "06/10/2018"
     }
   },
   "spirit": {
     name: "Spirit",
     dateRange: {
      min: "01/04/2004",
      max: "02/22/2010"
     }
   }
 }

function validateRoverOptions() {
  // declaration/assignment of variables
  var rover = document.querySelector(".rover-btn.active")
    ? document.querySelector(".rover-btn.active").innerText
    : null;
  var datePicker = document.getElementById("solDatePicker");
  var date = document.getElementById("solDatePicker").value;
  var parsedDate = Date.parse(document.getElementById("solDatePicker").value);
  var invalidDate = document.querySelector(".date-message");
  var invalidRover = document.querySelector(".rover-message");
  var min, max;

  // Reset error messages and remove invalid class
  resetErrors();

  // create new MissionInfo object
  var mission = new MissionInfo(rover, date);

  try {
    // verify Rover has been selected
    if (!rover) {
      throw "Please select a Mars rover";
    }

    // verify date has been selected
    if (!date) {
      throw "Please select date"
    }

    var today = new Date().toISOString().split("T")[0];
    if (date > today) {
      throw "Past dates only"
    }

    // Rover mission span validation
    switch (rover) {
      case "Curiosity": {
        min = Date.parse(roverObject["curiosity"].dateRange.min);
        max = Date.parse(roverObject["curiosity"].dateRange.max);
        if (parsedDate < min || parsedDate > max) {
          throw "Please select a date between August 6, 2012 & today";
        }
        break;
      }
      case "Opportunity": {
        min = Date.parse(roverObject["opportunity"].dateRange.min);
        max = Date.parse(roverObject["opportunity"].dateRange.max);
        if (parsedDate < min || parsedDate > max) {
          throw "Please select a date between Jan 25, 2004 & June 10, 2010";
        }
        break;
      }
      case "Spirit": {
        min = Date.parse(roverObject["spirit"].dateRange.min);
        max = Date.parse(roverObject["spirit"].dateRange.max);
        if (parsedDate < min || parsedDate > max) {
          throw "Please select a date between Jan 1, 2004 & Feb 22, 2010";
        }
        break;
      }
      default: {
        max = new Date().toISOString().split("T")[0];
        if (parsedDate > max) {
          throw "Please select a prior date";
        }
        break;
      }
    }

    // send info to API request function
    requestRoverImgs(mission);

  } catch (error) {
    if (error.includes("rover")) {
      invalidRover.innerHTML = error;
    }
    else {
      datePicker.classList.add("invalid");
      invalidDate.innerHTML = error;
    }
  }
}

// Add active class to clicked "rover" button
function setActiveRover(rover) {
  resetErrors();

  var roverBtns = document.querySelectorAll(".rover-btn");
  [].forEach.call(roverBtns, (btn) => {
    btn.classList.remove("active");
  });

  var btn = document.querySelector(`.rover-btn.${rover}`);
  btn.classList.add("active");

  setMissionSpan(rover);
}

function setMissionSpan(rover) {
  var roverMessage = document.querySelector(".rover-message");
  var minDate = roverObject[rover].dateRange.min,
      maxDate = roverObject[rover].dateRange.max;

  roverMessage.style.color = "white";
  roverMessage.innerHTML = `Mission Dates from ${minDate} to ${maxDate}`;
}


// Remove error messages and classees
function resetErrors() {
  var invalidDate = document.querySelector(".date-message"),
      invalidRover = document.querySelector(".rover-message"),
      datePicker = document.querySelector("#solDatePicker");

  datePicker.classList.remove("invalid");
  invalidDate.innerHTML = "";
  invalidRover.innerHTML = "";
}

/**
 * Request Photos from NASA api
 *  - display if found : display error message
 * 
 */
function requestRoverImgs(missionInfo) {
  // variable declaration and assignment
  var imgPlaceholder = document.getElementById("roverImg");
  var roverLabel = document.getElementsByClassName("rover-camera-label")[0];
  try {
    // initialize new AJAX request with properties
    var xhr = new XMLHttpRequest(),
      method = "GET",
      url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${missionInfo.rover}/photos?earth_date=${missionInfo.date}&api_key=KnpqSURAroYGayaTI5IwxZ5a0A7vzxeMw1fRU58Q`;
    // readyState and status meet expectations handle response
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // parse JSON object for manipulation
        var imgObj = JSON.parse(xhr.responseText);
        var randomNum = Math.floor(Math.random() * imgObj.photos.length);
        // try...catch for validation
        try {
          // error handle days without photos
          if (imgObj.photos[randomNum] === undefined) { throw "No Photos Found"; }
          else {
            imgPlaceholder.innerHTML = `<img id='roverImg' src=${imgObj.photos[randomNum].img_src}>`;
            roverLabel.innerHTML = imgObj.photos[randomNum].camera.full_name;
          }
        }
        catch (error) {
          showErrorMessage(error);
        }        
      }
      else if (xhr.status === 400) { throw `API status: ${xhr.status}. Message:${xhr.statusText}`; }
    };
    // initialize/re-initialize request
    xhr.open(method, url, true);
    xhr.setRequestHeader("Accept", "application/json");
    // Send request to API server
    xhr.send();
  } catch (error) {
    showErrorMessage(error);
    console.log(error);
  }
}

// Display error message
function showErrorMessage(message) {
  var errorMessageContainer = document.querySelector(".mars-rover.error-message");
  errorMessageContainer.style.display = "grid";
  document.querySelector(".error-message .message").innerHTML = message;
}