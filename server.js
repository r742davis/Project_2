//Baker's Dozen

// DEPENDENCIES //
//________________________________________//
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const db = mongoose.connection
const app = express()
// const bcrypt = require('bcrypt')

const Pastry = require('./models/pastries.js')

// PORT //
//________________________________________//
const PORT = process.env.PORT || 3000

// MONGO CONTROLLER //
//________________________________________//
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/' + 'bakersdozen'
mongoose.connect(MONGODB_URI, {useNewUrlParser:true})
db.on('open', () => {
  console.log('---Connected to Mongo---');
})

// MIDDLEWARE //
//________________________________________//
app.use(express.urlencoded({extended:true})) //Post
app.use(methodOverride('_method')) //Delete
app.use(express.static('public')) //CSS
app.use(express.json()) //JSON parser

// SESSION CONFIGURATION //
// app.use(session({
//   secret: process.env.SECRET,
//   resave: false,
//   saveUnitialized: false
// }))

// CONTROLLER //
//________________________________________//

// ROUTES //
//________________________________________//
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

//Heroku redirect
app.get('/', (req, res) => {
  Pastry.find({}, (error, allPastries) => {
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
//________________________________________//
app.listen(PORT, () => {
  console.log("Can you smell what's cooking? ---Port " + PORT +"---");
})
