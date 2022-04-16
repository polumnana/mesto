class Card {
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

        this._element.querySelector('.element__title').textContent = this._text;
        this._element.querySelector('.element__img').src = this._image;

        _setEventListeners();

        return this._element;
    } // Наполнили шаблон и вернули карточку с описанием и фото

    _setEventListeners(){
        this._element.querySelector('.element__button').addEventListener('click', () => {
            this.classList.add('element__button_active');
        }); // Переключаем лайк
        this._element.querySelector('.element__delete').addEventListener('click', () => {
            this.remove();
        }); // Удаляем карточку-пост
        this._element.querySelector('.element__img').addEventListener("click", evt => {
            openPopupPreview(this._text, this._image);
        }); // Открываем просмотр
    }
}