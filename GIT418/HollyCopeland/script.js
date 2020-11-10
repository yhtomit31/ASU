// Holly Copeland
// GIT 418 Fall 2020
// Chapter 7
// Case 7 - based on modifed "Hands-on Project7-4/Project7-5"

"use strict";

var delivInfo = {};
var delivSummary = document.getElementById("deliverTo");

function processDeliveryInfo() {
    delivSummary.innerHTML = ""
  delivInfo.name = document.getElementById("nameinput").value;
  delivInfo.addr = document.getElementById("addrinput").value;
  delivInfo.city = document.getElementById("cityinput").value;
  delivInfo.email = document.getElementById("emailinput").value;
  delivInfo.phone = document.getElementById("phoneinput").value;

  for (const item in delivInfo)
    delivSummary.innerHTML += "<p>" + delivInfo[item] + "</p>";
}

function previewOrder() {
  processDeliveryInfo();
  processFood();
  console.log("hi, I'm a function");
  document.getElementById("deliverTo").style.display = "block";
}

document.getElementById("previewBtn").addEventListener("click", previewOrder);

// Holly Copeland
// GIT 418 Fall 2020
// Chapter 7
// Case 7 - based on modifed "Hands-on Project7-4/Project7-5"

var foodInfo = {};
var foodSummary = document.getElementById("order");

function processFood() {
    foodSummary.innerHTML = "";
  var crustOpt = document.getElementsByName("crust");
  var toppings = document.querySelectorAll("input[type=checkbox]:checked");
  var instr = document.getElementById("instructions");
  debugger;
  if (crustOpt[0].checked) {
    foodInfo.crust = crustOpt[0].value;
  } else {
    foodInfo.crust = crustOpt[1].value;
  }

  foodInfo.toppings = toppings;
  foodInfo.size = document.getElementById("size").value;
  foodInfo.instructions = instr.value;

  foodSummary.innerHTML += "<p><span>Crust</span>: " + foodInfo.crust + "</p>";
  foodSummary.innerHTML += "<p><span>Size</span>: " + foodInfo.size + "</p>";
  foodSummary.innerHTML += "<p><span>Topping(s)</span>: " + "</p>";
  foodSummary.innerHTML += "<ul>";
  for (var i = 0; i < foodInfo.toppings.length; i++) {
    foodSummary.innerHTML += "<li>" + foodInfo.toppings[i].value + "</li>";
  }
  foodSummary.innerHTML += "</ul>";
  foodSummary.innerHTML +=
    "<p><span>Instructions</span>: " + foodInfo.instructions;
  foodSummary.style.display = "block";
}
