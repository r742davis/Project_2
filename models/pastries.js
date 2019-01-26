const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
  username: String,
  password: String
})

const Pastry = mongoose.model('Pastry', userSchema)

module.exports = Pastry
