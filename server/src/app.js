const path = require('path'); 
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
var serveStatic = require('serve-static');

// This is for production
app.use(serveStatic(__dirname + "/../../client/dist"));

var mongoose = require('mongoose');
var Country = require("./models/Country");
var VisaConnectivity = require("./models/VisaConnectivity");
var mongodbUri = 'mongodb://@ds121343.mlab.com:21343/frisco';

mongoose.connect(mongodbUri, {
    useNewUrlParser: true,
    auth: {
        user: process.env.mongoUser,
        password: process.env.mongoPass
    }
})

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
        if (error) { 
            console.error(error);
            res.status(500).send({ error: 'Something failed!' }); 
        } else{
            res.send({
                countries: countries
            })
        }
    }).sort({ _id: 0 })
})

app.get('/visa-connectivity/:citizenship_iso/:destination_iso', (req, res) => {
    VisaConnectivity.find({ citizenship_iso: req.params.citizenship_iso, 'visa_connectivity.iso': req.params.destination_iso }, { 'visa_connectivity.$': 1 }, function (error, VisaConnectivity) {
        if (error) { 
            console.error(error);
            res.status(500).send({ error: 'Something failed!' }); 
        } else {
            if (VisaConnectivity[0]){
                res.status(200).send(VisaConnectivity[0].visa_connectivity[0]);
            } else {
                res.status(500).send({ error: 'Something failed!' }); 
            }
        }
    });
})

app.listen(process.env.PORT || 8081)