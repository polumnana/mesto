export default class Popup {
    constructor(popup) {
        this._popup = popup;
    }
    
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        console.log('Покажи поближе 👀');
    }
    
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    
    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            console.log('кликнули на попап');
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