window.onload = function () {
  const furnitureBody = document.querySelector(".furniture__body");

  if (!furnitureBody) return;

  const furnitureItems = document.querySelector(".furniture__items");
  const columns = document.querySelectorAll(".furniture__column");
  const speed = furnitureBody.dataset.speed;

  let currentPosition = 0;
  let mousePosition = 0;

  function moveItems() {
    let columnsWidth = 0;
    columns.forEach((column) => {
      columnsWidth += column.offsetWidth;
    });

    const difference = columnsWidth - furnitureBody.offsetWidth;
    const delta = Math.floor(mousePosition - currentPosition);
    currentPosition += delta * speed;

    const translation = (difference / 200) * currentPosition;
    furnitureItems.style.transform = `translate3d(${-translation}px, 0, 0)`;

    if (Math.abs(delta) > 0) {
      requestAnimationFrame(moveItems);
    } else {
      furnitureBody.classList.remove("_init");
    }
  }

  furnitureBody.addEventListener("mousemove", function (e) {
    const containerWidth = furnitureBody.offsetWidth;
    const mouseX = e.pageX - containerWidth / 2;
    mousePosition = (mouseX / containerWidth) * 350;

    if (!furnitureBody.classList.contains("_init")) {
      requestAnimationFrame(moveItems);
      furnitureBody.classList.add("_init");
    }
  });
};
