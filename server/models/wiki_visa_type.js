var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var WikiVisaSchema = new Schema({
    id: Number,
    type: String,
    name: String,
});

var WikiVisa = mongoose.model("wiki_visa_type", WikiVisaSchema, "visa_type_list");
module.exports = WikiVisa;