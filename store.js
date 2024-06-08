let array = JSON.parse(localStorage.getItem("data"));

for (let i = 0; i < array.length; i++) {
  let title = array[i].title;
  let price = array[i].price;
  let imageSrc = array[i].imageSrc;
  let ind = i;

  addItemToCart(ind, title, price, imageSrc);
}

let list = JSON.parse(localStorage.getItem("wishlist"));

for (let i = 0; i < list.length; i++) {
  let titleWL = list[i].titleWL;
  let priceWL = list[i].priceWL;
  let imageSrcWL = list[i].imageSrcWL;
  let index = i;

  addItemToWishlist(index, titleWL, priceWL, imageSrcWL);
}

function addItemToWishlist(index, titleWL, priceWL, imageSrcWL) {
  let wishlistRow = document.createElement("div");
  wishlistRow.classList.add("wishlist-row");
  let wishlistItems = document.getElementsByClassName("wishlist-items")[0];
  let wishlistItemNames = wishlistItems.getElementsByClassName(
    "wishlist-item-title"
  );
  for (let i = 0; i < wishlistItemNames.length; i++) {
    if (wishlistItemNames[i].innerText == titleWL) {
      alert("This item is already added to the wishlist");
      return;
    }
  }
  let wishlistRowContents = `
        <div class="wishlist-item wishlist-column">
            <img class="wishlist-item-image" src="${imageSrcWL}" width="100" height="100"><br>
            <span class="wishlist-item-title">${titleWL}</span>
        </div>
        <span class="wishlist-price wishlist-column">${priceWL}</span>
        <div class="wishlist-quantity wishlist-column">
            <button class="btn btn-danger" type="button" onclick="removeFromWishlistLS(${index})">Remove</button>
        </div>`;
  wishlistRow.innerHTML = wishlistRowContents;
  wishlistItems.append(wishlistRow);
  wishlistRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeWishlistItem);
}

function removeWishlistItem(event) {
  let buttonClicked = event.target;
  let parent = buttonClicked.parentElement.parentElement;
  parent.remove();
}

function removeFromWishlistLS(index) {
  list.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(list));
}

function addItemToCart(ind, title, price, imageSrc) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button" onclick="removeFromLS(${ind})">Remove</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
  updateCartTotal();
  console.log(ind);
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function removeFromLS(ind) {
  array.splice(ind, 1);
  localStorage.setItem("data", JSON.stringify(array));
  console.log(ind);
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}



function ready() {
  let removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Thank you for your purchase");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  clearLS();
  updateCartTotal();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function clearLS() {
  localStorage.clear();
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
