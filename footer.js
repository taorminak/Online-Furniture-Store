function toFB() {
  window.location = "http://facebook.com";
}

function toInsta() {
  window.location = "http://instagram.com";
}

function toTwitt() {
  window.location = "http://twitter.com";
}

function toGooMaps() {
  window.location = "https://goo.gl/maps/zNyuNAhZPGaT9eYh6";
}

function toFuniro() {
  window.location = "https://funiro.net";
}

// Валидация и отправка почты в LocalStorage
const input = document.getElementById("email");
const footerButton = document.querySelector(".footer-button");
const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const emailArray = [];
const message = document.getElementById("message");

function validateEmail() {
  if (input.value.match(mailformat)) {
    message.style.color = "green";
    message.textContent = "Thank you for entering your email!";
    getEmail();
  } else {
    message.style.color = "red";
    message.textContent = "Enter the correct email!";
  }
  input.value = "";
}

function getEmail() {
  emailArray.push(input.value);
  const emailArrayToString = JSON.stringify(emailArray);
  localStorage.setItem("email", emailArrayToString);
  setTimeout(() => message.textContent = "", 3000);
}