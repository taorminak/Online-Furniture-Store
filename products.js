/*---products JSON---*/
let productsJSON = `[{
    "name":"Syltherine",
    "picture":"./assets/images/ourProducts/image1.png",
    "more":"Stylish cafe chair",
    "price":"$2500",
    "oldPrice":"$3500"
}, {
    "name":"Leviosa",
    "picture":"./assets/images/ourProducts/image2.png",
    "more":"Stylish cafe chair",
    "price":"$2500",
    "oldPrice":""
}, {
    "name":"Lolito",
    "picture":"./assets/images/ourProducts/image3.png",
    "more":"Luxury big sofa",
    "price":"$7000",
    "oldPrice":"$14000"
}, {
    "name":"Respira",
    "picture":"./assets/images/ourProducts/image4.png",
    "more":"Minimalist fan",
    "price":"$500",
    "oldPrice":""
}, {
    "name":"Grifo",
    "picture":"./assets/images/ourProducts/image5.png",
    "more":"Night lamp",
    "price":"$1500",
    "oldPrice":""
}, {
    "name":"Muggo",
    "picture":"./assets/images/ourProducts/image6.png",
    "more":"Small mug",
    "price":"$150",
    "oldPrice":""
}, {
    "name":"Pingky",
    "picture":"./assets/images/ourProducts/image7.png",
    "more":"Cute bed set",
    "price":"$7000",
    "oldPrice":"$14000"
}, {
    "name":"Potty",
    "picture":"./assets/images/ourProducts/image8.png",
    "more":"Minimalist flower pot",
    "price":"$500",
    "oldPrice":""
}, {
    "name":"Brimnes",
    "picture":"./assets/images/ourProducts/image9.png",
    "more":"Minimalist wood bench",
    "price":"$6500",
    "oldPrice":"$13000"
}, {
    "name":"Perjohan",
    "picture":"./assets/images/ourProducts/image10.png",
    "more":"Comfortable bench",
    "price":"$2500",
    "oldPrice":""
}, {
    "name":"Rust",
    "picture":"./assets/images/ourProducts/image11.png",
    "more":"Stylish chair",
    "price":"$5000",
    "oldPrice":"$10000"
}, {
    "name":"Fyresdal",
    "picture":"./assets/images/ourProducts/image12.png",
    "more":"Minimalist flower pot",
    "price":"$5.500",
    "oldPrice":"Rp. 11.000.000"
}]`;


let products = JSON.parse(productsJSON);
let productsArr = products.map(i => i.name);

