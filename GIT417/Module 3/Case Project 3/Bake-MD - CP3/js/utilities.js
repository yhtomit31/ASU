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
