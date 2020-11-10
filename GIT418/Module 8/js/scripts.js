// Global Variables
var exDislikes = [];

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
    /**
      * GIT418: Module/Chapter 8 : All My Ex's
      * Author: Tim Hein
      * Date: October 26th, 2020  
    **/
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

/**
 * GIT418: Module/Chapter 8 : All My Ex's
 * Author: Tim Hein
 * Date: October 26th, 2020  
 * 
 * if checked .push to array... else .splice out of array
 */
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
window.onload = () => {
  if (localStorage.getItem("cacheReset") !== "true") {
    localStorage.setItem("exs", "");
    localStorage.setItem("cacheReset", true);
  }
  else {
    checkLocalExList();
  }
}