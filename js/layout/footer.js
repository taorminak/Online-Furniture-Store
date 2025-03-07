// Add export statements for functions that are used elsewhere
export function toFB() {
  window.open("https://facebook.com");
}

export function toInsta() {
  window.open("https://instagram.com");
}

export function toTwitt() {
  window.open("https://twitter.com");
}

export function toGooMaps() {
  window.open("https://maps.google.com");
}

export function toFuniro() {
  window.open("https://funiro.com");
}

// Fix regex escape characters

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/* eslint-disable no-unused-vars */
export function validateEmail(email) {
  return emailRegex.test(email);
}
/* eslint-enable no-unused-vars */

// If these functions aren't used anywhere, you can add this comment:
/* eslint-disable no-unused-vars */

// Валидация и отправка почты в LocalStorage
const input = document.getElementById("email");
const message = document.getElementById("message");
let emailArray = [];

function getEmail() {
  emailArray.push(input.value);
  const emailArrayToString = JSON.stringify(emailArray);
  localStorage.setItem("email", emailArrayToString);
  setTimeout(() => (message.textContent = ""), 3000);
}
