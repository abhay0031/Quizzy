const mongoose = require("mongoose")
require("dotenv").config();

exports.connectToDB = () => {
    mongoose.connect("mongodb+srv://admin:admin@cluster0.vqwfw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{})
    
    .then(() => {
        console.log("Database connection successfull")
    })
    .catch((e) => {
        console.log("Error occurred while connecting to DB")
        console.error(e);
        process.exit(1);
    })
} 