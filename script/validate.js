
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

function clearErrors(popup) {
    const formElement = popup.querySelector('.popup__form');
    const inputList = Array.from(popup.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });
}

function setFormButtonState(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__form-submit');

    toggleButtonState(inputList, buttonElement); // чтобы сразу заблокировать кнопку при загрузке страницы
}

//Вешаем на инпут слушатели: один смотрит валидность, другой переключаем состояние кнопки
const setEventListeners = (settings, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__form-submit');


    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};
//Валидация
function enableValidation(settings) {
    const formList = Array.from(settings.formSelector);
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();//Прерываем
        });
        setEventListeners(settings, formElement);//Смотрим валидность, продолжаем
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
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});