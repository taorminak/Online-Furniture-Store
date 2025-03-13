const profileContainerChangeButton = document.querySelector(
  ".profile__inputContainer-change-button",
);
const profileImage = document.querySelector(".profile__picture");
const regexpURL =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
const profileMessage = document.querySelector(".profile__message");
const profileArray = [];

// Отобразить инпут для изменения аватарки
function showInput() {
  profileContainerChangeButton.style.display = "none";
  let profileInputContainer = "";
  profileInputContainer += `
    <input class="profile__inputContainer-input" placeholder="Enter the avatar URL">
    <button class="profile__inputContainer-button">
    <div class="fa-sharp fa-solid fa-paper-plane footer-button_icon"></div>
    </button>
    <button class="profile__inputContainer-save-button">Save</button>`;
  document.querySelector(".profile__inputContainer").innerHTML =
    profileInputContainer;

  const profileInput = document.querySelector(".profile__inputContainer-input");
  const profileInputButton = document.querySelector(
    ".profile__inputContainer-button",
  );
  const profileInputSaveButton = document.querySelector(
    ".profile__inputContainer-save-button",
  );

  profileInputButton.addEventListener("click", getUrlAndChangeAva);
  profileInputSaveButton.addEventListener("click", hideInput);

  function getUrlAndChangeAva() {
    if (profileInput.value.match(regexpURL)) {
      profileArray.push(profileInput.value);
      if (profileArray.length > 1) {
        profileArray.shift();
      }
      profileInput.value = "";
      profileMessage.textContent = "";
      const profileArrayToString = JSON.stringify(profileArray);
      localStorage.setItem("avatar_url", profileArrayToString);

      const profileImageFromLocStor = JSON.parse(
        localStorage.getItem("avatar_url"),
      );
      profileImage.setAttribute("src", profileImageFromLocStor);
    } else {
      profileMessage.style.color = "red";
      profileMessage.textContent = "Enter URL";
    }
  }

  // Скрытие инпута и появление изначальной кнопки
  function hideInput() {
    document.querySelector(".profile__inputContainer").innerHTML = "";
    profileContainerChangeButton.style.display = "";
  }
}

// По загрузке страницы берём аву из LS или дефолтную
document.addEventListener("DOMContentLoaded", function () {
  const profileImage = document.querySelector(".profile__picture");

  // Check if avatar_url exists in localStorage
  const savedAvatar = localStorage.getItem("avatar_url");
  if (savedAvatar && savedAvatar !== "null") {
    const profileImageFromLocStor = JSON.parse(savedAvatar);
    profileImage.setAttribute("src", profileImageFromLocStor);
  }

  loadCart();
  loadWishlist();

  // Profile image upload functionality
  const profilePicture = document.querySelector(".profile__picture");
  const inputContainer = document.querySelector(".profile__inputContainer");
  const changeButton = document.querySelector(
    ".profile__inputContainer-change-button",
  );
  const message = document.querySelector(".profile__message");

  if (changeButton && inputContainer && profilePicture && message) {
    changeButton.addEventListener("click", function () {
      // Create file input if it doesn't exist
      let fileInput = inputContainer.querySelector("input[type='file']");
      if (!fileInput) {
        fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        inputContainer.appendChild(fileInput);
      }

      fileInput.click();

      fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            profilePicture.src = e.target.result;
            message.textContent = "Profile picture updated successfully!";
            message.style.color = "green";
            setTimeout(() => {
              message.textContent = "";
            }, 3000);
          };
          reader.readAsDataURL(file);
        }
      });
    });
  }

  // Cart functionality
  const cartContainer = document.querySelector(".cart-items");
  const cartTotal = document.querySelector(".cart-total-price");
  const purchaseBtn = document.querySelector(".btn-purchase");

  if (cartContainer && cartTotal && purchaseBtn) {
    // Initialize cart from localStorage
    updateCartDisplay();

    purchaseBtn.addEventListener("click", function () {
      if (cartContainer.children.length > 0) {
        alert("Thank you for your purchase!");
        localStorage.removeItem("cartItems");
        updateCartDisplay();
      } else {
        alert("Your cart is empty!");
      }
    });
  }

  // Wishlist functionality
  const wishlistContainer = document.querySelector(".wishlist-items");
  if (wishlistContainer) {
    // Initialize wishlist from localStorage
    updateWishlistDisplay();
  }
});

