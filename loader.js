const app = require('./server.js');
const router = require('./Routes/main.route.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
//const models = require("./models/"); 

//app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
    secret: 'Vendas',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      maxAge: 60000,
      httpOnly: true,
    }
  }));

   app.use(function(req, res, next) {
    // check if session exists
    if (global.sessData === undefined) {
      global.sessData = req.session;
      global.sessData.ID = req.sessionID;
    }
    else { // yes, cookie was already present
      console.log('session exists', global.sessData.ID);
    }
    next();
  }); 
  

  require('./Routes/main.route.js');




  /*const router = require('express').Router();
  app.use(require('./Routes/main.route.js'));*/





  //Sync Database
  /*models.sequelize.sync().then(function() {
    console.log('BOA! Base de dados OK');
  
  }).catch(function(err) {
    console.log(err, "Algo de errado nao esta certo com a Base de Dados");
  });*/

//importar as rotas
app.use('/', router);
module.exports = app;