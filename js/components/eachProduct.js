document.addEventListener("DOMContentLoaded", function () {
  let home = document.querySelector(".home-btn");
  if (home) {
    home.addEventListener("click", function () {
      window.location.href = "http://127.0.0.1:5500/";
    });
  }

  let addToCartButtons = document.getElementsByClassName("product__btn");
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  function addToCartClicked(event) {
    let button = event.target;
    let shopItem = button.closest(".product");

    if (!shopItem) {
      console.error("product not found for button", button);
      return;
    }

    let titleElem = shopItem.querySelector(".product__title");
    let priceElem = shopItem.querySelector(".price__current");
    let imageElem = shopItem.querySelector(".product__image");

    if (!titleElem || !priceElem || !imageElem) {
      console.error("One of the required elements is missing in", shopItem);
      return;
    }

    let title = titleElem.innerText.trim();
    let price = priceElem.innerText.trim();
    let imageSrc = imageElem.src;

    // Получаем текущие товары из localStorage
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    
    if (button.textContent === "Remove from cart") {
      // Remove from cart
      button.textContent = "Add to cart";
      cartProducts = cartProducts.filter(item => item.title !== title);
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    } else {
      // Add to cart
      const existingItem = cartProducts.find(item => item.title === title);
      if (existingItem) {
        alert("This item is already in the cart");
        return;
      }
      
      button.textContent = "Remove from cart";
      cartProducts.push({ title, price, imageSrc });
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      alert("Item added to the cart");
    }
  }
});
 