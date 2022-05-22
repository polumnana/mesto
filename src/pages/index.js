import Card from "../components/Card.js";

import { FormValidator } from "../components/FormValidator.js";

import '../pages/index.css';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";

// Объявляю переменные первого попапа (ред профиль):
const popupProfile = document.querySelector('.popup_profile');

const buttonEditProfile = document.querySelector('.profile__button-edit'); // Кнопка "Редактировать профиль"

const formSubmitEditProfile = document.querySelector('.popup__form_edit-profile'); // Форма

const inputNameEditProfile = document.querySelector('.popup__input_form-name'); // Данные в первом инпуте попапа ред. профиль
const inputAboutEditProfile = document.querySelector('.popup__input_form-about'); // Данные во втором инпуте попапа ред. профиль

const profileInfoName = document.querySelector('.profile__info-name'); // Данные ИМЯ в самом профиле
const profileInfoAbout = document.querySelector('.profile__info-about'); // Данные О СЕБЕ в самом профиле
const profileAvatar = document.querySelector('.profile__avatar');

// Объявляю переменные второго попапа (доб фото):
const popupGallery = document.querySelector('.popup_gallery');

const buttonAddNewPost = document.querySelector('.profile__button-add'); // Кнопка "Добавить пост" 

const formSubmitAddPost = document.querySelector('.popup__form_add-photo'); // Форма


const photosContainer = document.querySelector('.elements'); // Контейнер с постами

// Объявляю переменные третьего попапа (просмотр фото):
const popupPreview = document.querySelector('.popup_preview');


// Свойства валидации:
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-submit',
    inactiveButtonClass: 'popup__form-submit_disabled',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__input_error-active'
};
const formValidators = {}; //Объект, где хранятся экземпляры каждой формы

// Прописываю функции:

function savePopupEditProfile() {
    userInfo.setUserInfo({
        userName: inputNameEditProfile.value,
        infoAbout: inputAboutEditProfile.value,
    }); // Из инпута данные летят в профиль
    popupEditProfile.close(); // Автоматически закрыть попап
} // Передающую из инпутов в данные профиля

function createCardElement(item) {
    const card = new Card(item, '.element-template', (titlePreview, linkPreview) => { popupImage.open(titlePreview, linkPreview) }); // Создадается экземпляр карточки из класса
    const cardElement = card.generateCard(); // Создаём карточку и возвращаем наружу
    return cardElement;
}

function savePopupAddPost(inputs) {
    const newPost = createCardElement(inputs);
    addPost(newPost, photosContainer);
    formValidators[formSubmitAddPost.name].disableSubmit();
    popupAddPost.close(); // Автоматически закрыть попап
} // Передающую из инпутов в блок с картинками

const userInfo = new UserInfo({ userName: profileInfoName, infoAbout: profileInfoAbout, avatar: profileAvatar });
// Подгружающую в инпуты данные из профиля,заполняющую заголовок попапа
function openPopupEditProfile() {

    inputNameEditProfile.value = userInfo.getUserInfo().userName; // В инпут берутся данные из профиля
    inputAboutEditProfile.value = userInfo.getUserInfo().infoAbout; // В инпут берутся данные из профиля

    formValidators[formSubmitEditProfile.name].clearErrors();

    popupEditProfile.open(); // Открыть попап
}

// Ничего не подгружающую в инпуты, заполняющую заголовок попапа
function openPopupAddPost() {
    formSubmitAddPost.reset();

    const validatorAddPost = formValidators[formSubmitAddPost.name];
    validatorAddPost.clearErrors();
    validatorAddPost.setFormButtonState();

    popupAddPost.open();
}

// Добавляющую пост пользователя в ленту
function addPost(card, container) {
    container.prepend(card); // Из копии шаблона всё положили на страницу
}

fetch('https://mesto.nomoreparties.co/v1/cohort-41/cards', {
    headers: {
        authorization: '313ac141-ac1d-4bd4-8cbd-191f2a15741d'
    }
})
    .then(res => res.json())
    .then((result) => {
        result.forEach((element) => {
            addPost(createCardElement(element), photosContainer);
        }); // Добавляем в ленту постики (чужие)
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

fetch('https://mesto.nomoreparties.co/v1/cohort-41/users/me', {
    headers: {
        authorization: '313ac141-ac1d-4bd4-8cbd-191f2a15741d'
    }
})
    .then(res => res.json())
    .then((result) => {
        userInfo.setUserInfo({
            userName: result.name,
            infoAbout: result.about,
            avatar: result.avatar,
            _id: result._id,
            cohort: result.cohort,
        });
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    }); 


// Прописываю события:



const popupAddPost = new PopupWithForm(popupGallery, savePopupAddPost);
popupAddPost.setEventListeners();

const popupEditProfile = new PopupWithForm(popupProfile, savePopupEditProfile);
popupEditProfile.setEventListeners();

const popupImage = new PopupWithImage(popupPreview);
popupImage.setEventListeners();

buttonEditProfile.addEventListener("click", openPopupEditProfile); // Открывающую попап кликом на карандашик (ПРОФИЛЬ)
buttonAddNewPost.addEventListener("click", openPopupAddPost); // Открывающую попап кликом на плюсик (ФОТО)


function enableValidation(settings) {
    const formList = document.querySelectorAll(settings.formSelector);

    formList.forEach((formElement) => {
        const validator = new FormValidator(settings, formElement); // Создадается экземпляр  класса
        validator.enableValidation();

        const name = formElement.name;
        formValidators[name] = validator;
    });
}

enableValidation(validationSettings);