import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, handleFormSubmit) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValue = {};
        this._inputList.forEach((item) => {
            this._formValue[item.name] = item.value;
        });

        return this._formValue;
    } // собирает данные всех полей формы

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();//Прерываем
            this._handleFormSubmit(this._getInputValues());
        });
    }//обработчик событий формы

    close() {
        super.close();
        this._form.reset();
    }//при закрытии попапа форма должна ещё и сбрасываться
}