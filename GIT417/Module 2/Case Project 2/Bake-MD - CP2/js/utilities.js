function notifyUserAddedToCart() {
    // declare and assign element and check if on DOM ? remove() : ""
    var oldAddToCart =  document.getElementsByClassName("add-to-cart-container")[0];
    if (oldAddToCart) { oldAddToCart.remove(); }
    
    // declare and assign variables for new div creation
    var newDiv = document.createElement("div");
    var itemCountSpan = document.createElement("span");
    var cartIcon = document.createElement("i");

    // add class name to created div and style
    newDiv.classList.add("add-to-cart-container");
    newDiv.style.position = "fixed";
    newDiv.style.top = "4em";
    newDiv.style.right = "4em";

    // assign value from localStorage to shopping cart
    itemCountSpan.innerHTML = localStorage.getItem("cartItems");

    // add className to newDiv child element
    cartIcon.className = "fas fa-shopping-cart added-to-cart";

    //  append new elements to DOM
    cartIcon.appendChild(itemCountSpan);
    newDiv.appendChild(cartIcon);    
    document.body.appendChild(newDiv, cartIcon)
}