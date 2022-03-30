<!doctype html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Оставьте контактные данные</title>
  <link rel="stylesheet" href="https://code.s3.yandex.net/web-code/normalize.css">
  <link rel="stylesheet" href="https://code.s3.yandex.net/web-code/form-validation/lesson-6/index.css">
</head>

<body class="page">
<div class="page__content">
  <main class="page__section content">
    <h1 class="content__title">
      Форма обратной связи
    </h1>
    <p class="content__subtitle">
      Введите необходимые данные
    </p>
    <form class="form" novalidate>
      <fieldset class="form__set">
        <label class="form__field">
          <input type="email" class="form__input" id="email-input" required minlength="7">
          <span class="form__placeholder email-input-placeholder">
            E-mail:
          </span>
          <span class="form__input-error email-input-error"></span>
        </label>
        <label class="form__field">
          <input type="password" class="form__input" id="password-input" required minlength="7">
          <span class="form__placeholder password-input-placeholder">
            Пароль:
          </span>
          <span class="form__input-error password-input-error"></span>
        </label>
        <label class="form__field form__field_type_row">
          <input class="form__checkbox form__input" id="checkbox-input" type="checkbox" checked required>
          <span class="form__checkbox-item"></span>
          <span class="form__text">Согласие на обработку персональных данных</span>
          <span class="form__input-error checkbox-input-error"></span>
          <span class="form__placeholder checkbox-input-placeholder"></span>
        </label>
        <button type="button" class="form__submit form__button button">
          Далее
        </button>
      </fieldset>
      <fieldset class="form__set">
        <button class="text-button form__previous">&larr; Назад</button>
        <label class="form__field">
          <input type="text" class="form__input" id="name-input" required minlength="2">
          <span class="form__placeholder name-input-placeholder">
            Как вас зовут?
          </span>
          <span class="form__input-error name-input-error"></span>
        </label>
        <label class="form__field">
          <input type="text" class="form__input" id="happiness-input" required minlength="4">
          <span class="form__placeholder happiness-input-placeholder">
            Как ваше настроение?
          </span>
          <span class="form__input-error happiness-input-error"></span>
        </label>
        <label class="form__field">
          <input type="text" class="form__input" id="javascript-rating-input" required minlength="5">
          <span class="form__placeholder javascript-rating-input-placeholder">
            Настолько ли сложен JavaScript?
          </span>
          <span class="form__input-error javascript-rating-input-error"></span>
        </label>
        <label class="form__field">
          <input type="text" class="form__input" id="suggestion-input" required minlength="5">
          <span class="form__placeholder suggestion-input-placeholder">
            Поленились ли мы сделать еще один Fieldset?
          </span>
          <span class="form__input-error suggestion-input-error"></span>
        </label>
        <button type="button" class="form__submit form__button button">
          Далее
        </button>
      </fieldset>
      <fieldset class="form__set">
        <button class="text-button form__previous">&larr; Назад</button>
        <p class="form__paragraph">
          Успешно!
        </p>
        <button type="submit" class="form__submit button">
          На этом всё
        </button>
      </fieldset>
    </form>
  </main>
</div>
<script src="https://code.s3.yandex.net/web-code/form-validation/lesson-6/index.js"></script>
<script src="script.js"></script>
</body>
</html>



const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');
  
  toggleButtonState(inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
  
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  let fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));
  fieldsetList.forEach(function(fieldSet){
    setEventListeners(fieldSet);
  });
  
 
  });
};



function hasInvalidInput(inputList){
  return inputList.some(function(inputElement){
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement){
  if (hasInvalidInput(inputList)){
     buttonElement.classList.add('button_inactive');
     }else{
       buttonElement.classList.remove('button_inactive');
     }
}

enableValidation();