profileContainerChangeButton.addEventListener("click", showInput);

// Загрузка данных корзины
function loadCart() {
  /* eslint-disable no-unused-vars */
  const cartItems = document.querySelector(".cart-items");
  const cartData = JSON.parse(localStorage.getItem("data")) || [];
  /* eslint-enable no-unused-vars */
  // Отображение товаров в корзине
  // ...
}

// Загрузка списка желаний
function loadWishlist() {
  /* eslint-disable no-unused-vars */
  const wishlistItems = document.querySelector(".wishlist-items");
  const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
  /* eslint-enable no-unused-vars */
  // Отображение товаров в списке желаний
  // ...
}

function updateCartDisplay() {
  const cartContainer = document.querySelector(".cart-items");
  const cartTotal = document.querySelector(".cart-total-price");

  if (cartContainer && cartTotal) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartContainer.innerHTML = "";
    let total = 0;

    cartItems.forEach((item, index) => {
      const cartRow = createCartRow(item, index);
      cartContainer.appendChild(cartRow);
      total += parseFloat(item.price.replace("$", "")) * item.quantity;
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
  }
}

function updateWishlistDisplay() {
  const wishlistContainer = document.querySelector(".wishlist-items");
  if (wishlistContainer) {
    const wishlistItems =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];
    wishlistContainer.innerHTML = "";

    wishlistItems.forEach((item, index) => {
      const wishlistRow = createWishlistRow(item, index);
      wishlistContainer.appendChild(wishlistRow);
    });
  }
}

function createCartRow(item, index) {
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  cartRow.innerHTML = `
    <div class="cart-item cart-column">
      <img class="cart-item-image" src="${item.image}" width="100" height="100">
      <span class="cart-item-title">${item.name}</span>
    </div>
    <span class="cart-price cart-column">${item.price}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="${item.quantity}">
      <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
  `;

  // Add event listeners for quantity change and remove button
  setupCartRowEventListeners(cartRow, index);

  return cartRow;
}

function createWishlistRow(item, index) {
  const wishlistRow = document.createElement("div");
  wishlistRow.classList.add("wishlist-row");
  wishlistRow.innerHTML = `
    <div class="wishlist-item wishlist-column">
      <img class="wishlist-item-image" src="${item.image}" width="100" height="100">
      <span class="wishlist-item-title">${item.name}</span>
    </div>
    <span class="wishlist-price wishlist-column">${item.price}</span>
    <div class="wishlist-action wishlist-column">
      <button class="btn btn-primary add-to-cart-btn" type="button">ADD TO CART</button>
      <button class="btn btn-danger remove-from-wishlist-btn" type="button">REMOVE</button>
    </div>
  `;

  // Add event listeners for wishlist buttons
  setupWishlistRowEventListeners(wishlistRow, index);

  return wishlistRow;
}

function setupCartRowEventListeners(cartRow, index) {
  const quantityInput = cartRow.querySelector(".cart-quantity-input");
  const removeButton = cartRow.querySelector(".btn-danger");

  quantityInput.addEventListener("change", function (event) {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems[index].quantity = newQuantity;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartDisplay();
    } else {
      event.target.value = 1;
    }
  });

  removeButton.addEventListener("click", function () {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartDisplay();
  });
}

function setupWishlistRowEventListeners(wishlistRow, index) {
  const addToCartBtn = wishlistRow.querySelector(".add-to-cart-btn");
  const removeBtn = wishlistRow.querySelector(".remove-from-wishlist-btn");

  addToCartBtn.addEventListener("click", function () {
    const wishlistItems =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const item = wishlistItems[index];

    // Add to cart with quantity 1
    cartItems.push({ ...item, quantity: 1 });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Remove from wishlist
    wishlistItems.splice(index, 1);
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));

    updateWishlistDisplay();
    updateCartDisplay();
  });

  removeBtn.addEventListener("click", function () {
    const wishlistItems =
      JSON.parse(localStorage.getItem("wishlistItems")) || [];
    wishlistItems.splice(index, 1);
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
    updateWishlistDisplay();
  });
}
