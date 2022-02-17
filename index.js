// Объявляю переменные
let popup = document.querySelector('.popup'); // попап
let buttonCloseEditProfile = document.querySelector('.popup__close-form'); // Закрыть попап
let buttonEditProfile = document.querySelector('.profile__button-edit'); // Редактировать профиль
// let addNewPost = document.querySelector('.profile__button-add'); // Добавить пост (пока что не делаем)
let formElement = document.querySelector('.popup__form-input'); // Данные в edit profile

// Прописываю функцию, закрывающую попап при чтении страницы
function closePopup() {
    popup.classList.remove('popup_opened');
}

// Вызываю функцию, закрывающую попап при чтении страницы
closePopup();

// Прописываю функцию, открывающую попап кликом
function openPopup() {
    popup.classList.add('popup_opened');
}

// Прописываю функцию, открывающую добавить пост (пока что не делаем)


//Вызываю функцию, открывающую попап кликом
buttonEditProfile.addEventListener("click", openPopup);




formElement.addEventListener('submit', function () {
    console.log('Форма отправлена');
});

// Удаляю попап, если нажимаю на крестик
buttonCloseEditProfile.addEventListener("click", closePopup);

