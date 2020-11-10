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
 * GIT417 - Module 4/Chapter 4: Debugging and Error Handling
 * The honeypot is checked for value and execution halted if value !== ""
 * try..catch.finally error handling is used to check if the input elements have value and meet basic browser validation
 * debugger is placed before try...catch to automically halt execution at breakpoint if developers console is opened
*/
function validateForm(element, event, formHoneyPot, submittedFormMessage) {
  // declare variables
  var form = document.getElementsByClassName(element)[0];
  var inputs = form.elements;
  var formData = new FormData(form);
  var hasErrors;
  var userMessage = document.getElementsByClassName(submittedFormMessage)[0];

  // prevent default form submission behavior. Prevents page refresh
  event.preventDefault(); // Comment after GIT417 completion to allow FormSpree submission page

  // honeypot - used to prevent bot submissions - if value is present reset form and return execution
  var honeyPot = document.getElementById(formHoneyPot);
  if (honeyPot.value) {
    form.reset();
    return;
  }

  // add breakpoint before try..catch for exception handling
  debugger;
  // try catch exception handling for form validation. Displays appropriate message for condition
  try {
    // loop through form inputs to check for value and style as conditioned
    for (var x = 0; x <= inputs.length - 1; x++) {
      // if input doesn't have value, is not a submit button, and is not the honeypot
      if (
        !inputs[x].value &&
        inputs[x].type !== "submit" &&
        inputs[x].id !== formHoneyPot
      ) {
        inputs[x].classList.add("invalid-form-input");
        hasErrors = true;
      }
      // if input does have value, is not a submit button, and is not the honeypot
      else if (
        inputs[x].value &&
        inputs[x].type !== "submit" &&
        inputs[x].id !== formHoneyPot
      ) {
        inputs[x].classList.remove("invalid-form-input");
      }
    }

    // throw moved outside of loop to allow iteration through each input
    if (hasErrors) {
      throw `check info :-(`;
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
