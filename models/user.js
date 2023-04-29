const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, minLength: 3, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  blogs:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Blog'
  }
});
userSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
    delete returnedObj.password
  },
});
userSchema.plugin(uniqueValidator);
const User =  mongoose.model("User", userSchema);

module.exports = User;
