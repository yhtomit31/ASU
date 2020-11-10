function notifyUserAddedToCart(value, item) {
  // declare and assign element and check if on DOM ? remove() : ""
  var oldAddToCart = document.getElementsByClassName(
    "add-to-cart-container"
  )[0];
  if (oldAddToCart) {
    oldAddToCart.remove();
  }

  // declare and assign variables for new div creation
  var newDiv = document.createElement("div");
  var itemCountSpan = document.createElement("span");

  // add class name to created div
  newDiv.classList.add("add-to-cart-container", "added-to-cart");

  // assign value from localStorage to shopping cart
  itemCountSpan.innerHTML = localStorage.getItem("cartItems");

  ////// Module 3
  // create img element and set attributes, insert item count next to img, and add to DOM
  var img = document.createElement("img");

  // Condition switch statement to adjust DOM based on "item"  value pased into function
  switch (item) {
    // assign macaron src attribute of img, insert adjacent item count element, and add to dom
    case "macaron(s)": {
      img.src = "images/macaron.png";
      newDiv.appendChild(img);
      img.insertAdjacentElement("afterend", itemCountSpan);
      document.body.appendChild(newDiv, img);
      break;
    }
    // assign cake src attribute of img, insert adjacent item count element, and add to dom
    case "cake(s)": {
      img.src = "images/food-and-restaurant.png";
      newDiv.appendChild(img);
      img.insertAdjacentElement("afterend", itemCountSpan);
      document.body.appendChild(newDiv, img);
      break;
    }
    // assign cupcake src attribute of img, insert adjacent item count element, and add to dom
    case "cupcake(s)": {
      img.src = "images/muffin.png";
      newDiv.appendChild(img);
      img.insertAdjacentElement("afterend", itemCountSpan);
      document.body.appendChild(newDiv, img);
      break;
    }
    // assign src attribute of img, insert adjacent item count element, and add to dom
    case "cookie(s)": {
      img.src = "images/mould.png";
      newDiv.appendChild(img);
      img.insertAdjacentElement("afterend", itemCountSpan);
      document.body.appendChild(newDiv, img);
      break;
    }
    // default behavior if no case conditions are met.
    default: {
      var cartIcon = document.createElement("i");
      cartIcon.className = "fas fa-shopping-cart added-to-cart";
      cartIcon.appendChild(itemCountSpan);
      newDiv.appendChild(cartIcon);
      document.body.appendChild(newDiv, cartIcon);
      break;
    }
  }
}

/**
 * GIT417 - Module/Chapter 6 Enchancing and Validating Forms
 *
 * on form submission iteration through inputs validating use switch...catch and catch errors with try...catch
 */
