// initilize the here to the database connection here with moongose

const mongoose = require('mongoose');
const mongURI = "mongodb://localhost:27017";

mongoose.set('strictQuery', true);
const connectToMongoose = ()=>{
    mongoose.connect(mongURI, ()=>{
        console.log("connected to Mongoose successfully");
    });
}

module.exports = connectToMongoose;