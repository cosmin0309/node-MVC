const UsersController = require('../controllers/users.controller');
const UserModel = require('../models/users.models');

class UsersRoute{
    constructor(){
        this.UsersController = new UsersController();
    }
    
    routes(app){
        app.get('/', (req, res) =>{
            const users = this.UsersController.getAll(( user) =>{
                res.send(user);
            });
            
        });

        app.get('/:id', (req,res) =>{
            const id = req.params.id;
            console.log(id);
            const user = this.UsersController.get(id,
                (user) =>{
                    res.send(user);
                });
            })
       
        app.post('/', (req, res) =>{
            const body = req.body;
            const user = new UserModel(body.username, body.surname, body.salary);
            this.UsersController.add(user, 
                (err) =>{
                    if(err)
                    {
                        res.status(404);
                        res.send(err);
                    }
                    else
                        res.send(`User ${user.username} a fost adaugat`);
                }
                );
        })
    }
}

module.exports = UsersRoute;