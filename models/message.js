const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    author: { type: Schema.ObjectId, ref: "User", required: true },
    datePosted: { type: Date, required: true },
    title: { type: String, minLength: 0, maxLength: 80 },
    message: { type: String, minLength: 0 }
});

module.exports = mongoose.model("Message", messageSchema);