import Card from "./card.js";
import cards from "./arr.js";
import { openPopup, closePopup } from "./utils.js";

// Объявляю переменные первого попапа (ред профиль):
const popupProfile = document.querySelector('.popup_profile');

const buttonEditProfile = document.querySelector('.profile__button-edit'); // Кнопка "Редактировать профиль"

const buttonCloseEditProfile = document.querySelector('.popup__close-form_edit-profile'); // Закрыть попап ред. профиля
const formSubmitEditProfile = document.querySelector('.popup__form_edit-profile'); // Форма

const inputNameEditProfile = document.querySelector('.popup__input_form-name'); // Данные в первом инпуте попапа ред. профиль
const inputAboutEditProfile = document.querySelector('.popup__input_form-about'); // Данные во втором инпуте попапа ред. профиль

const profileInfoName = document.querySelector('.profile__info-name'); // Данные ИМЯ в самом профиле
const profileInfoAbout = document.querySelector('.profile__info-about'); // Данные О СЕБЕ в самом профиле


// Объявляю переменные второго попапа (доб фото):
const popupGallery = document.querySelector('.popup_gallery');

const buttonAddNewPost = document.querySelector('.profile__button-add'); // Кнопка "Добавить пост" 

const buttonCloseAddPhoto = document.querySelector('.popup__close-form_add-photo'); // Закрыть попап доб. фото
const formSubmitAddPost = document.querySelector('.popup__form_add-photo'); // Форма

const firstInputAddPost = document.querySelector('.popup__input_form-title'); // Данные в первом инпуте попапа доб. пост
const secondInputAddPost = document.querySelector('.popup__input_form-link'); // Данные во втором инпуте попапа доб. пост

const photosContainer = document.querySelector('.elements'); // Контейнер с постами

// Объявляю переменные третьего попапа (просмотр фото):
const popupPreview = document.querySelector('.popup_preview');
const buttonClosePreview = document.querySelector('.popup__close-form_preview'); // Закрыть попап просмотр фото


const photosTemplate = document.querySelector('.element-template').content; // Нашла в документе блок-шаблон
// Прописываю функции:



function savePopupEditProfile(evt) {
    evt.preventDefault();  // Отменить выполнение события по умолчанию
    profileInfoName.textContent = inputNameEditProfile.value; // Из инпута данные летят в профиль
    profileInfoAbout.textContent = inputAboutEditProfile.value; // Из инпута данные летят в профиль
    closePopup(popupProfile); // Автоматически закрыть попап
    console.log('Информация обновлена 🥰');
} // Передающую из инпутов в данные профиля

function savePopupAddPost(evt) {
    evt.preventDefault();  // Отменить выполнение события по умолчанию
    const card = createCard(firstInputAddPost.value, secondInputAddPost.value);
    addPost(card, photosContainer);

    closePopup(popupGallery); // Автоматически закрыть попап
    console.log('Лента обновлена 💬');
} // Передающую из инпутов в блок с картинками



// Подгружающую в инпуты данные из профиля,заполняющую заголовок попапа
function openPopupEditProfile() {
    inputNameEditProfile.value = profileInfoName.textContent; // В инпут берутся данные из профиля
    inputAboutEditProfile.value = profileInfoAbout.textContent; // В инпут берутся данные из профиля
    clearErrors(validationSettings, popupProfile);
    openPopup(popupProfile); // Открыть попап
}

// Ничего не подгружающую в инпуты, заполняющую заголовок попапа
function openPopupAddPost() {
    firstInputAddPost.value = ''; // В инпуте должно быть пусто
    secondInputAddPost.value = ''; // В инпуте должно быть пусто
    clearErrors(validationSettings, popupGallery);
    setFormButtonState(validationSettings, popupGallery);
    openPopup(popupGallery);
}

// Добавляющую пост пользователя в ленту
function addPost(card, container) {
    container.prepend(card); // Из копии шаблона всё положили на страницу
    console.log('Я добавляю постик в ленту 🌸🌸🌸');
}

// Прописываю события:

cards.forEach((element) => {
    const card = new Card(element, '.element-template'); // Создадается экземпляр карточки из класса
    const cardElement = card.generateCard(); // Создаём карточку и возвращаем наружу

    photosContainer.prepend(cardElement);
}); // Добавляем в ленту постики (6 шт)

buttonEditProfile.addEventListener("click", openPopupEditProfile); // Открывающую попап кликом на карандашик (ПРОФИЛЬ)
buttonAddNewPost.addEventListener("click", openPopupAddPost); // Открывающую попап кликом на плюсик (ФОТО)

buttonCloseEditProfile.addEventListener("click", () => closePopup(popupProfile)); // Закрывающую попап ред. профиля кликом на крестик
buttonCloseAddPhoto.addEventListener("click", () => closePopup(popupGallery)); // Закрывающую попап доб. фото кликом на крестик
buttonClosePreview.addEventListener("click", () => closePopup(popupPreview)); // Закрывающую попап просмотр фото кликом на крестик

formSubmitEditProfile.addEventListener("submit", savePopupEditProfile); // Слушатель на "Сохранить" ред. профиля
formSubmitAddPost.addEventListener("submit", savePopupAddPost); // Слушатель на "Сохранить" доб. фото