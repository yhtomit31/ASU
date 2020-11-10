/**
 * navigation button click
 */
function scrollNavigation(element) {
  // assign boolean to variable if scrollBehavior is in document.documentElement.style
  var doesSupportSmoothScroll = "scrollBehavior" in document.documentElement.style;

  // if scrollBehavior is supported apply behavior, block and inline parameters
  if (doesSupportSmoothScroll) {
    // check if element is the example section and process accordingly
    if (!element.classList.contains("example")) {
      element.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
    }
    else {
      var elementYOffset = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({top: elementYOffset, behavior: "smooth"})
    }
  } 
  // if scrollBehavior is not supported revert to standard scrollIntoView
  else {
    element.scrollIntoView();
  }

  // call to set active
  setIsActive(element);
}

/**
 * Set Active Navigation item
 */
function setIsActive(element) {
  // declare variable and assign 'is-active' collection
  var previousActive = document.getElementsByClassName("is-active")[0];
  // if previousActive remove <- removes 'is-active' to prevent duplicate active
  if (previousActive) {
    previousActive.classList.remove("is-active");
  }

  /**
   *  assign element classList to variable
   *  use switch...case for matching class and add 'is-active' class
   */
  var classList = element.classList[0];
  switch (classList) {
    case "home":
    case "home-nav-button": {
      var homeButton = document.getElementsByClassName("home-nav-button")[0];
      homeButton.classList.add("is-active");
      break;
    }
    case "about-nodes":
    case "about-nodes-nav-button": {
      var aboutNodesButton = document.getElementsByClassName(
        "about-nodes-nav-button"
      )[0];
      aboutNodesButton.classList.add("is-active");
      break;
    }
    case "adding-nodes":
    case "adding-nodes-nav-button": {
      var addingNodesButton = document.getElementsByClassName(
        "adding-nodes-nav-button"
      )[0];
      addingNodesButton.classList.add("is-active");
      break;
    }
    case "removing-nodes":
    case "removing-nodes-nav-button": {
      var removingNodesButton = document.getElementsByClassName(
        "removing-nodes-nav-button"
      )[0];
      removingNodesButton.classList.add("is-active");
      break;
    }
    case "example":
    case "example-nav-button": {
      var exampleButton = document.getElementsByClassName(
        "example-nav-button"
      )[0];
      exampleButton.classList.add("is-active");
      break;
    }
    // if no matching class break
    default: {
      break;
    }
  }
  // element.classList.add("is-active");
}

// How's your day
// initialize and assign variables to appropriate DOM elements
var goodDayButton = document.getElementById("goodDayButton");
var goodDayFaceParent = document.getElementById("goodDayFace");

//add click event listener to 'goodDay' button
goodDayButton.addEventListener("click", () => {
  // if fa-smile has length return - prevents multiple faces
  if (document.getElementsByClassName("fa-smile").length) {
    return;
  }

  // create goodDayFace element, set classList and style
  var goodDayFace = document.createElement("i");
  goodDayFace.classList.add("far");
  goodDayFace.classList.add("fa-smile");
  goodDayFace.style.display = "flex";
  goodDayFace.style.color = "lightyellow";
  goodDayFace.style.fontSize = "64px";

  // append new element to parent container
  goodDayFaceParent.appendChild(goodDayFace);

  // check for baddDayFace and removeChild if true
  var badDayFaceParent = document.getElementById("badDayFace");
  var badDayFace = document.getElementsByClassName("fa-frown")[0];
  if (badDayFace) {
    badDayFaceParent.removeChild(badDayFace);
  }
});

// initialize and assign variables to appropriate DOM elements
var badDayButton = document.getElementById("badDayButton");
var badDayFaceParent = document.getElementById("badDayFace");

//add click event listener to 'badDay' button
badDayButton.addEventListener("click", () => {
  // if fa-frown has length return - prevents multiple faces
  if (document.getElementsByClassName("fa-frown").length) {
    return;
  }

  // create badDayFace element, set classList and style
  var badDayFace = document.createElement("i");
  badDayFace.classList.add("far");
  badDayFace.classList.add("fa-frown");
  badDayFace.style.display = "flex";
  badDayFace.style.color = "darkgray";
  badDayFace.style.fontSize = "64px";

  // append new element to parent container
  badDayFaceParent.appendChild(badDayFace);

  // check for goodDayFace and removeChild if true
  var goodDayFaceParent = document.getElementById("goodDayFace");
  var goodDayFace = document.getElementsByClassName("fa-smile")[0];
  if (goodDayFace) {
    goodDayFaceParent.removeChild(goodDayFace);
  }
});

/**
 * addEventListener to window scroll
 * remove 'is-active' if already present
 * 
 * if window.pageYOffset is greater-than/equal-to fix header to top 
 * 
 * add 'is-active' class to appropriate node when in scroll position range
 */
window.addEventListener("scroll", () => {
  // declare and assign variables
  var scroll = window.pageYOffset;
  var header = document.querySelector("header");
  var previousActive = document.getElementsByClassName("is-active")[0];
  // check if 'is-active' is present and remove
  if (previousActive) {
    previousActive.classList.remove("is-active");
  }
  
  // check pageYOffset and add/remove class 'fixed-header' appropriately
  if (scroll >= 425) {
    header.classList.add("fixed-header")
  }
  else {
    header.classList.remove("fixed-header");
  }

  // check pageYOffset and add 'is-active' when in appropriate range
  if (scroll < 999) {
    var node = document.getElementsByClassName("home-nav-button")[0];
    node.classList.add("is-active");
  }
  else if (scroll > 1000 && scroll < 1999) {
    var node = document.getElementsByClassName("about-nodes-nav-button")[0];
    node.classList.add("is-active");
  }
  else if (scroll > 2000 && scroll  < 2999) {
    var node = document.getElementsByClassName("adding-nodes-nav-button")[0];
    node.classList.add("is-active");
  }
  else if (scroll > 3000 && scroll  < 3500) {
    var node = document.getElementsByClassName("removing-nodes-nav-button")[0];
    node.classList.add("is-active");
  }
  else {
    var node = document.getElementsByClassName("example-nav-button")[0];
    node.classList.add("is-active");
  }
})