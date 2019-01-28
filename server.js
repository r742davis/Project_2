//Baker's Dozen

// DEPENDENCIES //
//----------------------------------------//
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')

const Pastry = require('./models/pastries.js')

// MIDDLEWARE //
//----------------------------------------//
app.use(express.urlencoded({extended:true})) //Post
app.use(methodOverride('_method')) //Delete
app.use(express.static('public')) //CSS

// SESSION CONFIGURATION //
// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUnitialized: false
// }))

// CONTROLLER //
//----------------------------------------//

// ROUTES //
//----------------------------------------//
//Delete
app.delete('/bakersdozen/:id', (req, res) => {
  Pastry.findByIdAndRemove(req.params.id, (error, data) => {
    res.redirect('/bakersdozen')
  })
})

//Edit
app.get('/bakersdozen/:id/edit', (req, res) => {
  Pastry.findById(req.params.id, (error, foundPastry) => {
    res.render(
      'edit.ejs',
      {
        pastry:foundPastry
      }
    )
  })
})

//Update
app.put('/bakersdozen/:id', (req, res) => {
  Pastry.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedPastry) => {
    res.redirect('/bakersdozen')
  })
})

//Seed
app.get('/bakersdozen/seedTest', (req, res) => {
  Pastry.create([
    {
      name: 'Cinnamon Roll',
      type: 'roll',
      img: "https://www.onceuponachef.com/images/2012/04/cinnamon-rolls-finished.jpg",
      recipe: "",
      price: 2.50,
      qty: 2
    }
  ], (error, data) => {
    res.redirect('/bakersdozen')
  })
})


//Index
app.get('/bakersdozen', (req, res) => {
  Pastry.find({}, (error, allPastries) => {
    res.render(
      'index.ejs',
      {
        pastries:allPastries
      }
  )
  })
})

//New
app.get('/bakersdozen/new', (req, res) => {
  res.render('new.ejs')
  res.redirect('/bakersdozen')
})

//Show
app.get('/bakersdozen/:id', (req, res) => {
  Pastry.findById(req.params.id, (error, foundPastry) => {
    res.render(
      'show.ejs',
      {
        pastry:foundPastry
      }
    )
  })
})

//Create
app.post('/bakersdozen/', (req, res) => {
  Pastry.create(req.body, (error, createdPastry) => {
    res.redirect('/bakersdozen')
  })
})

// APP LISTENER //
//----------------------------------------//
app.listen(3000, () => {
  console.log("Can you smell what's cooking?");
})

// MONGO CONTROLLER //
//----------------------------------------//
mongoose.connect('mongodb://localhost:27017/bakersdozen', {useNewUrlParser:true})
mongoose.connection.once('open', () => {
  console.log('---Connected to Mongo---');
})
