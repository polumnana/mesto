// Объявляю переменные
let popup = document.querySelector('.popup'); // попап
let buttonCloseEditProfile = document.querySelector('.popup__close-form'); // Закрыть попап
let buttonEditProfile = document.querySelector('.profile__button-edit'); // Редактировать профиль

// let addNewPost = document.querySelector('.profile__button-add'); // Добавить пост (пока что не делаем)

let nameProfile = document.querySelector('.popup__form-name'); // Данные в edit profile
let aboutProfile = document.querySelector('.popup__form-about'); // Данные в edit profile
let formSubmit = document.querySelector('.popup__form-submit'); // Сохранить


function closePopup() {
    popup.classList.remove('popup_opened');
} // Прописываю функцию, закрывающую попап при чтении страницы

function openPopup() {
    popup.classList.add('popup_opened');
} // Прописываю функцию, открывающую попап кликом


closePopup(); // Вызываю функцию, закрывающую попап при чтении страницы

// Прописываю функцию, открывающую добавить пост (пока что не делаем)

buttonEditProfile.addEventListener("click", openPopup); //Вызываю функцию, открывающую попап кликом

buttonCloseEditProfile.addEventListener("click", closePopup); // Прописываю функцию, закрывающую попап кликом на крестик


// В окне в поле name берутся данные из .profile-info__name
let profileInfoName = document.querySelector('.profile-info__name');
nameProfile = profileInfoName.textContent;


































// Я запуталась, что кто куда должен вводить и как и куда это выводится

// nameProfile.textContent = input.value;
// aboutProfile.textContent = input.value;