function validateForm(element, event, formHoneyPot, submittedFormMessage) {
  // declare variables
  var form = document.getElementsByClassName(element)[0];
  var inputs = form.elements;
  var formData = new FormData(form);
  var hasErrors;
  var error;
  var userMessage = document.getElementsByClassName(submittedFormMessage)[0];

  // prevent default form submission behavior. Prevents page refresh
  event.preventDefault(); // Comment after GIT417 completion to allow FormSpree submission page

  // honeypot - used to prevent bot submissions - if value is present reset form and return execution
  var honeyPot = document.getElementById(formHoneyPot);
  if (honeyPot.value) {
    form.reset();
    return;
  }

  // try catch exception handling for form validation. Displays appropriate message for condition
  try {
    // loop through form inputs to check for value and style as conditioned
    for (var x = 0; x <= inputs.length - 1; x++) {
      if (inputs[x].type === "submit" || inputs[x].id === formHoneyPot) {
        continue;
      }
      if (inputs[x].style.display !== "none") {
        switch (inputs[x].type) {
          case "text":
          case "email": {
            // if input doesn't have value, is not a submit button, and is not the honeypot
            var emailField = document.getElementById("preferredEmail");
            if (
              inputs[x].type === "email" &&
              emailField.checked &&
              !inputs[x].value
            ) {
              inputs[x].classList.add("invalid-form-input");
              error = error === undefined ? "missing email" : "check info :-(";
              hasErrors = true;
            } else if (!inputs[x].value) {
              inputs[x].classList.add("invalid-form-input");
              error = error === undefined ? "missing values" : "check info :-(";
              hasErrors = true;
            }
            // if input does have value, is not a submit button, and is not the honeypot
            else if (inputs[x].value) {
              inputs[x].classList.remove("invalid-form-input");
            }
            continue;
          }
          case "tel": {
            var phoneField = document.getElementById("preferredPhone");
            if (!inputs[x].value && phoneField.checked) {
              inputs[x].classList.add("invalid-form-input");
              hasErrors = true;
              error =
                error === undefined ? "invalid phone #" : "check info :-(";
              continue;
            }
            if (inputs[x].value.length < 7) {
              inputs[x].setCustomValidity("Must be 7 digits");
              inputs[x].reportValidity();
              inputs[x].classList.add("invalid-form-input");
            } else {
              inputs[x].classList.remove("invalid-form-input");
            }
            continue;
          }
          case "select":
          case "select-multiple": {
            var invalidContactFavoritesLabel = document.getElementsByClassName(
              "invalid-contact-favorites"
            )[0];
            if (!inputs[x].value) {
              inputs[x].style.border = "1px solid lightcoral";
              hasErrors = true;
              error = "check info :-(";
              invalidContactFavoritesLabel.innerHTML = "select favorite";
              invalidContactFavoritesLabel.style.color = invalidTextColor;
            } else {
              inputs[x].style.border = "1px solid #999999";
              invalidContactFavoritesLabel.innerHTML = "";
              invalidContactFavoritesLabel.style.color = validTextColor;
            }
            continue;
          }
          case "radio": {
            // var connectRadios = document.getElementsByName("preferredContact");
            if (validateRadio()) {
              document.getElementsByClassName(
                "preferred-wrapper"
              )[0].style.color = "#999999";
            } else {
              document.getElementsByClassName(
                "preferred-wrapper"
              )[0].style.color = "lightcoral";
              hasErrors = true;
              error =
                error === undefined ? "Select Preferred" : "check info :-(";
            }
            continue;
          }
          case "checkbox": {
            var connectCheckboxes = document.getElementsByName("timeToCall");
            if (validateCheckboxes(connectCheckboxes)) {
              document.getElementsByClassName(
                "connect-time-wrapper"
              )[0].style.color = "#999999";
            } else {
              document.getElementsByClassName(
                "connect-time-wrapper"
              )[0].style.color = "lightcoral";
              hasErrors = true;
              error =
                error === undefined ? "Chose Best Time" : "check info :-(";
            }
            continue;
          }
        }
      }
    }

    // throw moved outside of loop to allow iteration through each input
    if (hasErrors) {
      throw error;
    }

    // catch errors and set userMessage innerHTMl to error
  } catch (error) {
    userMessage.style.color = "lightcoral";
    userMessage.style.opacity = "1";
    userMessage.innerHTML = error;
  } finally {
    // console.log general error message with related form class name after try...catch execution
    if (hasErrors) {
      console.log(`Please correct all ${form.classList[0]} errors`);
    }
  }

  // if hasErrors is false send to FormSpree
  if (!hasErrors) {
    // ajax call to submit form to FormSpree
    ajax(form.method, form.action, formData);

    // style userMessage for successful submission
    userMessage.innerHTML = "submitted :-D";
    userMessage.style.color = "lightgreen";
    userMessage.style.opacity = "1";
  }
  return;
}

function ajax(method, url, data) {
  // Commented to prevent reaching Formspree montly limit
  // var xhr = new XMLHttpRequest();
  // xhr.open(method, url);
  // xhr.setRequestHeader("Accept", "application/json");
  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState !== XMLHttpRequest.DONE) return;
  //   if (xhr.status === 200) {
  var form = document.getElementsByClassName("connect-form")[0];
  form.reset();
  for (var x = 0; x <= form.elements.length - 1; x++) {
    var submittedMessage = document.getElementsByClassName(
      "connect-form-user-message"
    )[0];
    form.elements[x].classList.remove("invalid-form-input");
    form.elements[x].placeholder = "";
    // xhr.responseType;
    submittedMessage.style.opacity = "1";
  }
  // }
  // };
  // xhr.send(data);
}

/**
 * GIT417 - Module/Chapter 5: Working with the DOM
 * variables are initialized and assigned to the appropriate HTML element
 * assigned variables innerHTML is then set to the appropriate Web API , navigator/screen, properties
 */
