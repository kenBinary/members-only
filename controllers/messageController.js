// import models
const User = require("../models/user");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
// validation and sanitation
const { check, validationResult } = require("express-validator");
// dotenv
require('dotenv').config();
// message input validation and sanitation
exports.messageValidation = [
    check("mTitle").trim().escape(),
    check("mParagraph").trim().escape()
];
// -retrieve messages with only title and message
// pre login
exports.getMessage(asyncHandler(async (req, res, next) => {
    const messages = await Message.find({}, 'title message');
    res.render("preLogin", { messages: messages })
}));
// -retrieve message with full information
// post login
exports.getFullMessage(asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user._id });
    const messages = await Message.find({ author: user._id });
    res.render("postLogin", { messages: messages })
}));
// -create new message
exports.createMessage(asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new Error("create message validation and sanitation errors");
    }
    const newMessage = {
        author: req.user._id,
        datePosted: new Date(),
        title: req.body.newtitle,
        message: req.body.newMessage
    }
    const messageDocument = new Message(newMessage);
    await messageDocument.save();
    res.redirect('back')
}));
// -delete message
exports.deleteMessage(asyncHandler(async (req, res, next) => {
    const messageId = req.body.messageId;
    await Message.deleteOne({ _id: messageId });
    res.redirect('back');
}));