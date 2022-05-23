export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    fetchCards() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    fetchUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        }).then(res => {
            if (res.ok) {
                return res.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    updateUserInfo({ name, about }) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    updateUserAvatar(userAvatar) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: userAvatar,
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteCard(cardId) {
        return fetch(this._baseUrl + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(res => {
            if (res.ok) {
                return res.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    createCard({ name, link }) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
            }

            // если ошибка, отклоняем промис
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}