const UserModel = require('../models/users.models');
const mysql = require('../config/config.dev');

class UsersController {

    constructor(){
    }
    
    getAll(response, error){
        mysql.connect();
        mysql.query('SELECT * FROM telacad_users;', (err, rows, fields) => {
            if (err) {
                console.log('eroare');
                error(err);
            };
            let users = Object.values(JSON.parse(JSON.stringify(rows)));
            response(users);
          })
          

          mysql.end()   
        }

    get(id, response, error){
        let user;
        mysql.connect();
        mysql.query(`SELECT * FROM telacad_users WHERE id = ${id} ;`, (err, rows, fields) => {
            if (err) {
                console.log('eroare');
                error(err);
            };
            console.log('rows:',rows[0]);
            user = Object.values(JSON.parse(JSON.stringify(rows[0])));
            response(user);
          })
        
          mysql.end()  

          //return user; 
        }    

    add(user,response, error){
        mysql.connect();
        console.log(user.surname, user.username);
        mysql.query(`INSERT INTO telacad_users(username, surname) VALUES("${user.username}" , "${user.surname}") ;`, (err, rows, fields) => {
            if (err) {
                console.log('eroare');
                error(err);
            };
            response(`utilizator ${user.surname} adaugat`);
          })
        
          mysql.end()     
        }
}

module.exports = UsersController;