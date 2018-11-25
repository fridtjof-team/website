var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DestinationSchema = new Schema({
    iso: String,
    name: String,
    visa: String,
    visa_number: Number,
    time: String,
    notes: [{
        text: String,
        source: String,
    }],
    source: [String],
});

var WikiVisaSchema = new Schema({
    citizenship_iso: String,
    citizenship_name: String,
    visa_connectivity: [DestinationSchema],
});


var DestinationSchema = mongoose.model("Destination", DestinationSchema);
var VisaConnectivity = mongoose.model("VisaConnectivity", WikiVisaSchema, "visa_connectivity");

module.exports = DestinationSchema;
module.exports = VisaConnectivity;