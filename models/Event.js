
const mongoose = require('mongoose');

const expoEventSchema =  mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  Eventimage:{
    type:String,
    required : true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ExpoEvent = mongoose.model('ExpoEvent', expoEventSchema);

module.exports = ExpoEvent;
