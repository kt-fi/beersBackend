const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const beerSchema = new Schema({
    beerId:  {type: String, require: true},
    name: {type: String, require: true},
    category:  {type: String, require: true},
    style: {type: String, require: true},
    country: {type: String, require: true},
    alcohol: {type: Number, require: true},
    imageUrl: {type: String, require: true},
    color: {type: String, require: true},
    description: {type: String, require: false},
    notes: [{type: String, require: true}],
})

module.exports = mongoose.model("Beer", beerSchema);