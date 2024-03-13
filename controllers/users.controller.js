const UserModel = require('../models/users.models');
const mysql = require('../config/config.dev');

class UsersController {

    constructor(){
        this.users = [
            new UserModel(1, 'Epure', 'Cosmin')
        ];
        console.log('IN CONSTRUCTOR', this.users);
    }

    testConnection(){
        mysql.connect();
        mysql.query('SELECT * FROM telacad_users;', (err, rows, fields) => {
            if (err) throw err
            console.log('rows:',rows);
            return rows;
          })
          

          mysql.end()   
        }

    
    getAll(){
        mysql.connect();
        mysql.query('SELECT * FROM telacad_users;', (err, rows, fields) => {
            if (err) throw err
            console.log('rows:',rows);
            return rows;
          })
          

          mysql.end()   
        }

    //     return this.users;
    // }

    get(id){
        let user;
        mysql.connect();
        mysql.query(`SELECT * FROM telacad_users WHERE id = ${id} ;`, (err, rows, fields) => {
            if (err) throw err
            console.log('rows:',rows[0]);
            user = Object.values(JSON.parse(JSON.stringify(rows[0])));
            console.log(user);
          })
        
          mysql.end()  

          return user; 
        }    

    add(user){
        this.users.push(user);
    }
}

module.exports = UsersController;