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
            const user = this.UsersController.get(id);
            if(user){
                res.json(user);
            }
            else{
                res.status(404).send('User not found');
            }
        })
       
        app.post('/', (req, res) =>{
            const body = req.body;
            const user = new UserModel(body.id, body.name, body.surname);
            this.UsersController.add(user);
            res.send(`User ${body.id} added`);
        })
    }
}

module.exports = UsersRoute;