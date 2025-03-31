import { addItemToCart, addItemToWishlist, initializeStore, updateCartCounter } from './store.js';

document.addEventListener("DOMContentLoaded", function() {
  initializeStore();
  
  let addToCartButtonsMain = document.getElementsByClassName("hover-btn__add");
  for (let i = 0; i < addToCartButtonsMain.length; i++) {
    let btn = addToCartButtonsMain[i];
    btn.addEventListener("click", addToCartClickedMain);
  }

  function addToCartClickedMain(event) {
    let btn = event.target;
    let shopItemMain = btn.closest(".shop-item");

    if (!shopItemMain) {
      console.error("Parent .shop-item not found for button", btn);
      return;
    }

    let title =
      shopItemMain.getElementsByClassName("card-info__title")[0].innerText;
    let price = shopItemMain.getElementsByClassName("card-price__current")[0]
      .innerText;
    let imageSrc = shopItemMain.getElementsByClassName("card__image")[0].src;

    if (!title || !price || !imageSrc) {
      console.error("One of the elements is missing", shopItemMain);
      return;
    }

    let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    
    if (btn.textContent === "Remove from cart") {
      // Remove from cart
      btn.textContent = "Add to cart";
      cartProducts = cartProducts.filter(item => item.title !== title);
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      updateCartCounter();
      return;
    }

    // Add to cart
    if (cartProducts.some(item => item.title === title)) {
      alert("This item is already added to the cart");
      return;
    }
    
    cartProducts.push({ title, price, imageSrc });
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    let ind = cartProducts.length - 1;
    addItemToCart(ind, title, price, imageSrc);
    updateCartCounter();
  }

  let addToWishlistItems = document.getElementsByClassName("extra-btn__like");
  for (let i = 0; i < addToWishlistItems.length; i++) {
    let btnWL = addToWishlistItems[i];
    btnWL.addEventListener("click", addToWishlistItemsClicked);
  }

  function addToWishlistItemsClicked(event) {
    let btnWL = event.target;
    let addItem = btnWL.closest(".shop-item");

    if (!addItem) {
      console.error("Parent .shop-item not found for button", btnWL);
      return;
    }

    let titleWL =
      addItem.getElementsByClassName("card-info__title")[0].innerText;
    let priceWL = addItem.getElementsByClassName("card-price__current")[0]
      .innerText;
    let imageSrcWL = addItem.getElementsByClassName("card__image")[0].src;

    if (!titleWL || !priceWL || !imageSrcWL) {
      console.error("One of the required elements is missing", addItem);
      return;
    }

    likeToLS(titleWL, priceWL, imageSrcWL);
    addItemToWishlist(titleWL, priceWL, imageSrcWL);
  }

  function likeToLS(titleWL, priceWL, imageSrcWL) {
    let wishesToLS = { titleWL, priceWL, imageSrcWL };
     let existingItems = JSON.parse(localStorage.getItem("wishlistItems")) || [];

    if (existingItems.some(item => item.title === titleWL)) {
      alert("This item is already added to the wishlist");
      return;
    }

    if (titleWL !== "") {
      existingItems.push(wishesToLS);
    }
    localStorage.setItem("wishlistItems", JSON.stringify(existingItems));
  }
});