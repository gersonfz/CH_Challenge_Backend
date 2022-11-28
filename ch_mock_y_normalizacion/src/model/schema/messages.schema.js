const { Schema } = require('mongoose');

module.exports = messagesSchema = new Schema({
  author: {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    aka: { type: String },
    avatar: { type: String }
  },
  text: [{
    timestamp: { type: String, default: new Date().toLocaleString() },
    message: { type: String, required: true, multi: true } 
    }]
});