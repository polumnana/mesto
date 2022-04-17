export class ValidationSettings {
    constructor(validationSettings, form) {

        this._formSelector = validationSettings.formSelector;
        this._inputSelector = validationSettings.inputSelector;
        this._submitButtonSelector = validationSettings.submitButtonSelector;
        this._inactiveButtonClass = validationSettings.inactiveButtonClass;
        this._inputErrorClass = validationSettings.inputErrorClass;
        this._errorClass = validationSettings.errorClass;

        this._form = form;
    }

    enableValidation() {
        this._form.addEventListener('submit', function (evt) {
            evt.preventDefault();//Прерываем
        });
        this._setEventListeners();
    }

    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        const buttonElement = this._form.querySelector(this._submitButtonSelector);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    } // Показываем ошибку

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    } // Скрываем ошибку

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);// Проверяем форму и инпуты

        } else {
            this._hideInputError(inputElement);
        }
    } //Показываем или скрываем ошибку

    _clearErrors() {

        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        inputList.forEach((inputElement) => {
            hideInputError(inputElement);
        });
    } // Скрываем ошибку, когда открываем попап

    _setFormButtonState() {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        const buttonElement = this._form.querySelector(this._submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement); // чтобы сразу заблокировать кнопку при загрузке страницы
    }

    //Вешаем на инпут слушатели: один смотрит валидность, другой переключаем состояние кнопки
    _setEventListeners = () => {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        const buttonElement = this._form.querySelector(this._submitButtonSelector);


        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };



    //Валидация
    _enableValidation() {
        const formList = (document.querySelectorAll(this._formSelector));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();//Прерываем
            });
            setEventListeners(formElement);//Смотрим валидность, продолжаем
        });
    }

    // Функция принимает массив инпутов и смотрит их валидность
    _hasInvalidInput(inputList) {
        return inputList.some(function (inputElement) { // проходим по этому массиву методом some
            return !inputElement.validity.valid; // Если поле не валидно, 
            //  колбэк вернёт true (Обход массива прекратится и вся фунцкция вернёт true)
        })
    }

    // Функция на основании валидности инпутов меняет состояние кнопки
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

}



