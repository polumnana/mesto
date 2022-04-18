import { openPopup } from "./utils.js";

const previewImg = document.querySelector('.popup__img'); // Крупное фото попап 
const previewText = document.querySelector('.popup__text'); // Описание фото попап 
const popupPreview = document.querySelector('.popup_preview');

export default class Card {
    constructor(data, selector) {
        this._title = data.name;
        this._image = data.link;
        this._selector = selector;
    }

    _getElement() {
        const photosTemplate = document.querySelector(this._selector).content; // Нашла в документе блок-шаблон
        const cardElement = photosTemplate.querySelector('.element').cloneNode(true);
        return cardElement;
    } // Сделали копию шаблона

    generateCard() {
        this._element = this._getElement();

        this._element.querySelector('.element__title').textContent = this._title;
        this._element.querySelector('.element__img').src = this._image;

        this._setEventListeners();

        return this._element;
    } // Наполнили шаблон и вернули карточку с описанием и фото

    _setEventListeners() {
        const buttonLike = this._element.querySelector('.element__button');
        buttonLike.addEventListener('click', () => {
            buttonLike.classList.toggle('element__button_active');
            console.log('Лайков много не бывает! ❤️');
        }); // Переключаем лайк
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this._element.remove();
        }); // Удаляем карточку-пост
        this._element.querySelector('.element__img').addEventListener("click", evt => {
            this._openPopupPreview(this._title, this._image);
        }); // Открываем просмотр
    }

    _openPopupPreview(name, link) {
        previewImg.setAttribute('src', link); // Передали карточке SRC 
        previewImg.setAttribute('alt', name); // Передали карточке ALT 
        previewText.textContent = name;  // Передали карточке заголовок
        openPopup(popupPreview); // Открыть попап 
        console.log('Покажи поближе 👀');
    }
}

