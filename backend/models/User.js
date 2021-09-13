const mongoose = require("mongoose");
const { Schema } = mongoose;

//Schema complements MongoDb collection. Provides structire for MongoDb documents.
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports= mongoose.model('user',UserSchema);