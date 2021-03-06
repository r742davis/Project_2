const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js');

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {
    currentUser: req.session.currentUser
  })
})

sessions.post('/', (req, res)=>{
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(req.body.password == foundUser.password){
          req.session.currentUser = foundUser
            res.redirect('/bakersdozen')
        } else {
          res.send('/users/new')
        }
    });
});

sessions.delete('/', (req, res)=>{
    req.session.destroy(() => {
        res.redirect('/bakersdozen')
    })
})

module.exports = sessions
