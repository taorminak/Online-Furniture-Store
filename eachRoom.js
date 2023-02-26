  /*---each room header click on image----*/
  let roomImg = document.querySelectorAll('.btn__img');
  for (let i = 0; i < roomImg.length; i++) {
      roomImg[i].addEventListener("click", function () {
          window.location = `http://127.0.0.1:5500/productsPages/${this.value}/index.html`;
      });
  }

  /*---home btn---*/
  let home = document.querySelector('.home-btn');
  home.addEventListener('click', function () {
      window.location = `http://127.0.0.1:5500/`;
  });