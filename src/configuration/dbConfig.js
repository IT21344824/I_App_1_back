const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://internCrud:internCrud@cluster0.ecus0w6.mongodb.net/intern_crud?retryWrites=true&w=majority&appName=Cluster0",{
    serverSelectionTimeoutMS: 5000
});

mongoose.connection.on("connected",() =>{
    console.log("connected to mogoDb");
});

mongoose.connection.on("error",(error) =>{
    console.log("mogoDb connection error" ,error);
});

module.exports = mongoose;