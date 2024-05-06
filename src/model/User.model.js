// User.model.js
export default class User {
    constructor(email, password, username, image, isAdmin) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.image = image;
        this.isAdmin = isAdmin;
    }
}
