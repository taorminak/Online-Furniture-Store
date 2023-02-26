/*---home btn---*/
let home = document.querySelector('.home-btn');
home.addEventListener('click', function () {
  window.location = `http://127.0.0.1:5500/`;
});


/*---to local storage---*/
let addToCartButtons = document.getElementsByClassName("product__btn");
for (let i = 0; i < addToCartButtons.length; i++) {
  let button = addToCartButtons[i];
  button.addEventListener("click", addToCartClicked);
}

function addToCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement;
  let title = shopItem.getElementsByClassName("product__title")[0].innerText;
  let price = shopItem.getElementsByClassName("price__current")[0].innerText;
  let imageSrc = shopItem.getElementsByClassName("product__image")[0].src;
  toLS(title, price, imageSrc);
}

let data = [];
function toLS(title, price, imageSrc) {
  let itemToLS = { title, price, imageSrc };
  data.push(itemToLS);
  localStorage.setItem("data", JSON.stringify(data));
}

