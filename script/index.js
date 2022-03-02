// Объявляю переменные:
const popupEditProfile = document.querySelector('.popup'); // Попап редактировать профиль
const buttonCloseEditProfile = document.querySelector('.popup__close-form'); // Закрыть попап
const buttonEditProfile = document.querySelector('.profile__button-edit'); // Редактировать профиль

const formSubmit = document.querySelector('.popup__form'); // Форма
const popupTitle = document.querySelector('.popup__title'); // Заголовок формы
const firstProfileInput = document.querySelector('.popup__input_form_name'); // Данные в первом инпуте
const secondProfileInput = document.querySelector('.popup__input_form_about'); // Данные во втором инпуте
const profileInfoName = document.querySelector('.profile__info-name'); // Данные ИМЯ в самом профиле
const profileInfoAbout = document.querySelector('.profile__info-about'); // Данные О СЕБЕ в самом профиле
const buttonAddNewPost = document.querySelector('.profile__button-add'); // Добавить пост 
const photosContainer = document.querySelector('.elements'); // Контейнер с постами


// Массив с исходными фотографиями:
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

// Прописываю функции:

function closePopup() {
    popupEditProfile.classList.remove('popup_opened');
} // Закрывающую попап 

function openPopup() {
    popupEditProfile.classList.add('popup_opened');
} // Открывающую попап

function openPopupForProfile() {
    openPopup(); // Открыть попап
    firstProfileInput.value = profileInfoName.textContent; // В инпут берутся данные из профиля
    secondProfileInput.value = profileInfoAbout.textContent; // В инпут берутся данные из профиля
    popupTitle.textContent = 'Редактировать профиль';
    firstProfileInput.placeholder = 'Леник Бобзиковна';
    secondProfileInput.placeholder = 'Люблю гладить котиков';
    formSubmit.removeEventListener("submit", savePopupPhoto); // Убираю чужой слушатель
    formSubmit.addEventListener("submit", savePopup); // Добавляю нужный слушатель
} // Подгружающую в инпуты данные из профиля, заполняющую плейсхолдеры и заполняющую заголовок попапа

function openPopupForPhoto() {
    openPopup();
    firstProfileInput.value = ''; // В инпуте должно быть пусто
    secondProfileInput.value = ''; // В инпуте должно быть пусто
    popupTitle.textContent = 'Новое место';
    firstProfileInput.placeholder = 'Название';
    secondProfileInput.placeholder = 'Ссылка на картинку';
    formSubmit.removeEventListener("submit", savePopup); // Убираю чужой слушатель
    formSubmit.addEventListener("submit", savePopupPhoto); // Добавляю нужный слушатель
} // Ничего не подгружающую в инпуты, заполняющую плейсхолдеры и заполняющую заголовок попапа

function likeActive(evt) {
    evt.preventDefault(); // Отменить выполнение события по умолчанию
    const targetLike = evt.target; // То, куда нажали, кладём в переменную
    targetLike.classList.toggle('element__button_active'); // Тому, что в переменной, переключаем класс
    console.log('Лайков много не бывает! ❤️');
} // Меняющую лайк

function addPost(title, image) {

    // Переменные
    const photosTemplate = document.querySelector('.element-template').content; // Нашла в документе блок-шаблон
    const elementTemplate = photosTemplate.querySelector('.element').cloneNode(true); // Скопировала содержимое блока-шаблона с содержимым

    const elementPreview = elementTemplate.querySelector('.element__preview'); // Нашла в копии шаблона "просмотр"
    const elementDelete = elementTemplate.querySelector('.element__delete'); // Нашла в копии шаблона "удалить"
    const like = elementTemplate.querySelector('.element__button'); // Нашла в копии шаблона "лайк"
    const buttonOpenPreview = elementTemplate.querySelector('.element__img'); // Нашла в копии шаблона "фото"
    const buttonClosePreview = elementTemplate.querySelector('.preview__close-form'); // Нашла в копии шаблона "закрыть"

    // Возвращаю значения в нужные места:
    elementTemplate.querySelector('.preview__img').setAttribute('src', image); // Передали карточке SRC 
    elementTemplate.querySelector('.preview__img').setAttribute('alt', title); // Передали карточке ALT 
    elementTemplate.querySelector('.preview__text').textContent = title;  // Передали карточке заголовок 

    elementTemplate.querySelector('.element__title').textContent = title; // То, что в первом инпуте, положилось в заголовок
    elementTemplate.querySelector('.element__img').setAttribute('src', image);// Ссылка положилась в атрибут SRC
    elementTemplate.querySelector('.element__img').setAttribute('alt', title); // Название положилось в атрибут ALT
    photosContainer.prepend(elementTemplate); // Из копии шаблона всё положили на страницу

    // Прописываю функции:
    function removeElement(evt) {
        evt.preventDefault();  // Отменить выполнение события по умолчанию
        elementTemplate.remove();
        console.log('Прощай, пост! 🙈');
    } // Удаляющую пост

    // Слушатели:
    like.addEventListener("click", likeActive); // Добавила на "лайк" слушатель
    elementDelete.addEventListener("click", removeElement); // Добавила на "удалить" слушатель
    buttonClosePreview.addEventListener("click", evt => {
        elementPreview.classList.remove('element__preview_opened');
        console.log('Закрываю просмотр 🔥');
    }); // Добавила на "закрыть" слушатель
    buttonOpenPreview.addEventListener("click", evt => {
        elementPreview.classList.add('element__preview_opened');
        console.log('Покажи поближе 👀');
    }); // Добавила на "фото" слушатель

    console.log('Я добавляю постик в ленту 🌸🌸🌸');
} // Добавляющую пост пользователя в ленту


function addDefaultPost() {
    initialCards.forEach(function (element) {
        addPost(element.name, element.link);
    });
} // Добавляющую посты (6шт) в ленту (из задания)

function savePopup(evt) {
    evt.preventDefault();  // Отменить выполнение события по умолчанию
    profileInfoName.textContent = firstProfileInput.value; // Из инпута данные летят в профиль
    profileInfoAbout.textContent = secondProfileInput.value; // Из инпута данные летят в профиль
    closePopup(); // Автоматически закрыть попап
    console.log('Информация обновлена 🥰');
} // Передающую из инпутов в данные профиля

function savePopupPhoto(evt) {
    evt.preventDefault();  // Отменить выполнение события по умолчанию
    addPost(firstProfileInput.value, secondProfileInput.value); // Добавить пост в ленту (в аргументах инпуты, где пользователь ввёл данные)
    closePopup(); // Автоматически закрыть попап
    console.log('Лента обновлена 💬');
} // Передающую из инпутов в блок с картинками


// Прописываю события:
addDefaultPost(); // Вызываю функцию, добавляющую посты (6шт) в ленту (из задания)

buttonEditProfile.addEventListener("click", openPopupForProfile); //Вызываю функцию, открывающую попап кликом на карандашик (ПРОФИЛЬ)
buttonAddNewPost.addEventListener("click", openPopupForPhoto);//Вызываю функцию, открывающую попап кликом на плюсик (ФОТО)
buttonCloseEditProfile.addEventListener("click", closePopup); // Прописываю функцию, закрывающую попап кликом на крестик