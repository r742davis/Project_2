const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pastrySchema = new mongoose.Schema({
    name:  {
      type: String,
      required: true },
    img: String,
    level: String,
    time: String,
    yield: String,
    ingredients: String,
    directions1: String,
    directions2: String,
    directions3: String,
    directions4: String,
    directions5: String,
    directions6: String
    }, {timestamps: true}
);

const Pastry = mongoose.model('Pastry', pastrySchema);

module.exports = Pastry;
