const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pastrySchema = new mongoose.Schema({
    name:  {
      type: String,
      required: true },
    recipe:  {
      type: String,
      required: true },
    img: String,
    recipe: String,
    price: Number,
    qty: Number,
    }, {timestamps: true}
);

const Pastry = mongoose.model('Pastry', pastrySchema);

module.exports = Pastry;
