const UsersController = require('../controllers/users.controller');
const UserModel = require('../models/users.models');

class UsersRoute{
    constructor(){
        this.UsersController = new UsersController();
    }
    routes(app){

        app.get('/test', (req, res)=> {
            res.send(this.UsersController.testConnection());
            
        })

        app.get('/', (req, res) =>{

            const users = this.UsersController.getAll();
            console.log(users)
            if(users)
                res.json(users);
            else
                res.send('No users added');
        });
        app.get('/:id', (req,res) =>{
            const id = parseInt(req.params.id);
            const user = this.UsersController.get(id,
                (user) =>{
                    console.log(user);
                    res.send(user);                    
                }, 
                (error) =>{
                res.status(404);
                res.send(error);
            }
                );
            // if(user){
            //     res.json(user);
            // }
            // else{
            //     res.status(404).send('User not found');
            // }
        })
       
        app.post('/', (req, res) =>{
            const body = req.body;
            const user = new UserModel(body.username, body.surname);
            this.UsersController.add(user, 
                (message) =>{
                    res.send(message);
                },
                (error) =>{
                    res.status(404);
                    res.send('eroare');
                }
                );
        })
    }
}

module.exports = UsersRoute;