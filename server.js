const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config({path: "./config.env"});

const routes = require('./routes/record');

//db done with docker
const mongoString = "mongodb://127.0.0.1:27017/restdb"
mongoose.connect(mongoString);
const db = mongoose.connection;

db.on('error', (error) => {
    console.log(error)
})

db.once('connected', () => {
    console.log('Connected');
})

app.use(express.json());
app.use('/', routes);

app.listen(3000, () => {
    console.log(`Server ${3000}; all good`);
});


