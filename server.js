//Baker's Dozen

// DEPENDENCIES //
//----------------------------------------//
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const Pastry = require('./models/pastries.js')

// MIDDLEWARE //
//----------------------------------------//
app.use(express.urlencoded({extended:true})) //Post
app.use(methodOverride('_method')) //Delete
app.use(express.static('public')) //CSS

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

//Update

//Seed
app.get('/bakersdozen/seedTest', (req, res) => {
  Pastry.create([
    {
      name: 'Cinnamon Roll',
      type: 'roll',
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
  res.render(
    'new.ejs'
  )
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
    res.send(createdPastry)
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
