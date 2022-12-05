const { Schema } = require('mongoose');

module.exports = messagesSchema = new Schema({
  author: {
    timestamp: { type: String, default: new Date().toLocaleString() },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
    aka: { type: String },
    avatar: { type: String }
  },
  text: { type: Array, required: true }
});