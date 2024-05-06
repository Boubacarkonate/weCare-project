// User.model.js
export default class User {
    constructor(email, password, username, image, isAdmin, confirmPassword) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.username = username;
        this.image = image;
        this.isAdmin = isAdmin;
    }
}
