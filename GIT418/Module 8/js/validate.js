var form = document.forms[0];

/**
 * add event listener to form
 * check target type and call appropriate validation function
 */
form.addEventListener("focusout", (event) => {
  targetType = event.target.type;

  switch (targetType) {
    case "text": {
      validateTextInput(event.target);
      break;
    }
    case "date": {
      validateDate(event.target);
      break;
    }
    case "submit": {
      break;
    }
    default: {
      validateTextInput(event.target);
      break;
    }
  }
});

// validate input with type='text'
function validateTextInput(input) {
  var hasErrors;
  try {
    // check if input has value and throw error
    if (!input.value) {
      hasErrors = true;
      throw "Please enter value";
    } else {
      input.style.color = "black";
    }
  } catch (error) {
    input.placeholder = "Enter Value";
    input.style.color = "red";
  } finally {
    if (hasErrors) {
      console.log(`Form ${input.name} has errors`);
    }
  }
}

// Validate input with type='date'
function validateDate(input) {
  var hasErrors;
  try {
    // check if input has value and throw error
    if (!input.value) {
      hasErrors = true;
      throw "Please Enter Value";
    } else {
      input.style.color = "black";
    }
  } catch (error) {
    input.placeholder = "Enter Value";
    input.style.color = "red";
  } finally {
    if (hasErrors) {
      console.log(`Form ${input.name} has errors`);
    }
  }
}
