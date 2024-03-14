const UserModel = require('../models/users.models');
const mysql = require('../config/config.dev');
const executeQuery = require('../utils/sql.helper');
class UsersController {

    constructor(){
    }
    
    getAll(result){
        executeQuery('SELECT * FROM telacad_users', 
            (err, rows) =>{
                const users = Object.values(JSON.parse(JSON.stringify(rows)))
                result(err, users)
            });
    }

    get(id, result){
        executeQuery('SELECT * FROM telacad_users WHERE id = ? ;',
        (err, rows)=>{
            const user = Object.values(JSON.parse(JSON.stringify(rows[0])))
            result(err, user);
        }, [id]
        )
    }    

    add(user,result){
        executeQuery('INSERT INTO telacad_users(username, surname) VALUES (? , ?);',
        (err) =>{
            result(err);
        },[user.surname, user.username]
        );
    }
}

module.exports = UsersController;