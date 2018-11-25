var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CountrySchema = new Schema({
    name: String,
    citizenship: String,
    iso: String,
    wikipage: String,
    wikilink: String,
});

var Country = mongoose.model("country", CountrySchema, "countries");
module.exports = Country;