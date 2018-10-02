const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

var mongoose = require('mongoose');
var Country = require("../models/country");
var WikiVisa = require("../models/wiki_visa_type");
var mongodbUri = 'mongodb://admin@ds115193.mlab.com:15193/fridtjof';

mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    auth: {
        user: 'admin',
        password: 'Fridtjof@123'
    }
})

// mongoose.Promise = global.Promise;

var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', () => {
    console.log('connected to database')
});

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/countries', (req, res) => {
    Country.find({}, 'iso name', function (error, countries) {
        if (error) { console.error(error); }
        res.send({
            countries: countries
        })
    }).sort({ _id: -1 })
})

app.get('/wiki-visa-type', (req, res) => {
    WikiVisa.find({}, function (error, wikivisatype) {
        if (error) { console.error(error); }
        res.send({
            wikivisatype: wikivisatype
        })
    }).sort({ _id: -1 })
})
app.listen(process.env.PORT || 8081)