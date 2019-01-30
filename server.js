//Baker's Dozen

//------------//
//Dependencies//
//------------//
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')
require('dotenv').config()
const db = mongoose.connection
const app = express()

// PORT //
//________________________________________//
const PORT = process.env.PORT || 3000

//----------//
//Middleware//
//----------//
app.use(express.urlencoded({extended:true})) //Post
app.use(methodOverride('_method')) //Delete
app.use(express.static('public')) //CSS
app.use(express.json()) //JSON parser
app.use(session({
	  secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
	  resave: false,
	  saveUninitialized: false
}));


//----------//
//Controller//
//----------//
const pastriesController = require('./controllers/pastries_controller.js')
app.use('/bakersdozen', pastriesController)


//------------//
//App Listener//
//------------//
app.listen(PORT, () => {
  console.log("Can you smell what's cooking? ---Port " + PORT +"---");
})

//----------------//
//Mongo Controller//
//----------------//
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/' + 'bakersdozen'
mongoose.connect(MONGODB_URI, {useNewUrlParser:true})
db.on('open', () => {
  console.log('---Connected to Mongo---');
})
