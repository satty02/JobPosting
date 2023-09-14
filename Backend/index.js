// this script connects to mongodb database and creates the server
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = process.env.port || 8080;
const MongoUrl = process.env.URI;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connecting to mongodb database

mongoose.connect(MongoUrl , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log('MongoDB connected');
}).catch((err)=>console.error(err));

// Define API routes
app.use('/', require('./Routes/admin'));
app.use('/', require('./Routes/aplication'));

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})