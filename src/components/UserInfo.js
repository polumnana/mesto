export default class UserInfo {
    constructor({ userName, infoAbout, avatar }) {
        this._userName = userName;
        this._infoAbout = infoAbout;
        this._avatar = avatar;
        
    }

    getUserInfo() {
        return { userName:this._userName.textContent, infoAbout:this._infoAbout.textContent};
    }

    setUserInfo( { userName, infoAbout, avatar, _id, cohort } ) {
        this._userName.textContent = userName;
        this._infoAbout.textContent = infoAbout;
        if (avatar)
            this._avatar.src = avatar;
        if (_id)   
            this._id = _id;
        if (cohort) 
            this._cohort = cohort;
    }
}