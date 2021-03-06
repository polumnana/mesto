export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._closeButton = this._popup.querySelector('.popup__close-form');
        this._handleEscCloseWithBind = this._handleEscClose.bind(this);
    }
    
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscCloseWithBind);
    }
    
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscCloseWithBind);
    }
    
    setEventListeners() {
        this._closeButton.addEventListener('click', (evt) => {
            this.close();
        });
        this._popup.addEventListener('click', (evt) => { 
            if (evt.target.classList.contains('popup')) {
                this.close();
            }
        });  
    } //добавляет слушатель клика иконке закрытия попапа
    
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    } //содержит логику закрытия попапа клавишей Esc
}