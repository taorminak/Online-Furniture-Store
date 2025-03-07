const profile = document.querySelector(".profile");
const urlImage = JSON.parse(localStorage.getItem("avatar_url"));

// Вывод аватарки из LS на главную
if (urlImage === null) {
  profile.setAttribute("src", "./assets/profile/profile.jpeg");
} else {
  profile.setAttribute("src", urlImage);
}

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.header__mobile-menu');
    const desktopNav = document.querySelector('.header__navigation');
    const body = document.body;

    // Clone desktop navigation for mobile menu
    if (!mobileMenu.children.length) {
        const navClone = desktopNav.cloneNode(true);
        mobileMenu.appendChild(navClone);
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'header__overlay';
    document.body.appendChild(overlay);

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        burger.setAttribute('aria-expanded', 
            burger.classList.contains('active'));
        body.style.overflow = body.style.overflow === 'hidden' ? '' : 'hidden';
    });

    overlay.addEventListener('click', () => {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    });
});
