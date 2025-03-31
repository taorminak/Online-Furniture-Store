// Global variables for storing cart and wishlistItems data
let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
let wishlistItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];

// Функция обновления счетчика корзины
function updateCartCounter() {
  const counter = document.querySelector('.cart-counter');
  if (counter) {
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const count = cartProducts.length;
    counter.textContent = count;
    counter.style.display = count > 0 ? 'block' : 'none';
    console.log('Cart counter updated:', count);
  }
}

export function addItemToCart(ind, title, price, imageSrc) {
  let cartItems = document.getElementsByClassName("cart-items")[0];
  
  // Проверяем, существует ли элемент корзины
  if (!cartItems) {
    return; // Если элемента нет, просто выходим
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
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
  cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged);
  updateCartTotal();
  updateCartCounter();
}

export function addItemToWishlist(index, titleWL, priceWL, imageSrcWL) {
  let wishlistItems = document.getElementsByClassName("wishlist-items")[0];
  
  let wishlistItemsRowContents = `
    <div class="wishlist-item wishlist-column">
      <img class="wishlist-item-image" src="${imageSrcWL}" width="100" height="100"><br>
      <span class="wishlist-item-title">${titleWL}</span>
    </div>
    <span class="wishlist-price wishlist-column">${priceWL}</span>
    <div class="wishlist-quantity wishlist-column">
      <button class="btn btn-danger" type="button" onclick="removeFromWishlistItemsLS(${index})">Remove</button>
    </div>`;
  let wishlistItemsRow = document.createElement("div");
  wishlistItemsRow.classList.add("wishlist-row");
  wishlistItemsRow.innerHTML = wishlistItemsRowContents;
  wishlistItems.append(wishlistItemsRow);
  wishlistItemsRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeWishlistItem);
}

export function removeWishlistItem(event) {
  let buttonClicked = event.target;
  let parent = buttonClicked.parentElement.parentElement;
  parent.remove();
}

export function removeFromWishlistItemsLS(index) {
  wishlistItems = wishlistItems.filter((_, i) => i !== index);
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
}

export function removeCartItem(event) {
  let buttonClicked = event.target;
  let parent = buttonClicked.closest(".cart-row");
  let title = parent.querySelector(".cart-item-title").innerText;
  parent.remove();
  removeFromLS(title);
  updateCartTotal();
}

export function removeFromLS(title) {
  cartProducts = cartProducts.filter((item) => item.title !== title);
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  updateCartCounter();
  updateCartTotal();
}

export function ready() {
  // Add event listeners only if elements exist
  const removeCartItemButtons = document.getElementsByClassName("btn-danger");
  if (removeCartItemButtons && removeCartItemButtons.length > 0) {
    Array.from(removeCartItemButtons).forEach(button => {
      button.addEventListener("click", removeCartItem);
    });
  }

  const quantityInputs = document.getElementsByClassName("cart-quantity-input");
  if (quantityInputs && quantityInputs.length > 0) {
    Array.from(quantityInputs).forEach(input => {
      input.addEventListener("change", quantityChanged);
    });
  }

  const purchaseButton = document.getElementsByClassName("btn-purchase")[0];
  if (purchaseButton) {
    purchaseButton.addEventListener("click", purchaseClicked);
  }
}

export function purchaseClicked() {
  alert("Thank you for your purchase");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  clearLS();
  updateCartTotal();
}

export function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

export function clearLS() {
  localStorage.removeItem("cartProducts");
  localStorage.removeItem("wishlistItems");
  cartProducts = [];
  wishlistItems = [];
}

export function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];

  if (!cartItemContainer) {
    console.error("Cart item container not found!");
    return;
  }

  let cartRows = cartItemContainer.getElementsByClassName("cart-row");

  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];

    let priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];

    if (priceElement && quantityElement) {
      let priceText = priceElement.textContent;
     
      if (priceText) {
        let price = parseFloat(priceText.replace(/[^\d.]/g, ""));

        let quantity = quantityElement.value;
        total = total + price * quantity;
      } else {
        console.error("priceElement.innerText is empty or undefined");
      }
    } else {
      console.error("Price or quantity element is missing");
    }
  }

  total = Math.round(total * 100) / 100;

  let totalElement = document.getElementsByClassName("cart-total-price")[0];

  if (totalElement) {
    totalElement.innerText = "$" + total;
  } else {
    console.error("Cart total price element not found!");
  }
}

export function initializeStore() {
  // Initialize event listeners
  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }

  updateCartCounter();
  // Only proceed with cart/wishlistItems initialization if we're on the account page
  const cartItems = document.getElementsByClassName("cart-items")[0];
  const wishlistItems = document.getElementsByClassName("wishlistItems-items")[0];
  
  if (cartItems || wishlistItems) {
    // Clear existing items in DOM first
    if (cartItems) {
      while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
      }
    }
    if (wishlistItems) {
      while (wishlistItems.hasChildNodes()) {
        wishlistItems.removeChild(wishlistItems.firstChild);
      }
    }

    console.log("Loading cart items from localStorage:", cartProducts);
    console.log("Loading wishlistItems items from localStorage:", wishlistItems);

    // Initialize cart and wishwishlistItemsItems from localStorage
    if (cartItems) {
      for (let i = 0; i < cartProducts.length; i++) {
        let title = cartProducts[i].title;
        let price = cartProducts[i].price;
        let imageSrc = cartProducts[i].imageSrc;
        let ind = i;
        addItemToCart(ind, title, price, imageSrc);
      }
    }

    if (wishlistItems) {
      for (let i = 0; i < wishlistItems.length; i++) {
        let titleWL = wishlistItems[i].titleWL;
        let priceWL = wishlistItems[i].priceWL;
        let imageSrcWL = wishlistItems[i].imageSrcWL;
        let index = i;
        addItemToWishlist(index, titleWL, priceWL, imageSrcWL);
      }
    }
  }
}

// Only run initialization in browser environment, not in tests
if (typeof process === "undefined" || process.env.NODE_ENV !== "test") {
  console.log("initialize")
  initializeStore();
}

export { updateCartCounter };
