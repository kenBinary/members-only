const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, minLength: 0, maxLength: 50, required: true },
    email: { type: String, minLength: 0, required: true },
    hash: { type: String, minLength: 0, required: true },
    isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);