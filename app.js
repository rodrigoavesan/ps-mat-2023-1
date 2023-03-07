//Carrega as variaveis de ambiente do arquivo .env para a aplicação
require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Conexão ao BD ---------------------------------------------------------------------
const db = require('./models')

try {
  db.sequelize.authenticate()
  console.log('SEQUELIZE: connection has been established successfully')
}
catch(error){
  console.log('* SEQUELIZE: unable to connect to the database', error)
  process.exit(1) //Encerra o servidor com erro  
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**********************************Rotas******************************** */
const users = require('./routes/users')
app.use('/users', users)


const channels = require('./routes/channels')
app.use('/channels', channels)

const paymenteMethods = require('./routes/paymente_methods')
app.use('/paymente_methods', paymenteMethods)

module.exports = app;
