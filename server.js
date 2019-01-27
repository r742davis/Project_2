//Baker's Dozen

// DEPENDENCIES //
//----------------------------------------//
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')

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

//Edit

//Update

//Seed

//Index
app.get('/bakersdozen', (req, res) => {
  res.render(
    'index.ejs',
    {
    }
)
})

//New
app.get('/bakersdozen/new', (req, res) => {
  res.render(
    'new.ejs'
  )
})

//Show
app.get('/bakersdozen/:id', (req, res) => {
  res.render(
    'show.ejs'
  )
})

//Create


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
