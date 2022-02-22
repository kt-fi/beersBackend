const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const beerSchema = new Schema({
    beerName: {type: String, require: true},
    beerType: {type: String, require: true},
    origin: {type: String, require: true},
    taste: [{type: String, require: true}],
    alcohol: {type: Number, require: true},
    foodSuggestion: [{type: String, require: false}],
    price: {type: Number, require: true}
})

module.exports = mongoose.model("Beer", beerSchema);