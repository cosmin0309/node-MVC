const UserModel = require('../models/users.models');
const mysql = require('../config/config.dev');
const executeQuery = require('../utils/sql.helper');
const fs = require('fs');
const admin = require("firebase-admin");
class UsersController {
    

    constructor(){
        this.db = admin.firestore();
    }

    async getAll(result){
        const ref = await this.db.collection("telacad_users").get();
        let users = [];
        ref.docs.map(doc => {users.push(new UserModel(doc.data().username, doc.data().surname))});
        result(users);
    }

    async get(id, result){
        const ref = await this.db.collection("telacad_users").doc(id).get();
        const user = new UserModel(ref.data().username, ref.data().surname, ref.data().salary);
        user.doubleSalary();
        result(user);
    }    

    async add(user,result){
      const jsonString = JSON.stringify(user);
      await this.db.collection("telacad_users").add(JSON.parse(jsonString));
      result("user added");
    }
}

module.exports = UsersController;