const containerRoomsPhoto = document.querySelector(".container-rooms__photo");
const containerRoomsButtonNext = document.querySelector(".container-rooms__button-next");
const containerRoomsDots = document.querySelectorAll(".container-rooms__dot");
let containerRoomsPhotoPosition = 0;
let containerRoomsDotsIndex = 0;
const containerRoomsPhotoImage = document.querySelectorAll(".container-rooms__photo_image");
let containerRoomsPhotoImageIndex = 0;

function nextSlide() {
    if (containerRoomsPhotoPosition < (containerRoomsDots.length - 1) * 372) {
        containerRoomsPhotoPosition += 372;
        containerRoomsDotsIndex++;
        containerRoomsPhotoImageIndex++;
    }
    else {
        containerRoomsPhotoPosition = 0;
        containerRoomsDotsIndex = 0;
        containerRoomsPhotoImageIndex = 0;
    }
    containerRoomsPhoto.style.left = -containerRoomsPhotoPosition + "px";
    makeDotActive(containerRoomsDotsIndex);
    changePhotoSize(containerRoomsPhotoImageIndex);
}

function makeDotActive(index) {
    for (let dot of containerRoomsDots) {
        dot.classList.remove("dot-active");
    }
    containerRoomsDots[index].classList.add("dot-active");
}

function changePhotoSize(index) {
    for (let photo of containerRoomsPhotoImage) {
        photo.classList.remove("changeSlidePhotoSize");
    }
    containerRoomsPhotoImage[index].classList.add("changeSlidePhotoSize");
}

containerRoomsButtonNext.addEventListener("click", nextSlide);

containerRoomsDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        containerRoomsPhotoPosition = 372 * index;
        containerRoomsPhoto.style.left = -containerRoomsPhotoPosition + "px";
        containerRoomsDotsIndex = index;
        makeDotActive(containerRoomsDotsIndex);
        containerRoomsPhotoImageIndex = index;
        changePhotoSize(containerRoomsPhotoImageIndex);
    })
})

containerRoomsPhotoImage.forEach((photo, index) => {
    photo.addEventListener("click", () => {
        containerRoomsPhotoPosition = 372 * index;
        containerRoomsPhoto.style.left = -containerRoomsPhotoPosition + "px";
        containerRoomsPhotoImageIndex = index;
        changePhotoSize(containerRoomsPhotoImageIndex);
        containerRoomsDotsIndex = index;
        makeDotActive(containerRoomsDotsIndex);
    })
})
