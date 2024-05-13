// User.model.js
export default class User {
    constructor(email, password, username, avatarUrl, isAdmin, confirmPassword) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.username = username;
        this.avatarUrl = avatarUrl;
        this.isAdmin = isAdmin;
    }
}
