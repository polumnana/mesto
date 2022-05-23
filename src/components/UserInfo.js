export default class UserInfo {
    constructor({ name, about, avatar }) {
        this._userName = name;
        this._infoAbout = about;
        this._avatar = avatar;
    }

    getUserInfo() {
        return { 
            name: this._userName.textContent, 
            about: this._infoAbout.textContent,
            id: this._id,
        };
    }

    setUserInfo({ name, about, avatar, _id, cohort }) {
        this._userName.textContent = name;
        this._infoAbout.textContent = about;
        this._avatar.src = avatar;
        this._id = _id;
        this._cohort = cohort;
    }
}