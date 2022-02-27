// Объявляю переменные
let popupEditProfile = document.querySelector('.popup'); // Попап редактировать профиль
let buttonCloseEditProfile = document.querySelector('.popup__close-form'); // Закрыть попап
let buttonEditProfile = document.querySelector('.profile__button-edit'); // Редактировать профиль

let formSubmit = document.querySelector('.popup__form'); // Форма
let popupTitle = document.querySelector('.popup__title');
let firstProfileInput = document.querySelector('.popup__input_form_name'); // Данные в первом инпуте
let secondProfileInput = document.querySelector('.popup__input_form_about'); // Данные во втором инпуте
let profileInfoName = document.querySelector('.profile__info-name'); // Данные ИМЯ в самом профиле
let profileInfoAbout = document.querySelector('.profile__info-about'); // Данные О СЕБЕ в самом профиле
let buttonAddNewPost = document.querySelector('.profile__button-add'); // Добавить пост 
let photosContainer = document.querySelector('.elements'); // Контейнер с постами


// Массив с исходными фотографиями
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];




// Прописываю функции

function closePopup() {
    popupEditProfile.classList.remove('popup_opened');
} // Прописываю функцию, закрывающую попап при чтении страницы

function openPopup() {
    popupEditProfile.classList.add('popup_opened');
} // Прописываю функцию, открывающую попап кликом 

function openPopupForProfile() {
    openPopup();
    firstProfileInput.value = profileInfoName.textContent; // В инпут берутся данные из профиля
    secondProfileInput.value = profileInfoAbout.textContent; // В инпут берутся данные из профиля
    popupTitle.textContent = 'Редактировать профиль';
    firstProfileInput.placeholder = 'Леник Бобзиковна';
    secondProfileInput.placeholder = 'Люблю гладить котиков';
    formSubmit.removeEventListener("submit", savePopupPhoto);
    formSubmit.addEventListener("submit", savePopup);
} // Прописываю функцию, подгружающую в инпуты данные из профиля, заполняющую плейсхолдеры и заполняющую заголовок попапа

function openPopupForPhoto() {
    openPopup();
    firstProfileInput.value = ''; // В инпуте должно быть пусто
    secondProfileInput.value = ''; // В инпуте должно быть пусто
    popupTitle.textContent = 'Новое место';
    firstProfileInput.placeholder = 'Название';
    secondProfileInput.placeholder = 'Ссылка на картинку';
    formSubmit.removeEventListener("submit", savePopup);
    formSubmit.addEventListener("submit", savePopupPhoto);
} // Прописываю функцию, ничего не подгружающую в инпуты, заполняющую плейсхолдеры и заполняющую заголовок попапа

function addPost(title, image) {
    let photosTemplate = document.querySelector('.element-template').content; // Нашла в документе блок-шаблон
    let elementTemplate = photosTemplate.querySelector('.element').cloneNode(true); // Скопировала содержимое блока-шаблона с содержимым
    elementTemplate.querySelector('.element__title').textContent = title.value; // То, что в первом инпуте, положилось в заголовок
    elementTemplate.querySelector('.element__img').setAttribute('src', image.value); // То, что во втором инпуте, положилось в атрибут
    photosContainer.prepend(elementTemplate);
} // Прописываю функцию, добавляющую посты в ленту

function savePopup(evt) {
    evt.preventDefault();  // Отменяет стандартную отправку формы
    profileInfoName.textContent = firstProfileInput.value; // Из инпута данные летят в профиль
    profileInfoAbout.textContent = secondProfileInput.value; // Из инпута данные летят в профиль
    closePopup(); // Автоматически закрыть попап
    console.log('❤️');
} // Прописываю функцию, передающую из инпутов в данные профиля

function savePopupPhoto(evt) {
    evt.preventDefault();  // Отменить стандартную отправку формы
    addPost(firstProfileInput, secondProfileInput); // Добавить пост в ленту (в аргументах инпуты, где пользователь ввёл данные)
    closePopup(); // Автоматически закрыть попап
    console.log('❤️❤️');
} // Прописываю функцию, передающую из инпутов в блок с картинками



// Прописываю события
buttonEditProfile.addEventListener("click", openPopupForProfile); //Вызываю функцию, открывающую попап кликом на карандашик (ПРОФИЛЬ)
buttonAddNewPost.addEventListener("click", openPopupForPhoto);//Вызываю функцию, открывающую попап кликом на плюсик (ФОТО)
buttonCloseEditProfile.addEventListener("click", closePopup); // Прописываю функцию, закрывающую попап кликом на крестик
// Прописываю функцию, сохраняющую значения формы
// Прописываю функцию, открывающую добавить пост (пока что не делаем)
