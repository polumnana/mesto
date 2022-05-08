const popupList = document.querySelectorAll('.popup');

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

