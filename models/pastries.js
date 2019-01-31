const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pastrySchema = new mongoose.Schema({
    name:  {
      type: String,
      required: true },
    description:  {
      type: String,
      required: true },
    img: String,
    level: String,
    time: Number,
    yield: Number,
    ingredients: String,
    directions: String,
    }, {timestamps: true}
);

const Pastry = mongoose.model('Pastry', pastrySchema);

module.exports = Pastry;
