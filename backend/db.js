// initilize the here to the database connection here with moongose

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongURI = "mongodb://0.0.0.0:27017";

const connectToMongoose = ()=>{
    mongoose.connect(mongURI, {
        // console.log("connected to Mongoose successfully");
        
    }).then(() => console.log('Connected Successfully'))
    .catch((err) => console.error('Not Connected',err));
}

module.exports = connectToMongoose;