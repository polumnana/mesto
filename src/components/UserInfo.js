export default class UserInfo {
    constructor({ userName, infoAbout, avatar }) {
        this._userName = userName;
        this._infoAbout = infoAbout;
        this._avatar = avatar;

    }

    getUserInfo() {
        return { userName: this._userName.textContent, infoAbout: this._infoAbout.textContent };
    }

    setUserInfo({ userName, infoAbout }) {

        fetch('https://mesto.nomoreparties.co/v1/cohort-41/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '313ac141-ac1d-4bd4-8cbd-191f2a15741d',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userName,
                about: infoAbout
            })
        })
            .then((res) => {
                this._userName.textContent = userName;
                this._infoAbout.textContent = infoAbout;
            });
    }

    setUserInfoOnLoad({ userName, infoAbout, avatar, _id, cohort }) {
        this._userName.textContent = userName;
        this._infoAbout.textContent = infoAbout;
        this._avatar.src = avatar;
        this._id = _id;
        this._cohort = cohort;
    }
}