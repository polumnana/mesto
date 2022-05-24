import Card from "../components/Card.js";

import { FormValidator } from "../components/FormValidator.js";

import '../pages/index.css';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupDelete from "../components/PopupDelete.js";
import { renderLoading } from "../components/utils.js";

// Объявляю переменные первого попапа (ред профиль):
const popupProfile = document.querySelector('.popup_profile');

const buttonEditProfile = document.querySelector('.profile__button-edit'); // Кнопка "Редактировать профиль"

const formSubmitEditProfile = document.querySelector('.popup__form_edit-profile'); // Форма

const inputNameEditProfile = document.querySelector('.popup__input_form-name'); // Данные в первом инпуте попапа ред. профиль
const inputAboutEditProfile = document.querySelector('.popup__input_form-about'); // Данные во втором инпуте попапа ред. профиль
const submitButtonEditProfile = document.querySelector('.popup__form-submit_edit-profile'); // Сабмит формы ред профиль

const profileInfoName = document.querySelector('.profile__info-name'); // Данные ИМЯ в самом профиле
const profileInfoAbout = document.querySelector('.profile__info-about'); // Данные О СЕБЕ в самом профиле
const profileAvatar = document.querySelector('.profile__avatar'); // Сама фотка аватар
const buttonEditAvatar = document.querySelector('.profile__button-avatar'); // Кнопка ред аватар


// Объявляю переменные второго попапа (доб фото):
const popupGallery = document.querySelector('.popup_gallery');

const buttonAddNewPost = document.querySelector('.profile__button-add'); // Кнопка "Добавить пост" 

const formSubmitAddPost = document.querySelector('.popup__form_add-photo'); // Форма
const submitButtonAddPost = document.querySelector('.popup__form-submit_add-photo'); // Сабмит формы добавить пост

const photosContainer = document.querySelector('.elements'); // Контейнер с постами

// Объявляю переменные третьего попапа (просмотр фото):
const popupPreview = document.querySelector('.popup_preview');
// Объявляю переменные четвертого попапа (удаление поста):
const popupDelete = document.querySelector('.popup_delete');
// Объявляю переменные пятого попапа (изменение аватара):
const popupEditAvatar = document.querySelector('.popup_update-avatar');
const formSubmitUpdateAvatar = document.querySelector('.popup__form_update-avatar'); // Форма
const submitButtonUpdateAvatar = document.querySelector('.popup__form-submit_update-avatar'); // Сабмит формы обновить аватар


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