/*---creating cards---*/
document.addEventListener("DOMContentLoaded", function (event) {
  let productsCards = '';

  for (let product of products) {
    productsCards += `<div class="card elastic">
          <img
            class="card__image"
            src="${product.picture}"
            alt="image"
          />
          <div class="card__info card-info">
            <h3 class="card-info__title">${product.name}</h3>
            <div class="card-info__description">
              <p>${product.more}</p>
            </div>
            <div class="card-info__price card-price">
              <span class="card-price__current">${product.price}</span>
              <span class="card-price__old">${product.oldPrice}</span>
            </div>
          </div>
          <div class="card__btn hover-btn">
          <button class="hover-btn__description">Description</button>
          <button class="hover-btn__add">Add to cart</button>
            <div class="extra-btn">
              <div class="extra-btn__share">
                <button class="share-btn">
                  <img
                    src="./assets/images/ourProducts/shareOrange.png"
                    alt="share"
                  />Share
                </button>
                <ul class="share-list">
            <li class="share-item">
              <a
                href="https://pinterest.com/pin/create/button/?url=http://127.0.0.1:5500/productsPages/${product.name}/index.html&media=&description="
                class="share-link"
              >
              <svg role="img" viewBox="0 0 384 512">
			<path fill="currentColor" d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/>
		</svg>
                pinterest
              </a>
            </li>
            <li class="share-item">
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/sharer/sharer.php?u=http://127.0.0.1:5500/productsPages/${product.name}/index.html"
                class="share-link"
              >
              <svg role="img" viewBox="0 0 320 512">
			<path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
		</svg>
                facebook
              </a>
            </li>
            <li class="share-item">
              <a
                href="https://twitter.com/intent/tweet?url=http://127.0.0.1:5500/productsPages/${product.name}/index.html&text="
                class="share-link"
              >
              <svg role="img" viewBox="0 0 512 512">
			<path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
		</svg>
                twitter
              </a>
            </li>
            <li class="share-item">
              <a
                href="https://www.linkedin.com/shareArticle?mini=true&url=http://127.0.0.1:5500/productsPages/${product.name}/index.html"
                class="share-link"
              >
              <svg role="img" viewBox="0 0 448 512">
			<path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"/>
		</svg>
                linkedin
              </a>
            </li>
            <li class="share-item">
              <a
                href="mailto:?&subject=&cc=&bcc=&body=http://127.0.0.1:5500/productsPages/${product.name}/index.html"
                class="share-link"
              >
              <svg role="img" viewBox="0 0 512 512">
			<path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"/>
		</svg>
                mail
              </a>
            </li>
            <li class="share-item">
              <a
                href="https://t.me/share/url?url=http://127.0.0.1:5500/productsPages/${product.name}/index.html"
                class="share-link"
                rel="nofollow"
                target="_blank"
              >
              <svg role="img" viewBox="0 0 448 512">
			<path fill="currentColor" d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z"/>
		</svg>
                telegram
              </a>
            </li>
          </ul>
              </div>
              <button class="extra-btn__like">
                <img
                  src="./assets/images/ourProducts/heartOrange.png"
                  alt="like"
                />Like
              </button>
            </div>
          </div>
          <div class="overlay"></div>
        </div>`
  }

  document.querySelector('.cards').innerHTML = productsCards;


  /*--add cladd hidden--*/
  let card = document.querySelectorAll('.card');
  for (let i = 8; i < card.length; i++) {
    card[i].classList.add('hidden');
  }

  /*---more/less btn---*/
  let cards = document.querySelectorAll('.card.hidden');
  let moreBtn = document.querySelector('.more-btn');
  let lessBtn = document.querySelector('.less-btn');


  moreBtn.addEventListener("click", function () {
    cards.forEach(card => {
      card.classList.remove('hidden');
    });
    moreBtn.classList.add('hidden');
    lessBtn.classList.remove('hidden');

  });

  lessBtn.addEventListener("click", function () {
    cards.forEach(card => {
      card.classList.add('hidden');
    });
    lessBtn.classList.add('hidden');
    moreBtn.classList.remove('hidden');
  });

  /*---description btn---*/
  let descriptionBtn = document.querySelectorAll('.hover-btn__description');
  for (let i = 0; i < descriptionBtn.length; i++) {
    descriptionBtn[i].addEventListener("click", function () {
      window.location = `http://127.0.0.1:5500/productsPages/${productsArr[i]}/index.html`;
    });
  }

  /*---header products select---*/
  let selectProduct = document.querySelector('#header__select-products');
  selectProduct.addEventListener("change", function () {
    window.location = `http://127.0.0.1:5500/productsPages/${this.value}/index.html`;
  });


  /*---header rooms select---*/
  let selectRoom = document.querySelector('#header__select-rooms');
  selectRoom.addEventListener("change", function () {
    window.location = `http://127.0.0.1:5500/roomsPages/${this.value}/index.html`;
  });

});


/*---search card creation---*/
document.addEventListener("DOMContentLoaded", function (event) {
  let productsCards = '';

  for (let product of products) {
    productsCards += `<div class="container">
    <div class="card-search hidden">
      <img
        class="card__image-search"
        src="${product.picture}"
        alt="image"
      />
      <div class="card__info-search card-info-search">
        <h3 class="card-info__title-search">${product.name}</h3>
        <div class="card-info__description-search">
          <p>${product.more}</p>
        </div>
        </div>
        </div>`
  }
  document.querySelector('.header__search-options').innerHTML = productsCards;


  /*---search on a page---*/
  document.querySelector('.header-input').oninput = function () {
    let val = this.value.trim();
    let elasticItems = document.querySelectorAll('.card-search');
    if (val != '') {
      elasticItems.forEach(function (elem) {
        if (elem.innerText.search(RegExp(val, "gi")) == -1) {
          elem.classList.add('hidden');
        } else {
          elem.classList.remove('hidden');
        }
      });
    } else {
      elasticItems.forEach(function (elem) {
        elem.classList.add('hidden');
      });
    }

  }

  /*---open search cards--*/
  let cardSearch = document.querySelectorAll('.card-search');
  for (let i = 0; i < cardSearch.length; i++) {
    cardSearch[i].addEventListener("click", function () {
      window.location = `http://127.0.0.1:5500/productsPages/${productsArr[i]}/index.html`;
    });
  }

});

/*---Explore more btn---*/
document.querySelector('.text-button').addEventListener('click', function () {
  window.location = `http://127.0.0.1:5500/roomsPages/Bedroom/index.html`;
});

/*---header fixed---*/
let headerFixed = document.querySelector('.header_container');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    headerFixed.classList.add("header-white");
  } else {
    headerFixed.classList.remove("header-white");
  }

});
/*--header-hero-slider---*/
let heroSlider = document.querySelectorAll('.main-slide__container');
heroSlider.forEach((slide) => {
  slide.addEventListener('click', function () {
    window.location = `http://127.0.0.1:5500/productsPages/${this.id}/index.html`;
  })

});