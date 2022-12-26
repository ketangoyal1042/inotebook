const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,  // this is used as a foreign key
    ref : 'user'
  },
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  tag : {
    type : String
  },
  date : {
    type : Date,
    default : Date.now
  }
});

const notes = mongoose.model('note', NoteSchema);
module.exports = notes;