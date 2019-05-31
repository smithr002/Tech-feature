// load the extensions we need
const express = require('express')
const path = require('path');
const mongo = require('mongodb').MongoClient
const mongoose = require('mongoose')
const assert = require('assert')
const bodyParser = require('body-parser')

const app = express()

//creating url for mongodb
mongoose.connect = ('mongodb://localhost:/nodekb')
let db = mongoose.connection

//check connection
db.once('open', () =>{
    console.log('connected to MongoBD')
})

//check for db errors
db.on('error', (err) => {
    console.log(err)
})

//sets view engine to ejs
app.set('view engine', 'ejs')

//set up static files
app.use(express.static('public'))

//adding routes
app.get('/', (req, res) => res.render('index'))
app.get('/login', (req, res) => res.render('login'))
app.get('/signup', (req, res) => res.render('signup'))

const users = require('./routes/users')
app.use('/users', users)

// app.get('/get-data', (req, res) => {
// const resultArray = []
// mongo.connect(url, (err, db) => {
//     assert.equal(null, err)
//     const getting = db.collection('usersbb').find()
//     getting.foreach((doc,err) => {
//         assert.equal(null, err)
//         resultArray.push(doc)
//     }, () => {
//         db.close()
//         res.render('index', {user: resultArray})
//     })
// })
// })

// app.post('/insert', (req, res) => {
//     console.log(req)
// const user = {
//     name: req.body.name,
//     email: req.body.email,
//     birthdate: req.body.birthdate
// }

// mongo.connect(url, (err, db) => {
//     assert.equal(null, err)
//     db.collection('usersbb').insertOne(user, (err, result) => {
//         assert.equal(null, err)
//         console.log('item inserted')
//         db.close()
//     })
// })

// res.redirect('/')
// })

// app.post('/update', (req, res) => {
    
// })

// app.post('/delete', (req, res) => {
    
// })
// //adding variables
// app.get('/', (req, res) => {

//     const tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

//     res.render('pages/index', {
//         drinks: drinks,
//         tagline: tagline
//     });
// });

app.listen(3000)
console.log('3000 is the magic port')

//sources:

// 'Use EJS to Template Your Node Application' scotch.io
// https://scotch.io/tutorials/use-ejs-to-template-your-node-application

//'Node.js + Express - Tutorial - Insert and Get Data with MongoDB' Academind 
//https://www.youtube.com/watch?v=ZKwrOXl5TDI