function webSecurity() {
  // initialize and assign variables
  var browser = document.getElementsByClassName("browser")[0],
    version = document.getElementsByClassName("browser-version")[0],
    geolocation = document.getElementsByClassName("geolocation")[0],
    onLine = document.getElementsByClassName("online")[0],
    platform = document.getElementsByClassName("platform")[0],
    userAgant = document.getElementsByClassName("user-agent")[0],
    availHeight = document.getElementsByClassName("available-height")[0],
    availWidth = document.getElementsByClassName("available-width")[0],
    colorDepth = document.getElementsByClassName("color-depth")[0],
    height = document.getElementsByClassName("display-height")[0],
    width = document.getElementsByClassName("display-width")[0],
    pixelDepth = document.getElementsByClassName("pixel-depth")[0];

  // set innerHTML to relevant Web API property
  browser.innerHTML = navigator.appName;
  version.innerHTML = navigator.appVersion;

  // Only way I could get the geolocation to work
  navigator.geolocation.getCurrentPosition(
    (position) =>
      (geolocation.innerHTML = `${position.coords.latitude}, ${position.coords.longitude}`),
    () => (geolocation.innerHTML = "Block by Browser - WHOOP!"),
    { maximumAge: 60000, timeout: 2000 }
  );

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
 * display appropriate Preferred Contact field when selected
 *
 */
function showPreferredContact(method) {
  var email = document.getElementsByClassName("connect-email")[0];
  var invalidEmailField = document.getElementsByClassName(
    "invalid-contact-email"
  )[0];
  var invalidPhoneField = document.getElementsByClassName(
    "invalid-contact-phone"
  )[0];
  var phone = document.getElementsByClassName("connect-phone")[0];

  switch (method) {
    case "phone": {
      phone.style.display =
        !phone.style.display || phone.style.display === "none"
          ? "flex"
          : "none";
      email.style.display = "none";
      invalidEmailField.style.display = "none";
      break;
    }
    case "email": {
      email.style.display =
        !email.style.display || email.style.display === "none"
          ? "flex"
          : "none";
      phone.style.display = "none";
      invalidPhoneField.style.display = "none";
      break;
    }
    default: {
      email.style.display = "inline-block";
      invalidEmailField.style.display = "inline-block";
      phone.style.display = "inline-block";
      invalidPhoneField.style.display = "inline-block";
      break;
    }
  }
}

// global variables for validation
var invalidBorder = "1px solid lightcoral";
var validBorder = "1px solid #999999";
var invalidTextColor = "lightcoral";
var validTextColor = "#999999";

/**
 * validate form text input
 * verify input has value
 * display validation message when necessary
 */
function validateTextField(event, invalidLabel) {
  var input = event.target;
  var value = event.target.value;
  var invalid = document.getElementsByClassName(invalidLabel)[0];
  if (!value) {
    input.style.border = invalidBorder;
    invalid.innerHTML = "enter value";
    invalid.style.color = invalidTextColor;
  } else {
    input.style.border = validBorder;
    invalid.innerHTML = "";
    invalid.style.color = validTextColor;
  }
}

/**
 * validat form email input
 * verify email address includes basic requirements(@, .) and/or has value
 * display validation message when appropriate
 *
 */
function validateEmail(event, invalidLabel) {
  var emailAddress = event.target.value;
  var input = event.target;
  var invalid = document.getElementsByClassName(invalidLabel)[0];

  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(String(emailAddress).toLowerCase()) && emailAddress) {
    input.style.border = invalidBorder;
    invalid.innerHTML = "invalid email";
    invalid.style.color = invalidTextColor;
    return;
  } else if (!emailAddress) {
    input.style.border = invalidBorder;
    invalid.innerHTML = "enter value";
    invalid.style.color = invalidTextColor;
  } else {
    input.style.border = validBorder;
    invalid.innerHTML = "";
    invalid.style.color = validTextColor;
  }
}

/**
 * validate form phone input
 * verify input value is only numeric and at least 7 characters long
 * display validation message where necessary
 */
function validatePhone(event, invalidLabel) {
  var isNum = /^\d+$/.test(event.target.value);
  var phoneNumber = event.target.value;
  var input = event.target;
  var invalid = document.getElementsByClassName(invalidLabel)[0];
  if (!isNum) {
    input.style.border = invalidBorder;
    invalid.innerHTML = "enter value";
    invalid.style.color = invalidTextColor;
  } else if (phoneNumber.length < 7 && isNum) {
    input.style.border = invalidBorder;
    invalid.innerHTML = "invalid number";
    invalid.style.color = invalidTextColor;
  } else {
    input.style.border = validBorder;
    invalid.innerHTML = "";
    invalid.style.color = validTextColor;
  }
}

/**
 * validate form radio inputs
 * form radio inputs are retrieved and checked for user interaction
 */
function validateRadio() {
  var radios = document.querySelectorAll("input[type=radio]");
  var counter = 0;

  // loop through radio inputs and increment counter if checked
  for (var x = 0; x <= radios.length - 1; x++) {
    if (radios[x].checked) {
      counter++;
    }
  }
  var invalidRadioLabel = document.getElementsByClassName(
    "invalid-preferred-contact"
  )[0];

  // if counter is equal to 0(zero) display validation message
  if (counter === 0) {
    invalidRadioLabel.innerHTML = "select option";
    invalidRadioLabel.style.color = invalidTextColor;
    return false;
  } else {
    invalidRadioLabel.innerHTML = "";
    invalidRadioLabel.style.color = validTextColor;
    return true;
  }
}

/**
 * validate form checkboxes
 * all form checkboxes are retrieved and looped to verify at least one is checked
 */
function validateCheckboxes(checkboxes) {
  var checkboxes = document.querySelectorAll("input[type=checkbox]");
  var counter = 0;

  // increment counter if checkbox isn's checked
  for (var x = 0; x <= checkboxes.length - 1; x++) {
    if (!checkboxes[x].checked) {
      counter++;
    }
  }

  var invalidCheckboxesLabel = document.getElementsByClassName(
    "invalid-contact-best-time"
  )[0];
  // if both checkboxes are unchecked display validation message
  if (counter === 2) {
    invalidCheckboxesLabel.innerHTML = "select option";
    invalidCheckboxesLabel.style.color = invalidTextColor;
    return false;
  } else {
    invalidCheckboxesLabel.innerHTML = "";
    invalidCheckboxesLabel.style.color = validTextColor;
    return true;
  }
}
