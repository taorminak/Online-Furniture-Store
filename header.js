const profile = document.querySelector(".profile");
const urlImage = JSON.parse(localStorage.getItem('avatar_url'));

// Вывод аватарки из LS на главную
if (urlImage === null) {
    profile.setAttribute("src", "./assets/profile/profile.jpeg");
}
else { profile.setAttribute("src", urlImage); }