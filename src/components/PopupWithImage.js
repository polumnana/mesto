import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popup = popup;
        this._previewImg = this._popup.querySelector('.popup__img'); // Крупное фото попап 
        this._previewText = this._popup.querySelector('.popup__text'); // Описание фото попап 
    }

    open(name, link) {
        this._previewImg.setAttribute('src', link); // Передали карточке SRC 
        this._previewImg.setAttribute('alt', name); // Передали карточке ALT 
        this._previewText.textContent = name;  // Передали карточке заголовок

        super.open();
    }
}