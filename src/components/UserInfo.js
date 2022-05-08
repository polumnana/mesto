export default class UserInfo {
    constructor({ userName, infoAbout }) {
        this._userName = userName;
        this._infoAbout = infoAbout;
    }

    getUserInfo() {
        return { userName:this._userName.textContent, infoAbout:this._infoAbout.textContent};
    }

    setUserInfo( { userName, infoAbout } ) {
        this._userName.textContent = userName;
        this._infoAbout.textContent = infoAbout;
    }
}