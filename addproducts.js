window.onload = function myFunction() {
  let addToCartButtonsMain = document.getElementsByClassName("hover-btn__add");
  for (let i = 0; i < addToCartButtonsMain.length; i++) {
    let btn = addToCartButtonsMain[i];
    btn.addEventListener("click", addToCartClickedMain);
  }

  function addToCartClickedMain(event) {
    let btn = event.target;
    let shopItemMain = btn.parentElement.parentElement;
    let title =
      shopItemMain.getElementsByClassName("card-info__title")[0].innerText;
    let price = shopItemMain.getElementsByClassName("card-price__current")[0]
      .innerText;
    let imageSrc = shopItemMain.getElementsByClassName("card__image")[0].src;
    toLS(title, price, imageSrc);
  }

  let data = [];
  function toLS(title, price, imageSrc) {
    let itemToLS = { title, price, imageSrc };
    if (title !== 0) {
      data.push(itemToLS);
    }
    localStorage.setItem("data", JSON.stringify(data));
  }
  localStorage.setItem("data", JSON.stringify(data));

  let addToWishlist = document.getElementsByClassName("extra-btn__like");
  for (let i = 0; i < addToWishlist.length; i++) {
    let btnWL = addToWishlist[i];
    btnWL.addEventListener("click", addToWishlistClicked);
  }

  function addToWishlistClicked(event) {
    let btnWL = event.target;
    let addItem = btnWL.parentElement.parentElement.parentElement;
    let titleWL =
      addItem.getElementsByClassName("card-info__title")[0].innerText;
    let priceWL = addItem.getElementsByClassName("card-price__current")[0]
      .innerText;
    let imageSrcWL = addItem.getElementsByClassName("card__image")[0].src;

    likeToLS(titleWL, priceWL, imageSrcWL);
  }

  let wishlist = [];
  function likeToLS(titleWL, priceWL, imageSrcWL) {
    let wishesToLS = { titleWL, priceWL, imageSrcWL };
    if (titleWL !== 0) {
      wishlist.push(wishesToLS);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

