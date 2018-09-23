const dotenv = require('dotenv');
dotenv.config();
const flash = require('connect-flash');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./knexfile')[process.env.DB_DEV];
var expressHbs = require('express-handlebars');
const pg = require('pg');
const knex = require('knex')(config);
const path = require('path');
var reservations = require('./routes/reservations');
var tables = require('./routes/tables');
var port = process.env.PORT || 3000;
var host = process.env.DB_HOST || 'unknown user';
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.engine('hbs', expressHbs({defaultLayout: 'layout', extname: 'hbs', layoutsDir:'views/layouts'}));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'hbs');
app.get('/', (req,res)=>{
  res.render('index')

})
app.use('/reservations', reservations);
app.use('/tables', tables)


app.use((req,res,next)=>{
  res.sendStatus(404);
})

app.listen(port, host, ()=>{
  console.log(host+' listening on port'+ port);
})
