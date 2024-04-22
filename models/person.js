let mongoose = require("mongoose")

let personSchema = new mongoose.Schema({
	name: String,
	age: Number,
	favoriteFoods: [String]
})

module.exports = mongoose.model('Person', personSchema);