const UsersController = require('../controllers/users.controller');
const UserModel = require('../models/users.models');

class UsersRoute{
    constructor(){
        this.UsersController = new UsersController();
    }
    routes(app){
        app.get('/', (req, res) =>{
            const users = this.UsersController.getAll(
                (err, users) =>{
                    if(err)
                        {
                            res.status(404);
                            res.send(err);
                        }
                        else
                            res.send(users);
                }
            );
        });

        app.get('/:id', (req,res) =>{
            const id = parseInt(req.params.id);
            const user = this.UsersController.get(id,
                (err, user) =>{
                    if(err)
                    {
                        res.status(404);
                        res.send(err);
                    }
                    else
                        res.send(user);
                });
            })
       
        app.post('/', (req, res) =>{
            const body = req.body;
            const user = new UserModel(body.username, body.surname);
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