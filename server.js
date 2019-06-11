require('dotenv').config()


// load the extensions we need
const express = require('express')
const path = require('path')
const mongo = require('mongodb').MongoClient
const mongoose = require('mongoose')
const assert = require('assert')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const session = require('express-session');
const passport = require('passport');
const api = express.Router();
const app = express()
console.log('starting')

let db = null
const url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT

//creating url for mongodb
mongo.connect(url, function(err, client) {
    console.log('connected successfully')
    db = client.db(process.env.DB_NAME)
    db.collection('users').find().toArray(done)
    function done (err, data) {
        if (err) {
            next(err)
        } else {
            console.log(data)
        }
    }
})

// mongo.connect = ( url , (err, client) =>{
//     console.log('connected successfully')
//     db = client.db(process.env.DB_NAME)
    // db.collection('users').find().toArray(done)
    // function done (err, data) {
    //     if (err) {
    //         next(err)
    //     } else {
    //         console.log(data)
    //     }
    // }
// } 
// )

//check for db errors
// db.on('error',console.error.bind(console, 'connection error'))

//check connection
// db.once('open', () =>{
//     console.log('connected to MongoBD')
// })
//sets view engine to ejs
app.set('view engine', 'ejs')

//set up static files
app.use(express.static('public'))

//adding routes
app.get('/', (req, res) => res.render('index'))
app.get('/login', (req, res) => res.render('login'))
app.get('/signup', (req, res) => res.render('signup'))
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator())


const users = require('./routes/users')
app.use('/users', users)

//validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

app.listen(3000)
console.log('3000 is the magic port')

//sources:

// 'Use EJS to Template Your Node Application' scotch.io
// https://scotch.io/tutorials/use-ejs-to-template-your-node-application

//'Node.js + Express - Tutorial - Insert and Get Data with MongoDB' Academind 
//https://www.youtube.com/watch?v=ZKwrOXl5TDI

//'Node.js & Express From Scratch [Part 9] - User Registration' traversy media
//https://youtu.be/CrAU8xTHy4M

