let buttonEditProfile = document.querySelector('.profile__button-edit');

let popup = document.querySelector('.popup');


buttonEditProfile.addEventListener("click", openPopup);

buttonCloseEditProfile.addEventListener("click", closePopup);
function closePopup() {
    popup.classList.remove('.popup_opened');
} 