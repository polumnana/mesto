
// Показываем ошибку
const showInputError = (settings, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};
// Скрываем ошибку
const hideInputError = (settings, formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};
//Показываем или скрываем ошибку
const checkInputValidity = (settings, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(settings, formElement, inputElement, inputElement.validationMessage);// Проверяем форму и инпуты

    } else {
        hideInputError(settings, formElement, inputElement);
    }
};

function clearErrors(settings, popup) {
    const formElement = popup.querySelector(settings.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError(settings, formElement, inputElement);
    });
}

function setFormButtonState(settings, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(settings, inputList, buttonElement); // чтобы сразу заблокировать кнопку при загрузке страницы
}

//Вешаем на инпут слушатели: один смотрит валидность, другой переключаем состояние кнопки
const setEventListeners = (settings, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);


    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(settings, formElement, inputElement);
            toggleButtonState(settings, inputList, buttonElement);
        });
    });
};
//Валидация
function enableValidation(settings) {
    const formList = (document.querySelectorAll(settings.formSelector));
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
function toggleButtonState(settings, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
}

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-submit',
    inactiveButtonClass: 'popup__form-submit_disabled',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__input_error-active'
};
// Прописываю события:
enableValidation(validationSettings);