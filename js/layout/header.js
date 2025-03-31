document.addEventListener("DOMContentLoaded", () => {
  const profile = document.querySelector(".profile");
  const urlImage = JSON.parse(localStorage.getItem("avatar_url"));

  // Вывод аватарки из LS на главную
  if (profile) {
    if (urlImage === null) {
      profile.setAttribute("src", "./assets/profile/profile.jpeg");
    } else {
      profile.setAttribute("src", urlImage);
    }
  }

  const burger = document.querySelector(".header__burger");
  const mobileMenu = document.querySelector(".header__mobile-menu");
  const closeButton = document.querySelector(".mobile-menu__close");
  const dropdownTitles = document.querySelectorAll(".mobile-nav__title");
  const body = document.body;

  // Toggle mobile menu
  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      body.style.overflow = body.style.overflow === "hidden" ? "" : "hidden";
    });
  }

  // Close mobile menu when clicking close button
  if (closeButton && mobileMenu && burger) {
    closeButton.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      burger.classList.remove("active");
      body.style.overflow = "";
    });
  }

  // Handle dropdown toggles
  if (dropdownTitles.length > 0) {
    dropdownTitles.forEach((title) => {
      title.addEventListener("click", () => {
        const dropdown = title.nextElementSibling;

        // Close other dropdowns
        dropdownTitles.forEach((otherTitle) => {
          if (otherTitle !== title) {
            otherTitle.nextElementSibling.classList.remove("active");
          }
        });

        // Toggle current dropdown
        dropdown.classList.toggle("active");
      });
    });
  }

  // Close mobile menu when clicking outside
  if (mobileMenu && burger) {
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
        mobileMenu.classList.remove("active");
        burger.classList.remove("active");
        body.style.overflow = "";
      }
    });
  }
});

// Search functionality
const mobileSearchInput = document.querySelector(".mobile-search__input");
const mobileSearchResults = document.querySelector(".mobile-search__results");
const products = [
  {
    name: "Syltherine",
    category: "Products",
    url: "./productsPages/Syltherine/index.html",
  },
  {
    name: "Leviosa",
    category: "Products",
    url: "./productsPages/Leviosa/index.html",
  },
  {
    name: "Lolito",
    category: "Products",
    url: "./productsPages/Lolito/index.html",
  },
  {
    name: "Respira",
    category: "Products",
    url: "./productsPages/Respira/index.html",
  },
  {
    name: "Grifo",
    category: "Products",
    url: "./productsPages/Grifo/index.html",
  },
  {
    name: "Muggo",
    category: "Products",
    url: "./productsPages/Muggo/index.html",
  },
  {
    name: "Pingky",
    category: "Products",
    url: "./productsPages/Pingky/index.html",
  },
  {
    name: "Potty",
    category: "Products",
    url: "./productsPages/Potty/index.html",
  },
  {
    name: "Bedroom",
    category: "Rooms",
    url: "./roomsPages/Bedroom/index.html",
  },
  {
    name: "Living Room",
    category: "Rooms",
    url: "./roomsPages/LivingRoom/index.html",
  },
  {
    name: "Kitchen",
    category: "Rooms",
    url: "./roomsPages/Kitchen/index.html",
  },
  {
    name: "Dining Room",
    category: "Rooms",
    url: "./roomsPages/DiningRoom/index.html",
  },
  {
    name: "Bathroom",
    category: "Rooms",
    url: "./roomsPages/Bathroom/index.html",
  },
  {
    name: "Kids' Room",
    category: "Rooms",
    url: "./roomsPages/KidsRoom/index.html",
  },
  {
    name: "Hallway",
    category: "Rooms",
    url: "./roomsPages/Hallway/index.html",
  },
];

if (mobileSearchInput) {
  mobileSearchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase().trim();

    if (searchTerm.length < 2) {
      mobileSearchResults.style.display = "none";
      return;
    }

    const filteredResults = products.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm),
    );

    if (filteredResults.length > 0) {
      mobileSearchResults.innerHTML = filteredResults
        .map(
          (item) => `
                    <a href="${item.url}" class="mobile-search__result">
                        <div class="mobile-search__result-name">${item.name}</div>
                        <div class="mobile-search__result-category">${item.category}</div>
                    </a>
                `,
        )
        .join("");
      mobileSearchResults.style.display = "block";
    } else {
      mobileSearchResults.innerHTML =
        '<div class="mobile-search__no-results">No results found</div>';
      mobileSearchResults.style.display = "block";
    }
  });

  // Close search results when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".mobile-search")) {
      mobileSearchResults.style.display = "none";
    }
  });
}
