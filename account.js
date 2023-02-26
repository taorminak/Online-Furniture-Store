const profileContainerChangeButton = document.querySelector(".profile__inputContainer-change-button");
const profileImage = document.querySelector(".profile__picture");
const regexpURL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
const profileMessage = document.querySelector(".profile__message");
const profileArray = [];

// Отобразить инпут для изменения аватарки
function showInput() {
    profileContainerChangeButton.style.display = "none";
    let profileInputContainer = "";
    profileInputContainer += `
    <input class="profile__inputContainer-input" placeholder="Enter the avatar URL">
    <button class="profile__inputContainer-button">
    <div class="fa-sharp fa-solid fa-paper-plane footer-button_icon"></div>
    </button>
    <button class="profile__inputContainer-save-button">Save</button>`;
    document.querySelector(".profile__inputContainer").innerHTML = profileInputContainer;

    const profileInput = document.querySelector(".profile__inputContainer-input");
    const profileInputButton = document.querySelector(".profile__inputContainer-button");
    const profileInputSaveButton = document.querySelector(".profile__inputContainer-save-button");

    profileInputButton.addEventListener("click", getUrlAndChangeAva);
    profileInputSaveButton.addEventListener("click", hideInput);

    function getUrlAndChangeAva() {
        if (profileInput.value.match(regexpURL)) {
            profileArray.push(profileInput.value);
            if (profileArray.length > 1) {
                profileArray.shift();
            }
            profileInput.value = "";
            profileMessage.textContent = "";
            const profileArrayToString = JSON.stringify(profileArray);
            localStorage.setItem("avatar_url", profileArrayToString);

            const profileImageFromLocStor = JSON.parse(localStorage.getItem("avatar_url"));
            profileImage.setAttribute("src", profileImageFromLocStor);
        }
        else {
            profileMessage.style.color = "red";
            profileMessage.textContent = "Enter URL";
        }
    }

    // Скрытие инпута и появление изначальной кнопки
    function hideInput() {
        document.querySelector(".profile__inputContainer").innerHTML = "";
        profileContainerChangeButton.style.display = "";
    }
}

// По загрузке страницы берём аву из LS или дефолтную 
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("avatar_url").length !== null) {
        const profileImageFromLocStor = JSON.parse(localStorage.getItem("avatar_url"));
        profileImage.setAttribute("src", profileImageFromLocStor);
    }
})

profileContainerChangeButton.addEventListener("click", showInput);