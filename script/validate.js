

// Скрываем ошибку
const hideInputError = (settings, formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

export function clearErrors(settings, popup) {
    const formElement = popup.querySelector(settings.formSelector);
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputList.forEach((inputElement) => {
        hideInputError(settings, formElement, inputElement);
    });
}

export function setFormButtonState(settings, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(settings, inputList, buttonElement); // чтобы сразу заблокировать кнопку при загрузке страницы
}

//Валидация
function enableValidation(settings) {
    const formList = (document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();//Прерываем
        });
        
        const validator = new ValidationSettings(settings, formElement); // Создадается экземпляр карточки из класса
        validator.enableValidation(); // Создаём карточку и возвращаем наружу
        
    });
}

export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__form-submit',
    inactiveButtonClass: 'popup__form-submit_disabled',
    inputErrorClass: 'popup__input_type-error',
    errorClass: 'popup__input_error-active'
};
// Прописываю события:
enableValidation(validationSettings);