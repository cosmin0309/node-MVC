const UserModel = require('../models/users.models');
class UsersController {
    constructor(){
        this.users = [
            new UserModel(1, 'Epure', 'Cosmin')
        ];
        console.log('IN CONSTRUCTOR', this.users);
    }

    getAll(){
        return this.users;
    }

    get(id){
        return this.users.find(user => id == user.id);
    }

    add(user){
        this.users.push(user);
    }
}

module.exports = UsersController;