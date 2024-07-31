const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONODB_URL = process.env.MONODB_URL;


mongoose.connect( MONODB_URL, {
    serverSelectionTimeoutMS: 5000
});


mongoose.connection.on("connected",() =>{
    console.log("connected to mogoDb");
});

mongoose.connection.on("error",(error) =>{
    console.log("mogoDb connection error" ,error);
});

module.exports = mongoose;