function deletePost(card) {
    const id = card.getId();
    api.deleteCard(id)
        .then(() => {
            card.deletePost();
            popupDeletePost.close(); // Автоматически закрыть попап
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
}

function savePopupEditProfile() {
    renderLoading(true, submitButtonEditProfile);

    const newUserInfo = {
        name: inputNameEditProfile.value,
        about: inputAboutEditProfile.value,
    };

    api.updateUserInfo(newUserInfo)
        .then((res) => {
            userInfo.setUserInfo(res); // Из инпута данные летят в профиль
            popupEditProfile.close(); // Автоматически закрыть попап
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            renderLoading(false, submitButtonEditProfile);
        });
} // Передающую из инпутов в данные профиля

function createCardElement(item, isMyCard, like) {
    const card = new Card({
        data: item,
        isMyCard: isMyCard,
        selector: '.element-template',
        handleCardClick: (titlePreview, linkPreview) => { popupImage.open(titlePreview, linkPreview) },
        handleDeleteIconClick: (cardClicked) => {
            popupDeletePost.setCard(cardClicked);
            popupDeletePost.open();
        },
        handleLikePost: () => likeCard(card),
        handleUnlikePost: () => unlikeCard(card),
    }); // Создадается экземпляр карточки из класса
    const cardElement = card.generateCard(); // Создаём карточку и возвращаем наружу
    card.setIsLiked(like);
    return cardElement;
}

function likeCard(card) {
    const cardId = card.getId();
    card.setIsLiked(true);

    api.likeCard(cardId)
        .then((res) => {
            card.setData(res);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
}

function unlikeCard(card) {
    const cardId = card.getId();
    card.setIsLiked(false);

    api.unlikeCard(cardId)
        .then((res) => {
            card.setData(res);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
}

function savePopupAddPost(inputs) {
    formValidators[formSubmitAddPost.name].disableSubmit();
    renderLoading(true, submitButtonAddPost);
    api.createCard(inputs)
        .then((res) => {
            const newPost = createCardElement(res, true, false);
            addPost(newPost, photosContainer);
            popupAddPost.close(); // Автоматически закрыть попап
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            renderLoading(false, submitButtonAddPost);
        });
} // Передающую из инпутов в блок с картинками

function savePopupEditAvatar(inputs) {
    formValidators[formSubmitUpdateAvatar.name].disableSubmit();
    renderLoading(true, submitButtonUpdateAvatar);
    const avatarLink = inputs.link;
    api.updateUserAvatar(avatarLink)
        .then(() => {
            console.log(avatarLink);
            // const newPost = createCardElement(res, true);
            // addPost(newPost, photosContainer);
            popupUpdateAvatar.close(); // Автоматически закрыть попап
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            renderLoading(false, submitButtonAddPost);
        });
}


const userInfo = new UserInfo({ name: profileInfoName, about: profileInfoAbout, avatar: profileAvatar });
// Подгружающую в инпуты данные из профиля,заполняющую заголовок попапа
function openPopupEditProfile() {

    inputNameEditProfile.value = userInfo.getUserInfo().name; // В инпут берутся данные из профиля
    inputAboutEditProfile.value = userInfo.getUserInfo().about; // В инпут берутся данные из профиля

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

function openPopupAvatar() {
    formSubmitUpdateAvatar.reset();

    const validatorUpdateAvatar = formValidators[formSubmitUpdateAvatar.name];
    validatorUpdateAvatar.clearErrors();
    validatorUpdateAvatar.setFormButtonState();

    popupUpdateAvatar.open();
}

function isLikedByMe(card) {
    const myId = userInfo.getUserInfo().id;
    let result = false;

    card.likes.forEach(like => {
        if (like._id == myId)
            result = true;
    });

    return result;
}


// Добавляющую пост пользователя в ленту
function addPost(card, container) {
    container.prepend(card); // Из копии шаблона всё положили на страницу
}

var api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-41',
    headers: {
        authorization: '313ac141-ac1d-4bd4-8cbd-191f2a15741d',
        'Content-Type': 'application/json'
    }
});

api.fetchUserInfo()
    .then((result) => {
        userInfo.setUserInfo(result);

        const myId = result._id;

        // В случае, если успешно, 
        api.fetchCards()
            .then((result) => {
                result.forEach((element) => {
                    const isMyCard = myId === element.owner._id;
                    const like = isLikedByMe(element);
                    addPost(createCardElement(element, isMyCard, like), photosContainer);
                }); // Добавляем в ленту постики (чужие)
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
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

const popupUpdateAvatar = new PopupWithForm(popupEditAvatar, savePopupEditAvatar);
popupUpdateAvatar.setEventListeners();

const popupImage = new PopupWithImage(popupPreview);
popupImage.setEventListeners();

const popupDeletePost = new PopupDelete(popupDelete, deletePost);
popupDeletePost.setEventListeners();

buttonEditProfile.addEventListener("click", openPopupEditProfile); // Открывающую попап кликом на карандашик (ПРОФИЛЬ)
buttonAddNewPost.addEventListener("click", openPopupAddPost); // Открывающую попап кликом на плюсик (ФОТО)
buttonEditAvatar.addEventListener("click", openPopupAvatar);// Открывающую попап кликом на карандашик (АВАТАР)


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