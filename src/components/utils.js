const popupList = document.querySelectorAll('.popup');

function closeEscape(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        if (popup)
            closePopup(popup);
    }
}

// Открывающую попап
export function openPopup(element) {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscape);
}

// Закрывающую попап 
export function closePopup(element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscape);
}

// Закрывающую попап на оверлей
popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
});