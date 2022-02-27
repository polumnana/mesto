// Объявляю переменные
let popupEditProfile = document.querySelector('.popup'); // Попап редактировать профиль
let buttonCloseEditProfile = document.querySelector('.popup__close-form'); // Закрыть попап
let buttonEditProfile = document.querySelector('.profile__button-edit'); // Редактировать профиль

let formSubmit = document.querySelector('.popup__form'); // Форма
let nameProfileInput = document.querySelector('.popup__input_form_name'); // Данные ИМЯ в инпуте
let aboutProfileInput = document.querySelector('.popup__input_form_about'); // Данные О СЕБЕ в инпуте
let profileInfoName = document.querySelector('.profile__info-name'); // Данные ИМЯ в самом профиле
let profileInfoAbout = document.querySelector('.profile__info-about'); // Данные О СЕБЕ в самом профиле
let buttonAddNewPost = document.querySelector('.profile__button-add'); // Добавить пост (пока что не делаем)


// Прописываю функции



function closePopup() {
    popupEditProfile.classList.remove('popup_opened');
} // Прописываю функцию, закрывающую попап при чтении страницы

function openPopup() {
    popupEditProfile.classList.add('popup_opened');
} // Прописываю функцию, открывающую попап кликом 

function openPopupForProfile() {
    openPopup();
    nameProfileInput.value = profileInfoName.textContent; // В инпут берутся данные из профиля
    aboutProfileInput.value = profileInfoAbout.textContent; // В инпут берутся данные из профиля
} // Прописываю функцию, подгружающую в инпуты данные из профиля

function openPopupForPhoto() {
    openPopup();
    nameProfileInput.value = ''; // В инпуте должно быть пусто
    aboutProfileInput.value = ''; // В инпуте должно быть пусто
}




function savePopup(evt) {
    evt.preventDefault();  // Отменяет стандартную отправку формы
    profileInfoName.textContent = nameProfileInput.value; // Из инпута данные летят в профиль
    profileInfoAbout.textContent = aboutProfileInput.value; // Из инпута данные летят в профиль
    closePopup(); // Автоматически закрыть попап
} // Прописываю функцию, передающую из инпутов в данные профиля



// Прописываю события
buttonEditProfile.addEventListener("click", openPopupForProfile); //Вызываю функцию, открывающую попап кликом на карандашик (ПРОФИЛЬ)
buttonAddNewPost.addEventListener("click", openPopupForPhoto);//Вызываю функцию, открывающую попап кликом на плюсик (ФОТО)
buttonCloseEditProfile.addEventListener("click", closePopup); // Прописываю функцию, закрывающую попап кликом на крестик
formSubmit.addEventListener("submit", savePopup);// Прописываю функцию, сохраняющую значения формы
// Прописываю функцию, открывающую добавить пост (пока что не делаем)
