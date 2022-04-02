const initialCards = window.initialCards;
const popupList = document.querySelectorAll('.popup');
// Объявляю переменные первого попапа (ред профиль):
const popupProfile = document.querySelector('.popup_profile');

const buttonEditProfile = document.querySelector('.profile__button-edit'); // Кнопка "Редактировать профиль"

const buttonCloseEditProfile = document.querySelector('.popup__close-form_edit-profile'); // Закрыть попап ред. профиля
const formSubmitEditProfile = document.querySelector('.popup__form_edit-profile'); // Форма

const firstInputEditProfile = document.querySelector('.popup__input_form-name'); // Данные в первом инпуте попапа ред. профиль
const secondInputEditProfile = document.querySelector('.popup__input_form-about'); // Данные во втором инпуте попапа ред. профиль

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
const previewImg = document.querySelector('.popup__img'); // Крупное фото попап 
const previewText = document.querySelector('.popup__text'); // Описание фото попап 


// Прописываю функции:

// Открывающую попап
function openPopup(element) {
    element.classList.add('popup_opened');
    document.onkeydown = function (evt) {
        if (evt.key === 'Escape') {
            closePopup(element);
        }
    };
    const formElement = element.querySelector('.popup__form');
    const inputList = Array.from(element.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        checkInputValidity(formElement, inputElement);
    });
}

// Закрывающую попап 
function closePopup(element) {
    element.classList.remove('popup_opened');
    document.onkeydown = null;
}
// Закрывающую попап на оверлей
popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
});

function savePopupEditProfile(evt) {
    evt.preventDefault();  // Отменить выполнение события по умолчанию
    profileInfoName.textContent = firstInputEditProfile.value; // Из инпута данные летят в профиль
    profileInfoAbout.textContent = secondInputEditProfile.value; // Из инпута данные летят в профиль
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
    firstInputEditProfile.value = profileInfoName.textContent; // В инпут берутся данные из профиля
    secondInputEditProfile.value = profileInfoAbout.textContent; // В инпут берутся данные из профиля
    openPopup(popupProfile); // Открыть попап
}

// Ничего не подгружающую в инпуты, заполняющую заголовок попапа
function openPopupAddPost() {
    openPopup(popupGallery);
    firstInputAddPost.value = ''; // В инпуте должно быть пусто
    secondInputAddPost.value = ''; // В инпуте должно быть пусто
}

function openPopupPreview(name, link) {
    openPopup(popupPreview); // Открыть попап
    previewImg.setAttribute('src', link); // Передали карточке SRC 
    previewImg.setAttribute('alt', name); // Передали карточке ALT 
    previewText.textContent = name;  // Передали карточке заголовок 
    console.log('Покажи поближе 👀');
}

// Меняющую лайк
function likeActive(evt) {
    evt.preventDefault(); // Отменить выполнение события по умолчанию
    const targetLike = evt.target; // То, куда нажали, кладём в переменную
    targetLike.classList.toggle('element__button_active'); // Тому, что в переменной, переключаем класс
    console.log('Лайков много не бывает! ❤️');
}

// Создающую карточку-пост
function createCard(title, image) {

    // Переменные
    const photosTemplate = document.querySelector('.element-template').content; // Нашла в документе блок-шаблон
    const elementTemplate = photosTemplate.querySelector('.element').cloneNode(true); // Скопировала содержимое блока-шаблона с содержимым

    const elementDelete = elementTemplate.querySelector('.element__delete'); // Нашла в копии шаблона "удалить"
    const like = elementTemplate.querySelector('.element__button'); // Нашла в копии шаблона "лайк"
    const elementImage = elementTemplate.querySelector('.element__img'); // Нашла в копии шаблона "фото"

    elementTemplate.querySelector('.element__title').textContent = title; // То, что в первом инпуте, положилось в заголовок
    elementImage.setAttribute('src', image);// Ссылка положилась в атрибут SRC
    elementImage.setAttribute('alt', title); // Название положилось в атрибут ALT

    // Прописываю функции:
    function removeElement(evt) {
        evt.preventDefault(); // Отменить выполнение события по умолчанию
        elementTemplate.remove();
        console.log('Прощай, пост! 🙈');
    } // Удаляющую пост

    // Слушатели:
    like.addEventListener("click", likeActive); // Добавила на "лайк" слушатель
    elementDelete.addEventListener("click", removeElement); // Добавила на "удалить" слушатель

    elementImage.addEventListener("click", evt => {
        openPopupPreview(title, image);
    }); // Добавила на "фото" слушатель

    return elementTemplate; // Вернуть результат функции
};

// Добавляющую пост пользователя в ленту
function addPost(card, container) {
    container.prepend(card); // Из копии шаблона всё положили на страницу
    console.log('Я добавляю постик в ленту 🌸🌸🌸');
}

// Показываем ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input_error-active');
};
// Скрываем ошибку
const hideInputError = (formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type-error');
    console.log(formElement, inputElement);
    errorElement.classList.remove('popup__input_error-active');
    errorElement.textContent = '';
};
//Показываем или скрываем ошибку
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);// Проверяем форму и инпуты

    } else {
        hideInputError(formElement, inputElement);
    }
};

//Вешаем на инпут слушатели: один смотрит валидность, другой переключаем состояние кнопки
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__form-submit');

    toggleButtonState(inputList, buttonElement); // чтобы сразу заблокировать кнопку при загрузке страницы
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};
//Валидация
function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();//Прерываем
        });
        setEventListeners(formElement);//Смотрим валидность, продолжаем
    });
}

// Функция принимает массив инпутов и смотрит их валидность
function hasInvalidInput(inputList) {
    return inputList.some(function (inputElement) { // проходим по этому массиву методом some
        return !inputElement.validity.valid; // Если поле не валидно, 
        //  колбэк вернёт true (Обход массива прекратится и вся фунцкция вернёт true)
    })
}

// Функция на основании валидности инпутов меняет состояние кнопки
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__form-submit_disabled');
    } else {
        buttonElement.classList.remove('popup__form-submit_disabled');
    }
}



// Прописываю события:



enableValidation();
// Вызываю функцию, добавляющую посты (6шт) в ленту (из задания)
initialCards.forEach(function (element) {
    const card = createCard(element.name, element.link);
    addPost(card, photosContainer);
});

buttonEditProfile.addEventListener("click", openPopupEditProfile); // Открывающую попап кликом на карандашик (ПРОФИЛЬ)
buttonAddNewPost.addEventListener("click", openPopupAddPost); // Открывающую попап кликом на плюсик (ФОТО)

buttonCloseEditProfile.addEventListener("click", () => closePopup(popupProfile)); // Закрывающую попап ред. профиля кликом на крестик
buttonCloseAddPhoto.addEventListener("click", () => closePopup(popupGallery)); // Закрывающую попап доб. фото кликом на крестик
buttonClosePreview.addEventListener("click", () => closePopup(popupPreview)); // Закрывающую попап просмотр фото кликом на крестик

formSubmitEditProfile.addEventListener("submit", savePopupEditProfile); // Слушатель на "Сохранить" ред. профиля
formSubmitAddPost.addEventListener("submit", savePopupAddPost); // Слушатель на "Сохранить" доб. фото