const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')


// Bring in user model
let user = require('../models/user')

// form registration
router.get('/registration', (req, res) => {
  res.render('registration')
})

router.get('/login', (req, res) => {
  res.render('login')
})

// registration proccess
router.post('/registration', (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const username = req.body.username
  const password = req.body.password
  const password2 = req.body.password2

  req.checkBody('name', 'Name is required').notEmpty()
  req.checkBody('email', 'Email is required').notEmpty()
  req.checkBody('email', 'Email is not valid').isEmail()
  req.checkBody('username', 'Username is required').notEmpty()
  req.checkBody('password', 'Password is required').notEmpty()
  req.checkBody('password2', 'passwords do not match').equals(req.body.passwords)

  let errors = req.validationErrors()

  if(errors){
    res.render('registration', {
      errors:errors
    })
  } else {
    let newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password
    })

    bcrypt.genSalt(10,(err, salt) =>{
      bcrypt.hash(newUser.password, salt, (err, hash) =>{
        if(error){
          console.log(err)
        }
        newUser.password = hash;
        newUser.save((err) => {
          if(error){
            console.log(err)
            return
          } else {
            req.flash('succes','You are now registered and can log in')
            res.redirect('/user/login')
          }
        })
      })
    })
  }
})

module.exports = router;