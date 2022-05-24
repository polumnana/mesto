export default class Card {
    constructor({ data, isMyCard, selector, handleCardClick, handleDeleteIconClick, handleLikePost, handleUnlikePost }) {
        this._title = data.name;
        this._image = data.link;
        this._id = data._id;
        this._likes = data.likes;
        this._isMyCard = isMyCard;
        this._selector = selector;
        this._handleOpenPopup = handleCardClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._handleLikePost = handleLikePost;
        this._handleUnlikePost = handleUnlikePost;
    }

    _getElement() {
        const photosTemplate = document.querySelector(this._selector).content; // Нашла в документе блок-шаблон
        const cardElement = photosTemplate.querySelector('.element').cloneNode(true);
        return cardElement;
    } // Сделали копию шаблона

    getId() {
        return this._id;
    }

    setData(data) {
        this._title = data.name;
        this._image = data.link;
        this._id = data._id;
        this._likes = data.likes;

        this._element.querySelector('.element__counter-like').textContent = this._likes.length;
    }

    generateCard() {
        this._element = this._getElement();

        this._element.querySelector('.element__title').textContent = this._title;
        this._element.querySelector('.element__counter-like').textContent = this._likes.length;

        const elementImg = this._element.querySelector('.element__img');
        elementImg.src = this._image;
        elementImg.alt = this._title;

        this._setEventListeners();

        if (!this._isMyCard)
            this._element.querySelector('.element__delete').remove();

        return this._element;
    } // Наполнили шаблон и вернули карточку с описанием и фото

    deletePost() {
        this._element.remove();
    }

    setIsLiked(isLiked) {
        console.log('like', isLiked);

        const buttonLike = this._element.querySelector('.element__button-like');
        this._isLiked = isLiked;

        if (this._isLiked) {
            buttonLike.classList.add('element__button-like_active');
        } else {
            buttonLike.classList.remove('element__button-like_active');
        }
    }

    _setEventListeners() {
        const buttonLike = this._element.querySelector('.element__button-like');
        buttonLike.addEventListener('click', () => {
            if (this._isLiked)
                this._handleUnlikePost(this._id);
            else
                this._handleLikePost(this._id);
        }); // Переключаем лайк

        if (this._isMyCard)
            this._element.querySelector('.element__delete').addEventListener('click', () => {
                this._handleDeleteIconClick(this);
            }); // Повесить обработчик на удаление
        this._element.querySelector('.element__img').addEventListener("click", evt => {
            this._handleOpenPopup(this._title, this._image);
        }); // Открываем просмотр
    }
}
