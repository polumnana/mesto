import Popup from './Popup.js';

export default class PopupDelete extends Popup {
    constructor(popup, handleSubmit) {
        super(popup);
        this._handleSubmit = handleSubmit;
        this._form = popup.querySelector('.popup__form');
    }

    setCard(card) {
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();//Прерываем
            this._handleSubmit(this._card);
        });
    }//обработчик событий формы
}