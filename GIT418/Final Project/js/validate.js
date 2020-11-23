var form = document.forms[0];

/**
 * add event listener to form
 * check target type and call appropriate validation function
 */
form.addEventListener("focusout", (event) => {
    targetType = event.target.type;

    switch (targetType) {
        case "text":
            {
                validateTextInput(event.target);
                break;
            }
        case "date":
            {
                validateDate(event.target);
                break;
            }
        case "submit":
            {
                break;
            }
        default:
            {
                validateTextInput(event.target);
                break;
            }
    }
});

/**
 * Validate Text Input
 *  - no special characters
 *  - maximum of 180 characters
 */
// validate input with type='text'
function validateTextInput(input) {
    var hasErrors;
    var regex = /^([a-zA-Z0-9 _-]+)$/;

    try { // check if input has value and throw error
        if (! input.value) {
            hasErrors = true;
            throw "Please enter value";
        } else if (input.value.length > 180) {
            hasErrors = true;
            throw "Maximum 180 characters";
        } else if (! regex.test(input.value)) {
            hasErrors = true;
            throw "No special Characters"
        } else {
            hasErrors = false;
        }
        if (input.value === "No special Characters" || input.value === "Maximum 180 characters" || input.value === "Please enter value") {
            hasErrors = true;
        } else {
            hasErrors = false;
        }
    } catch (error) {
        input.style.color = "red";
        input.value = error;
    } finally {
        if (hasErrors) {
            console.log(`Form ${
                input.name
            } has errors`);
        } else {
            input.style.color = "black";
        }
        return hasErrors;
    }
}

/**
 * Validate Date
 *  - past dates only
 *  - last 100 years - reasonable dates
 */
// Validate input with type='date'
function validateDate(input) {
    var hasErrors = false;
    var date = new Date();
    var inputDate = new Date(input.value);
    var inputYear = parseInt(input.value.split("-")[0]);
    var ageLimit = date.getFullYear() - 100;

    // try...catch for validation
    try { 
      // check if input has value and throw error
        if (! input.value) {
          hasErrors = true;
          throw "Please Enter Value";
        } 
        // check if date is in the future
        else if (inputDate > date) {
          hasErrors = true;
          throw "Past Dates Only";
        } 
        // check if date is reasonable
        else if (inputYear < ageLimit) {
          hasErrors = true;
          throw "Unreasonable Date";
        } else {
            input.style.color = "black";
            hasErrors = false;
        }
    
    } catch (error) {
        input.value = error;
        input.style.color = "red";
    } finally {
        if (hasErrors) {
            console.log(`Form ${
                input.name
            } has errors`);
        }
        return hasErrors;
    }
}

/**
 * Validate Checkboxes
 *  - at least 1 selected
 * 
 */
function validateCheckboxes(inputs) {
    var hasErrors = false;
    var counter = 0;
    var display = document.getElementsByClassName("dislikes-display")[0];

    // try...catch for validation
    try {
        for (var x = 0; x <= inputs.length - 1; x++) {
            if (!inputs[x].checked) {
                counter++
            }

            if (counter === 5) {
                hasErrors = true;
                throw "must select one";
            } else {
                display.style.color = "white";
                display.innerHTML = "";
            }
        }
    } catch (error) {
        display.innerHTML = error;
        display.style.color = "red";

        var checkboxLabels = document.querySelectorAll("section.all-my-exs .dislikes-options--option label")
        for (var x = 0; x <= inputs.length - 1; x++) {
            checkboxLabels[x].style.color = "red";
        }
    } finally {
        return hasErrors;
    }
}

/**
 * Form submit validation
 * 
 */
// 
function validateForm() {
    var hasErrors = false;

    var name = document.getElementById("exName");
    if (validateTextInput(name) === true) {
        hasErrors = true;
    }

    var dumpDate = document.getElementById("exDumpDate");
    if (validateDate(dumpDate) === true) {
        hasErrors = true;
    }

    var reason = document.getElementById("exDumpReason");
    if (validateTextInput(reason) === true) {
        hasErrors = true;
    }

    var dislikes = document.getElementsByName("dislikesOptions");
    if (validateCheckboxes(dislikes) === true) {
        hasErrors = true;
    }

    return hasErrors;

}
