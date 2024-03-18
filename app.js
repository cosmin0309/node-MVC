const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const UsersRoute = require('./routes/users.route');
const admin = require("firebase-admin");
const serviceAccount = require("./config/config.json");

//firebaseApp
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

//express config

const app = express();
app.use(bodyParser.json({limit:'25mb'}));
app.use(bodyParser.urlencoded({extended: false}));

// init static
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

//init routes
new UsersRoute().routes(app);

//init server
const PORT = 5001;
app.listen(PORT, ()=> console.log('Server is running'));