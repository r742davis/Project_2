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

// APP LISTENER //
//----------------------------------------//
app.listen(3000, () => {
  console.log("Can you smell what's cooking?");
})

// MONGO CONTROLLER //
//----------------------------------------//
mongoose.connect('mongodb://localhost:27017/products', {useNewUrlParser:true})
mongoose.connection.once('open', () => {
  console.log('---Connected to Mongo---');
})
